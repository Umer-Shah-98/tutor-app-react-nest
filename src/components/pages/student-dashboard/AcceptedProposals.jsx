import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../../navbar/Navbar";
import { proposalsActions } from "../../../store/proposal-slice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import StudentProposal from "./StudentProposal";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
const AcceptedProposals = () => {
  const user = useSelector((state) => state.auth.userData);
  const userData = user?.user;
  const id = userData?.id;
  const roleIsStudent = user?.user?.isStudent;
  const proposals = useSelector((state) => state.proposal.proposals);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();
  const fetchProposals = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/proposals/accepted/${id}`
      );
      const { data } = response;
      dispatch(proposalsActions.addProposal(data));
      setLoading(false); // Set loading to false after fetching proposals
    } catch (error) {
      alert(error);
      setLoading(false); // Set loading to false in case of error
    }
  };

  useEffect(() => {
    if (user) {
      fetchProposals(id);
    }
  }, [user]);
  const handleGoBack = () => {
    navigate(-1);
  };
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
  return (
    <>
      {user && roleIsStudent ? (
        <div>
          <div>
            <Navbar
              homeURL={`/students/dashboard`}
              linkUrl={() => navigate(-1)}
              linkone={`Go Back`}
              heading={`Accepted Proposals`}
              onGoBack={handleGoBack}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 m-3 ml-2">
            {loading ? (
              <h1 className="font-bold text-2xl">Loading...</h1>
            ) : proposals.length > 0 ? (
              proposals?.map((proposal, index) => (
                <StudentProposal
                  key={index}
                  tutorName={proposal.tutorName}
                  proposalText={proposal.proposalText}
                  class={proposal.class}
                  subject={proposal.subject}
                  monthlyFee={proposal.monthlyFee}
                  proposalId={proposal.proposalId}
                  isAccepted={proposal.isAccepted}
                  isRejected={proposal.isRejected}
                  email={proposal.email}
                  buttonText={`See Details`}
                  isAdmin={false}
                  isTutor={true}
                  modalButtonOneText={`close`}
                  studentClass={proposal.class}
                  studentName={proposal.studentName}
                  modalActions={false}
                  // style={{display:'none'}}
                />
              ))
            ) : (
              <div className="m-5">
                <h1 className="font-bold text-xl text-red-500">
                  No proposals found
                </h1>
              </div>
            )}
          </div>
        </div>
      ) : (
        noUser
      )}
    </>
  );
};

export default AcceptedProposals;
