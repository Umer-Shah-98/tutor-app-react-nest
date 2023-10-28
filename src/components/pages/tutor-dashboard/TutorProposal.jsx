import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { proposalsActions } from "../../../store/proposal-slice";
import { toast } from "react-toastify";

const TutorProposal = (props) => {
  const user = useSelector((state) => state.auth.userData);
  const [showModal, setShowModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const handleClick = () => {
    setShowModal(true);
  };
  const handleRemove = async (e) => {
    e.preventDefault();

    // Show a confirmation dialog to the user
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this proposal?"
    );

    if (userConfirmed) {
      setLoader(true);
      try {
        const proposals = await removeProposal(props.proposalId);
        console.log(proposals);
        const updatedProposals = proposals.filter(
          (proposal) =>
            proposal.tutorId === user.user.id || user?.user?.isAdmin === true
        );
        dispatch(proposalsActions.addProposal(updatedProposals));
        setShowModal(false);
        toast.info(`Proposal is removed...!!!`);
        // setTimeout(() => {}, 100);
        setLoader(false);
      } catch (error) {
        setLoader(false);
        setShowModal(false);
        // Handle any errors that occur during the removal process
        toast.error(`error removing proposal, ${error}`);
      }
    }
  };

  const removeProposal = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/proposals/${id}`
      );
      return response.data;
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };
  const handleEdit = () => {};
  return (
    <div>
      <div className="bg-green-400 rounded-md w-48 shadow-md hover:shadow-gray-500 mr-5 ml-5 flex flex-col items-center gap-5 py-2">
        <div className="heading">
          <h1 className="font-bold text-sm">Proposed By</h1>
        </div>
        <div className="tutor-name">
          <h1 className="font-bold text-sm">{props.tutorName}</h1>
        </div>
        <div className="subject-name">
          <h2 className="font-bold text-sm">
            For Subject : <span className="font-semibold">{props.subject}</span>
          </h2>
        </div>
        <div className="class">
          <h2 className="font-bold text-sm">
            Of Class: <span className="font-semibold">{props.class}</span>
          </h2>
        </div>
        <div className="button">
          <button
            onClick={handleClick}
            className="font-semibold px-2 py-2 bg-blue-400 rounded-md shadow-md hover:shadow-lg hover:bg-blue-600"
          >
            {props.buttonText}
          </button>{" "}
        </div>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between gap-5 p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Proposal Details</h3>
                    <button
                      className="p-1 ml-auto border-0 bg-gray-100 text-black text-center  text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className=" text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="student-name ml-10 mt-5 font-bold">
                    <h1 className="mb-2">Requested By</h1>
                    <h1>Student Name : {props.studentName}</h1>
                    <h1>Class : {props.studentClass}</h1> Subject :{" "}
                    {props.subject}
                  </div>
                  {props.isAdmin && (
                    <div className="ml-5">
                      <h1 className="inline font-bold ml-5 m">
                        Email : {props.tutorEmail}{" "}
                      </h1>
                      <a
                        className="text-blue-700 font-semibold"
                        href={`mailto:${props.tutorEmail}`}
                      >
                        Send Email to the {props.emailText}.
                      </a>
                    </div>
                  )}
                  <div className="relative p-6 flex-auto">
                    <div className="monthly-fee">
                      <h1 className="font-bold text-md text-center">
                        Monthly Fee : Rs . {props.monthlyFee}
                      </h1>
                    </div>
                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                      {props.proposalText} 
                    </p>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    {loader && (
                      <div
                        id="loader"
                        className="loader relative border-b-red-600 "
                      ></div>
                    )}
                    <button
                      value={true}
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={handleRemove}
                    >
                      Remove Proposal
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default TutorProposal;
