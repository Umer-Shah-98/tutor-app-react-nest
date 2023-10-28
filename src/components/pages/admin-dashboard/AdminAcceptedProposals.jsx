import { useNavigate } from "react-router";
import React, { useCallback, useEffect, useState } from "react";
import { proposalsActions } from "../../../store/proposal-slice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Navbar from "../../navbar/Navbar";
import StudentProposal from "../student-dashboard/StudentProposal";
import { Link } from "react-router-dom";
import TutorProposal from "../tutor-dashboard/TutorProposal";
import { toast } from "react-toastify";

const AdminAcceptedProposals = (props) => {
  const user = useSelector((state) => state.auth.userData);
  const userData = user?.user;
  const id = userData?.id;
  const proposals = useSelector((state) => state.proposal.proposals);
  const rejectedProposals = useSelector(
    (state) => state.proposal.rejectedProposals
  );

  const [showModal, setShowModal] = useState(false);
  const [acceptedProposals, setAcceptedProposals] = useState([]);
  const dispatch = useDispatch();
  const handleClick = () => {
    setShowModal(true);
  };
  // const navigate = useNavigate();
  const navigate = useNavigate();

  const fetchProposals = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3000/proposals/final`);
      const { data } = response;
      dispatch(proposalsActions.addProposal(data));
    } catch (error) {
      toast.error(`Error occurred while fetching proposals`);
    }

    // dispatch(proposalsActions.addProposal(data));
  }, []);
  const fetchRejectedProposals = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/proposals/rejected/admin`
      );
      const { data } = response;
      dispatch(proposalsActions.addRejectedProposals(data));
    } catch (error) {
      toast.error(`Error occurred while fetching proposals.`);
    }

    // dispatch(proposalsActions.addProposal(data));
  }, []);
  useEffect(() => {
    if (user) {
      fetchProposals();
      fetchRejectedProposals();
    }
  }, [user]);

  const username =
    user?.user?.username.slice(0, 1).toUpperCase() +
    user?.user?.username.slice(1).toLowerCase();
  const roleIsAdmin = user?.user?.isAdmin;
  const noUser = (
    <div className="mt-10">
      <h1 className="font-bold text-center">
        You are not an authorized person to this page.
      </h1>
      <h1 className="font-bold text-center">Please Login to use the App.</h1>
      <div className="button flex justify-center font-bold mt-5">
        <Link
          className="w-auto rounded px-3 py-3 hover:bg-gray-400 shadow-md bg-gray-200"
          to={`/login`}
        >
          Login
        </Link>
      </div>
    </div>
  );
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <>
      {userData ? (
        <div>
          <div>
            <Navbar
              linkUrl={() => navigate(-1)}
              linkone={`Go Back`}
              heading={`Accepted / Rejected Proposals`}
              onGoBack={handleGoBack}
              homeURL={`/admins/dashboard`}
            />
          </div>
          {/*--------------------------------------Accepted Proposals------------------------------- */}
          <div className="accepted-proposals m-5">
            <h1 className="font-bold text-2xl ml-3">Accepted Proposals</h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 m-3 ml-2">
            {proposals?.length !== 0 ? (
              proposals.length > 0 ? (
                proposals.map((proposal, index) => (
                  <StudentProposal
                    key={index}
                    tutorName={proposal.tutorName}
                    proposalText={proposal.proposalText}
                    class={proposal.class}
                    subject={proposal.subject}
                    tutorEmail={proposal.email}
                    monthlyFee={proposal.monthlyFee}
                    proposalId={proposal.proposalId}
                    isAccepted={proposal.isAccepted}
                    isRejected={proposal.isRejected}
                    email={proposal.email}
                    studentName={proposal.studentName}
                    studentClass={proposal.class}
                    modalButtonOneText={`Close`}
                    isAdmin={true}
                    emailText={`tutor`}
                    // studentId={proposal.studentId}
                    buttonText={`See details`}
                  />
                ))
              ) : (
                <h1 className="font-bold text-2xl">No Proposals Found</h1>
              )
            ) : (
              <h1 className="font-bold text-2xl">Loading...</h1>
            )}
          </div>
          {/*---------------------------Rejected Proposals--------------------------- */}
          <div className="rejected-proposals m-5">
            <h1 className="ml-3 font-bold text-2xl">Rejected Proposals</h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 m-3 ml-2">
            {rejectedProposals?.length !== 0 ? (
              rejectedProposals.length > 0 ? (
                rejectedProposals.map((proposal, index) => (
                  <StudentProposal
                    key={index}
                    tutorName={proposal.tutorName}
                    proposalText={proposal.proposalText}
                    class={proposal.class}
                    subject={proposal.subject}
                    tutorEmail={proposal.email}
                    monthlyFee={proposal.monthlyFee}
                    proposalId={proposal.proposalId}
                    isAccepted={proposal.isAccepted}
                    isRejected={proposal.isRejected}
                    studentName={proposal.studentName}
                    studentClass={proposal.class}
                    email={proposal.email}
                    modalButtonOneText={`Close`}
                    isAdmin={true}
                    emailText={`tutor`}
                    // studentId={proposal.studentId}
                    buttonText={`See details`}
                  />
                ))
              ) : (
                <h1 className="font-bold text-2xl">No Proposals Found</h1>
              )
            ) : (
              <h1 className="font-bold text-2xl">Loading...</h1>
            )}
          </div>
        </div>
      ) : (
        noUser
      )}
    </>
  );
};

export default AdminAcceptedProposals;
