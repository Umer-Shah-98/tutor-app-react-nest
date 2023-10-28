import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../../navbar/Navbar";
import { proposalsActions } from "../../../store/proposal-slice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import TutorProposal from "./TutorProposal";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const TutorProposals = () => {
  const user = useSelector((state) => state.auth.userData);
  const userData = user?.user;
  const id = userData?.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const proposals = useSelector((state) => state.proposal.proposals);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/proposals/${id}`
        );
        const { data } = response;
        // const userProposals = data.filter(
        //   (proposal) => proposal.tutorId === userData?.user.id
        // );
        dispatch(proposalsActions.addProposal(data));
      } catch (error) {
        toast.error(`${error}`);
      } finally {
        setLoading(false); // Set loading to false regardless of success or error
      }
    };
    if (user) {
      fetchProposals();
    }
  }, [user]);

  const handleGoHome = () => {
    navigate(`/tutors/dashboard`);
  };
  const username =
    user?.user?.username.slice(0, 1).toUpperCase() +
    user?.user?.username.slice(1).toLowerCase();
  const roleIsTutor = user?.user?.isTutor;
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
      {user && roleIsTutor ? (
        <div>
          <div>
            <Navbar
              onGoBack={() => navigate(-1)}
              linkone={`Go Back`}
              linkUrl={`/acceptedProposals`}
              heading={`Proposals Sent`}
              homeURL={`/tutors/dashboard`}
              // onGoHome={() => {
              //   navigate(`tutors/dashboard`);
              // }}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 m-3 ml-2">
            {loading ? ( // Display "Loading..." when loading is true
              <h1 className="font-bold text-2xl">Loading...</h1>
            ) : proposals?.length === 0 ? (
              <div className="m-5">
                <h1 className="text-lg text-red-500 font-bold">
                  No Proposals Found!!!
                </h1>
              </div>
            ) : (
              proposals?.map((proposal, index) => (
                // <div key={index}>
                <TutorProposal
                  key={index}
                  tutorName={proposal.tutorName}
                  proposalText={proposal.proposalText}
                  class={proposal.class}
                  subject={proposal.subject}
                  proposalId={proposal.proposalId}
                  isAccepted={proposal.isAccepted}
                  isRejected={proposal.isRejected}
                  email={proposal.email}
                  studentId={proposal.studentId}
                  buttonText={`See details`}
                  monthlyFee={proposal.monthlyFee}
                  studentName={proposal.studentName}
                  studentClass={proposal.class}
                />
                // </div>
              ))
            )}
          </div>
        </div>
      ) : (
        noUser
      )}
    </>
  );
};

export default TutorProposals;
