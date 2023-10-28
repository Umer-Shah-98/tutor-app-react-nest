import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Navbar from "../../navbar/Navbar";
import Request from "../../requests/Request";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { requestActions } from "../../../store/request-slice";
import TutorRequests from "./TutorRequests";
import AcceptedProposals from "./AcceptedProposals";
import { proposalsActions } from "../../../store/proposal-slice";
import "./dashboardTutorial.css";
import RequestCard from "../../requestCard/RequestCard";
import StudentProposal from "../student-dashboard/StudentProposal";
const DashboardTutor = () => {
  const user = useSelector((state) => state.auth.userData);
  const userData = user?.user;
  const id = userData?.id;
  const balance = userData?.balance;
  const requests = useSelector((state) => state.request.requests);
  const proposals = useSelector((state) => state.proposal.proposals);
  const rejectedProposals = useSelector(
    (state) => state.proposal.rejectedProposals
  );

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleClose = (showModal) => {
    return !showModal;
  };
  const fetchRequests = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/requests`);
      const { data } = response;
      return data;
    } catch (error) {
      throw error;
    }
  };

  const fetchProposals = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/proposals/accepted/${id}`
      );
      const { data } = response;
      return data;
    } catch (error) {
      throw error;
    }
  };
  const fetchRejectedProposals = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/proposals/rejected/${id}`
      );
      const { data } = response;
      return data;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (user) {
      const username = capitalizeUsername(name);
      setUsername(username);
      Promise.all([
        fetchRequests(),
        fetchProposals(id),
        fetchRejectedProposals(id),
      ])
        .then(([requestsData, proposalsData, rejectedProposals]) => {
          dispatch(requestActions.addRequest(requestsData));
          dispatch(proposalsActions.addProposal(proposalsData));
          dispatch(proposalsActions.addRejectedProposals(rejectedProposals));
          setLoading(false); // Set loading to false when both requests are successful
        })
        .catch((error) => {
          // Handle any errors from either request here
          console.error("Error fetching data:", error);
          alert(
            "An error occurred while fetching data. Please try again later."
          );
          setLoading(false); // Set loading to false in case of error
        });
    }
  }, [user]);
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredRequests = requests.filter((request) => {
    const { subject } = request;
    return subject.toLowerCase().includes(searchText.toLocaleLowerCase());
  });
  const capitalizeUsername = (name) => {
    const capitalizedName = name
      .split(" ") // Split the name into words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
      .join(" ");
    return capitalizedName;
  };
  const name = user?.user?.username;
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
          <Navbar
            linkUrl={`/proposals`}
            linkone={`My Proposals`}
            heading={`Tutor Dashboard`}
            homeURL={`/tutors/dashboard`}
          />
          <h1 className="typewriter font-bold text-2xl text-center m-5">
            <span>{`Welcome ${username}, your Balance is Rs : ${balance} `}</span>
          </h1>
          <div className="search-bar m-5 flex justify-center">
            <input
              type="search"
              id="search"
              name="search"
              className="border-2 bg-gray-100 rounded-md p-3 text-center"
              placeholder="Filter by Subjects"
              onChange={handleSearch}
              value={searchText}
            />
          </div>
          <div>
            <h1 className="font-bold text-3xl m-5">Students Requests</h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 m-5  mt-10">
            {loading ? (
              <h1 className="font-bold text-2xl">Loading...</h1>
            ) : filteredRequests?.length === 0 ? (
              <div>
                <h1 className="text-red-500 m-5 text-2xl font-bold">
                  No Requests Found!!!
                </h1>
              </div>
            ) : (
              filteredRequests?.map((request, index) => (
                <TutorRequests
                  key={index}
                  studentName={request.studentName}
                  class={request.class}
                  subject={request.subject}
                  details={request.details}
                  id={request.id}
                  requestId={request.requestId}
                  style={{ display: "none" }}
                />
              ))
            )}
          </div>
          <div className="accepted-proposals  mt-10">
            <h1 className="font-bold text-3xl m-5">Your Accepted Proposals</h1>
            <div>
              {loading ? ( // Display "Loading..." when loading is true
                <h1 className="font-bold text-2xl">Loading...</h1>
              ) : proposals?.length === 0 ? (
                <div className="m-5">
                  <h1 className="font-bold text-red-600 text-2xl">
                    No Accepted Proposals Found!!!
                  </h1>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 m-5">
                  {proposals?.map((proposal, index) => (
                    <StudentProposal
                      key={index}
                      tutorName={proposal.tutorName}
                      proposalText={proposal.proposalText}
                      class={proposal.class}
                      subject={proposal.subject}
                      proposalId={proposal.proposalId}
                      monthlyFee={proposal.monthlyFee}
                      isAccepted={proposal.isAccepted}
                      isRejected={proposal.isRejected}
                      email={proposal.email}
                      buttonText={`See Details`}
                      studentName={proposal.studentName}
                      modalActions={false}
                      isTutor={true}
                      studentClass={proposal.class}
                      modalButtonOneText={`Close`}
                      handleClick={handleClose}

                      // style={{display:'none'}}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="rejected-proposals  mt-10">
            <h1 className="font-bold text-3xl m-5">Your Rejected Proposals</h1>
            <div>
              {loading ? ( // Display "Loading..." when loading is true
                <h1 className="font-bold text-2xl">Loading...</h1>
              ) : rejectedProposals?.length === 0 ? (
                <div className="m-5">
                  <h1 className="font-bold text-red-600 text-2xl">
                    No Rejected Proposals Found!!!
                  </h1>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 m-5">
                  {rejectedProposals?.map((proposal, index) => (
                    <StudentProposal
                      key={index}
                      tutorName={proposal.tutorName}
                      proposalText={proposal.proposalText}
                      class={proposal.class}
                      subject={proposal.subject}
                      proposalId={proposal.proposalId}
                      isAccepted={proposal.isAccepted}
                      isRejected={proposal.isRejected}
                      monthlyFee={proposal.monthlyFee}
                      email={proposal.email}
                      buttonText={`See Details`}
                      studentName={proposal.studentName}
                      modalActions={false}
                      isTutor={true}
                      studentClass={proposal.class}
                      modalButtonOneText={`Close`}
                      handleClick={handleClose}

                      // style={{display:'none'}}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>{noUser}</div>
      )}
    </>
  );
};

export default DashboardTutor;
