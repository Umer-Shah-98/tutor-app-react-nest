import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { proposalsActions } from "../../../store/proposal-slice";

const AcceptedProposals = (props) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const handleClick = () => {
    setShowModal(true);
  };

  return (
    <div>
      <div className="bg-green-300 rounded-md w-48 shadow-md   flex flex-col items-center gap-5 py-2">
        <div className="heading">
          <h1 className="font-bold text-sm">Accepted By</h1>
        </div>
        <div className="tutor-name">
          <h1 className="font-semibold text-sm">
            Student Name: <span>{props.studentName}</span>
          </h1>
        </div>
        <div className="subject-name">
          <h2 className="font-semibold text-sm">
            For Subject : <span className="font-semibold">{props.subject}</span>
          </h2>
        </div>
        <div className="class">
          <h2 className="font-semibold text-sm">
            Of Class: <span className="font-semibold">{props.class}</span>
          </h2>
        </div>
        <div className="button">
          <button
            onClick={handleClick}
            className="font-semibold px-2 py-2 bg-blue-400 rounded-md shadow-md hover:shadow-lg hover:bg-blue-600"
          >
            See Details
          </button>{" "}
        </div>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
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
                  <div className="relative p-6 flex-auto">
                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                      {props.proposalText} Lorem ipsum dolor sit, amet
                      consectetur adipisicing elit. Totam ab illo, numquam
                      mollitia labore quibusdam ducimus, sint accusamus incidunt
                      praesentium fugit nemo esse, laborum natus non
                      perspiciatis iusto adipisci maxime.
                    </p>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      value={true}
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    {/* <button
                      value={true}
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={handleEdit}
                    >
                      See Proposals
                    </button> */}
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

export default AcceptedProposals;
