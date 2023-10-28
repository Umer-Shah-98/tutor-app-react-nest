import React, { useState } from "react";
import Modal from "../modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./request.css";
import { requestActions } from "../../store/request-slice";
import TutorProposal from "../pages/tutor-dashboard/TutorProposal";
import { isRejected } from "@reduxjs/toolkit";
import StudentProposal from "../pages/student-dashboard/StudentProposal";
import { toast } from "react-toastify";
const Request = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [showProposals, setShowProposals] = useState(false);
  const [filteredProposals, setFilteredProposals] = useState([]);
  const [loadingProposals, setLoadingProposals] = useState(false);
  const requests = useSelector((state) => state.request.requests);
  const proposals = useSelector((state) => state.proposal.proposals);
  const dispatch = useDispatch();
  const handleClickDetails = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const toggleProposals = () => {
    if (!showProposals) {
      fetchProposals();
    }
    setShowProposals(!showProposals);
  };

  const fetchProposals = async () => {
    setLoadingProposals(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/proposals/${props.requestId}`
      );

      const fetchedProposals = response.data;
      setFilteredProposals(fetchedProposals);
    } catch (error) {
      console.error("Error fetching proposals:", error);
    } finally {
      setLoadingProposals(false);
    }
  };
  const removeRequest = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/requests/student/${id}`
      );
      return response.data;
    } catch (error) {
      // toast.error(`${error.message}`);
      throw error;
    }
  };
  const handleRemoveRequest = async () => {
    // Show a confirmation dialog to the user
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this proposal?"
    );

    if (userConfirmed) {
      try {
        const requests = await removeRequest(props.requestId);
        dispatch(requestActions.deleteRequest(requests));
        toast.info(`Request is removed`);
        setTimeout(() => {
          setShowModal(false);
        }, 100);
      } catch (error) {
        toast.error(`${error.message} Error removing proposal:`);
        // Handle any errors that occur during the removal process
      }
    }
  };
  return (
    <>
      <div className="bg-blue-300 rounded-md w-48 shadow-md hover:shadow-gray-500 flex flex-col items-center gap-3 py-2">
        <div className="heading font-bold">
          <h1>Requested By</h1>
        </div>{" "}
        <div className="student-name ">
          <h2 className="font-semibold text-sm">
            Student Name: <span>{props.studentName}</span>
          </h2>{" "}
        </div>
        <div className="subject-name">
          {" "}
          <h1 className="font-semibold">
            For Subject: <span>{props.subject}</span>
          </h1>
        </div>{" "}
        <div className="class">
          {" "}
          <h2 className="font-semibold">
            {" "}
            Of Class: <span>{props.class}</span>{" "}
          </h2>{" "}
        </div>
        <div className="buttons m-5 flex flex-col justify-center items-center gap-2">
          <button
            onClick={handleClickDetails}
            className="font-semibold px-2 py-2 w-32  bg-blue-400 rounded-md shadow-md hover:shadow-lg hover:bg-blue-600"
          >
            See Details
          </button>
          <button
            onClick={toggleProposals}
            className="font-semibold px-2 py-2 w-32 bg-blue-400 rounded-md shadow-md hover:shadow-lg hover:bg-blue-600"
          >
            {showProposals ? "Hide Proposals" : "See Proposals"}
          </button>
        </div>
        <Modal
          showModal={showModal}
          modalHeading={props.modalHeading}
          modalDetails={props.details}
          loader={props.loader}
          handleClose={handleClose}
          handleClick={handleRemoveRequest}
          modalActions={true}
          proposal={filteredProposals.requestId}
          modalButtonTwoText={`Remove Request`}
          modalButtonOneText={props.modalButtonOneText}
        />
      </div>

      {showProposals && (
        <div className="modal-container h-96 proposals-modal bg-blue-200 overflow-y-auto rounded-md">
          <div
            onClick={() => setShowProposals(!showProposals)}
            className="close-button m-3 flex justify-end"
          >
            <button
              className="text-white bg-red-500 rounded-md shadow-sm hover:shadow-gray-500 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
            >
              Close
            </button>
          </div>
          {loadingProposals ? (
            <p className="font-bold m-2">Loading proposals...</p>
          ) : filteredProposals.length === 0 ? (
            <p className="text-red-500 font-bold text-center">
              No proposals found.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {filteredProposals.map((proposal, index) => (
                <StudentProposal
                  key={index}
                  tutorName={proposal.tutorName}
                  proposalText={proposal.proposalText}
                  class={proposal.class}
                  subject={proposal.subject}
                  proposalId={proposal.proposalId}
                  isAccepted={proposal.isAccepted}
                  isRejected={proposal.isRejected}
                  email={proposal.email}
                  modalButtonOneText={`Close`}
                  // monthlyFee={proposal.monthlyFee}
                  // studentId={proposal.studentId}
                  buttonText={
                    !proposal.isAccepted && !proposal.isRejected
                      ? "Status : Pending"
                      : `Status : Accepted`
                  }
                />
                // <div
                //   key={index}
                //   className="bg-blue-100 rounded-md p-4 shadow-md"
                // >
                //   <h3 className="font-semibold">
                //     Proposal by {proposal.tutorName}
                //   </h3>
                //   <p>{/* Render other proposal details as needed */}</p>
                //   {/* Add more details here */}
                // </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Request;
