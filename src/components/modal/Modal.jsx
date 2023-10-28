import React from "react";

const Modal = ({
  showModal,
  modalHeading,
  modalDetails,
  loader,
  modalButtonOneText,
  modalButtonTwoText,
  handleClose,
  handleClick,
  modalActions,
  proposal,
  style,
  tutorEmail,
  isAdmin,
  isTutor,
  studentName,
  studentClass,
  subject,
  isStudent,
  handleReject,
  monthlyFee,
  emailText,
}) => {
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">{modalHeading}</h3>
                  <h3 className="text-3xl font-semibold">{proposal}</h3>

                  <button
                    className="p-1 ml-auto border-0 bg-gray-100 text-black text-center  text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={handleClose}
                  >
                    <span className=" text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                {isTutor || isAdmin ? (
                  <>
                    <div className="student-name ml-10 mt-5 font-bold">
                      <h1 className="mb-2">Requested By</h1>
                      <h1>Student Name : {studentName}</h1>
                      <h1>Class : {studentClass}</h1> Subject : {subject}
                    </div>
                  </>
                ) : null}

                <div className="relative ml-5 flex-auto">
                  {isAdmin && (
                    <div>
                      <h1 className="inline font-bold ml-5">
                        Email : {tutorEmail}{" "}
                      </h1>
                      <a
                        className="text-blue-700 font-semibold"
                        href={`mailto:${tutorEmail}`}
                      >
                        Send Email to the {emailText}.
                      </a>
                    </div>
                  )}
                  {monthlyFee && (
                    <div className="monthly-fee mt-2">
                      <h1 className="font-bold text-md text-center">
                        Monthly Fee : Rs .{monthlyFee ? monthlyFee : "Monthly Fee : Rs .0"}{" "}
                        {/* {monthlyFee} */}
                      </h1>
                    </div>
                  )}

                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    {modalDetails} 
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <div className="buttons flex justify-end gap-2">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={handleClose}
                    >
                      {modalButtonOneText}
                    </button>
                    {isStudent && (
                      <button
                        className="text-white rounded-md bg-red-500 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleReject}
                      >
                        Reject
                        {/* {modalButtonOneText} */}
                      </button>
                    )}

                    {modalActions && (
                      <button
                        style={style}
                        className="bg-red-500 flex items-center text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleClick}
                      >
                        {loader && (
                          <div
                            id="loader"
                            className="loader relative  border-b-black "
                          ></div>
                        )}
                        {modalButtonTwoText}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
