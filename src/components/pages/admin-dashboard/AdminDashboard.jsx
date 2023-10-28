import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Navbar from "../../navbar/Navbar";
import Request from "../../requests/Request";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { requestActions } from "../../../store/request-slice";

import { proposalsActions } from "../../../store/proposal-slice";
import TutorRequests from "../tutor-dashboard/TutorRequests";
import AcceptedProposals from "../tutor-dashboard/AcceptedProposals";
import RequestCard from "../../requestCard/RequestCard";
import TutorProposal from "../tutor-dashboard/TutorProposal";
import Table from "../../table/Table";
import StudentProposal from "../student-dashboard/StudentProposal";
import { tutorActions } from "../../../store/tutor-slice";
import { studentActions } from "../../../store/student-slice";
const AdminDashboard = () => {
  const user = useSelector((state) => state.auth.userData);
  const userData = user?.user;
  const id = userData?.id;
  const requests = useSelector((state) => state.request.requests);
  const tutors = useSelector((state) => state.tutor.tutors);
  const students = useSelector((state) => state.student.students);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [username, setUsername] = useState("");

  const handleClose = () => {
    setShowModal(false);
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
  const fetchTutors = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/tutors`);
      const { data } = response;
      dispatch(tutorActions.getAllTutors(data));
      return data;
    } catch (error) {
      throw error;
    }
  };
  const fetchStudents = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/students`);
      const { data } = response;
      dispatch(studentActions.getAllStudents(data));
      return data;
    } catch (error) {
      throw error;
    }
  };

  const fetchProposals = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/proposals`);
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
        fetchProposals(),
        fetchStudents(),
        fetchTutors(),
      ])
        .then(([requestsData, proposalsData]) => {
          dispatch(requestActions.addRequest(requestsData));
          dispatch(proposalsActions.addProposal(proposalsData));
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
  // console.log(filteredRequests);
  const proposals = useSelector((state) => state.proposal.proposals);
  const capitalizeUsername = (name) => {
    const capitalizedName = name
      .split(" ") // Split the name into words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
      .join(" ");
    return capitalizedName;
  };
  const name = user?.user?.username;
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
  return (
    <>
      {user && roleIsAdmin ? (
        <div>
          <Navbar
            linkUrl={`/admin/proposals/accepted`}
            linkone={`Accepted / Rejected Proposals`}
            heading={`Admin Dashboard`}
            homeURL={`/admins/dashboard`}
          />
          <h1 className="typewriter font-bold text-2xl text-center m-5">
            <span>{`Welcome ${username}`}</span>
          </h1>

          <div className="users-details-table m-5 grid  sm:grid-cols-2 lg:grid-cols-2 gap-8">
            <div className="tutors-details">
              <h1 className="font-bold text-3xl  ml-3">Tutors Details</h1>
              <Table users={tutors} tutor={true} student={false} />
              <div className="m-3">
                <h1 className="font-bold text-xl text-green-600">
                  Total Number Of Tutors : <span>{tutors?.length}</span>
                </h1>
              </div>
            </div>
            <div className="students-details">
              <h1 className="font-bold text-3xl ml-3">Students Details</h1>
              <Table users={students} tutor={false} student={true} />
              <div className="m-3">
                <h1 className="font-bold text-xl text-green-600">
                  Total Number Of Students : <span>{students?.length}</span>
                </h1>
              </div>
            </div>
          </div>

          {/* -------------Search bar--------------- */}

          <div className="search-bar m-5 flex justify-center ">
            <input
              type="search"
              id="search"
              name="search"
              className="border-2 bg-gray-100 rounded-md p-3 text-center hover:shadow-md"
              placeholder="Filter by Subjects"
              onChange={handleSearch}
              value={searchText}
            />
          </div>

          {/*-------------Students Requests (all)----------------- */}

          <div className="request-heading m-5">
            <h1 className="font-bold text-3xl italic text-blue-900 hover:text-blue-500">
              Students Requests
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 m-5 mt-10">
            {loading ? ( // Display "Loading..." when loading is true
              <h1 className="font-bold text-2xl">Loading...</h1>
            ) : filteredRequests?.length === 0 ? (
              <div>
                <h1 className="font-bold text-red-500">No Requests Found!!!</h1>
              </div>
            ) : (
              filteredRequests?.map((request, index) => (
                <RequestCard
                  key={index}
                  studentName={request.studentName}
                  class={request.class}
                  requestId={request.requestId}
                  subject={request.subject}
                  details={request.details}
                  id={request.id}
                  buttonTwoText={`See Proposals`}
                  modalHeading={`Request Details`}
                  loader={loader}
                  modalButtonTwoText={`Close`}
                  handleClose={handleClose}
                  studentEmail={request.email}
                  studentClass={request.class}
                  isAdmin={true}
                  modalButtonOneText={`Close`}
                  emailText={`student`}
                  // modalActions={true}
                />
              ))
            )}
          </div>

          {/*----------------------- Tutors Proposals---------------------- (all)*/}

          <div className="accepted-proposals m-5 mt-10">
            <h1 className="font-bold text-3xl italic">
              <span className=" text-green-800 hover:text-green-500">
                Tutors Proposals
              </span>
            </h1>
          </div>
          <div className="grid  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 m-3 ml-2">
            {loading ? ( // Display "Loading..." when loading is true
              <h1 className="font-bold text-2xl">Loading...</h1>
            ) : proposals?.length === 0 ? (
              <div>
                <h1 className="m-5 text-red-500 text-2xl">
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
                  monthlyFee={proposal.monthlyFee}
                  isAccepted={proposal.isAccepted}
                  isRejected={proposal.isRejected}
                  email={proposal.email}
                  studentName={proposal.studentName}
                  studentClass={proposal.class}
                  // studentId={proposal.studentId}
                  tutorId={proposal.tutorId}
                  buttonText={`See Details`}
                  tutorEmail={proposal.email}
                  emailText={`tutor`}
                  isAdmin={true}
                />
                // </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <div>{noUser}</div>
      )}
    </>
  );
};

export default AdminDashboard;
