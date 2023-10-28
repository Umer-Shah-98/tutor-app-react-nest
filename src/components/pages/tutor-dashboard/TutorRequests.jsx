import axios from "axios";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { proposalsActions } from "../../../store/proposal-slice";
import "./dashboardTutorial.css";
import { requestActions } from "../../../store/request-slice";
import { toast } from "react-toastify";

const TutorRequests = (props) => {
  const user = useSelector((state) => state.auth.userData);
  const userData = user?.user;
  const id = userData?.id;
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [monthlyFee, setMonthlyFee] = useState("");
  const [loader, setLoader] = useState(false);
  const handleClick = () => {
    setShowModal(true);
  };

  const { username, email } = userData;
  const [proposal, setProposal] = useState({
    tutorName: username,
    studentName: props.studentName,
    email,
    tutorId: id,
    proposalText: "",
    studentId: props.id,
    requestId: props.requestId,
    class: props.class,
    subject: props.subject,
    isAccepted: false,
    isRejected: false,
    // monthlyFee: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "monthlyFee") {
      // Validate and update monthlyFee in the proposal as a number
      setProposal((prevProposal) => ({
        ...prevProposal,
        [name]: parseFloat(value),
      }));
    } else {
      setProposal((prevProposal) => ({
        ...prevProposal,
        [name]: value,
      }));
      // setMonthlyFee(parseFloat(value));
    }

    console.log(proposal);
  };

  //submitting proposal

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(proposal.monthlyFee);
      console.log(proposal.proposalText);
      if (proposal.proposalText === undefined || proposal.proposalText === "") {
        toast.error(`Write your proposal details first`);
      } else if (
        proposal.monthlyFee === undefined ||
        proposal.monthlyFee <= 0 ||
        isNaN(proposal.monthlyFee)
      ) {
        toast.error(`Enter a valid amount`);
      } else {
        setLoader(true);
        await sendProposal({ ...proposal });
        dispatch(requestActions.deleteRequest(proposal));
        setProposal(() => {
          return {
            [e.target.proposalText]: "",
          };
        });
        console.log(proposal);
        setLoader(false);
        setTimeout(() => {
          toast.success(`Proposal is sent successfully`);
          // alert(`Proposal is sent successfully`);
        }, 100);
        setTimeout(() => {
          setShowModal(false);
        }, 100);
      }
    } catch (error) {
      setLoader(false);
      toast.error(`${error}`);
      // setTimeout(() => {
      //   alert(
      //     `${error} Write Proposal Details and Check Your Internet Connection.`
      //   );
      // }, 100);
    }
  };
  const sendProposal = async (proposal) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/proposals/create`,
        proposal
      );
      console.log(response.status);
      // Check if the response status is not in the 2xx range
      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      return response.data;
    } catch (error) {
      console.log(error);
      const response = error.response;
      const data = response.data;

      const { message } = data;
      console.log(message);
      throw message;
    }
  };

  return (
    <div className="bg-green-400 rounded-md w-48 shadow-md flex flex-col items-center gap-3 py-2">
      <div className="heading font-bold">
        <h1>Requested By</h1>
      </div>
      <div className="student-name">
        <h2 className="font-semibold text-sm">
          Student Name: <span>{props.studentName}</span>
        </h2>
      </div>
      <div className="subject-name">
        <h1 className="font-semibold">
          For Subject: <span>{props.subject}</span>
        </h1>
      </div>
      <div className="class">
        <h2 className="font-semibold">
          Of Class: <span>{props.class}</span>
        </h2>
      </div>

      <div className="buttons m-5 flex flex-col justify-center items-center gap-2">
        <button
          onClick={handleClick}
          className="font-semibold px-2 py-2 w-32  bg-blue-400 rounded-md shadow-md hover:shadow-lg hover:bg-blue-600"
        >
          See Details
        </button>
        <button
          style={props.style}
          onClick={props.handleClick}
          className="font-semibold px-2 py-2 w-32 bg-blue-400 rounded-md shadow-md hover:shadow-lg hover:bg-blue-600"
        >
          {props.buttonTwoText}
        </button>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Request Details</h3>
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
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    {props.details} 
                  </p>
                </div>
                <div className="proposal-form p-3">
                  <form>
                    <div className="text">
                      <textarea
                        value={proposal.proposalText}
                        required
                        className="w-full h-full bg-gray-200 p-2"
                        name="proposalText"
                        id=""
                        onChange={handleChange}
                        cols="25"
                        rows="5"
                        placeholder="Type your proposal here"
                      ></textarea>
                    </div>
                    <div className="amount">
                      <input
                        onChange={handleChange}
                        value={proposal.monthlyFee}
                        name="monthlyFee"
                        id="monthlyFee"
                        required
                        type="number"
                        min={0}
                        step={50}
                        placeholder="Enter monthly fee"
                        className="bg-gray-200 rounded p-2"
                      />
                    </div>
                    <div className="buttons flex justify-end gap-2 mt-5">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className="bg-emerald-500 flex items-center text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleSubmit}
                      >
                        {/* {loader && (
                          <div
                            id="loader"
                            className="loader relative  border-b-black "
                          ></div>
                        )} */}
                        Send Proposal
                      </button>
                    </div>
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b"></div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default TutorRequests;
