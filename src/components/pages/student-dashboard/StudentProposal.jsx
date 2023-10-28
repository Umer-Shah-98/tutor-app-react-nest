import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tutorActions } from "../../../store/tutor-slice";
import Modal from "../../modal/Modal";
import { proposalsActions } from "../../../store/proposal-slice";
import { toast } from "react-toastify";
// import "./studentProposal.css";
const StudentProposal = (props) => {
  const user = useSelector((state) => state.auth.userData);
  const userData = user?.user;
  const id = userData?.id;
  const proposals = useSelector((state) => state.proposal.proposals);
  const dispatch = useDispatch();
  const localTutors = JSON.parse(localStorage.getItem("tutors"));
  const tutors = useSelector((state) => state.tutor.tutors);
  const balance = useSelector((state) => state.tutor.balance);

  const [showModal, setShowModal] = useState(false);
  const [filteredProposals, setFilteredProposals] = useState([]);
  useEffect(() => {
    if (user) {
      const fetchProposals = async () => {
        const response = await axios.get(
          `http://localhost:3000/proposals/${id}`
        );
        const { data } = response;
        setFilteredProposals(data);
      };
      fetchProposals();
    } else {
      // proposals = [];
    }
  }, [user]);
  const handleClose = () => {
    setShowModal(!showModal);
    // props.handleClick(showModal)
  };
  const handleClick = () => {
    setShowModal(!showModal);
  };
  const removeIsAcceptedRequest = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/requests/${id}`
      );
    } catch (error) {
      throw error;
    }
  };
  const acceptProposal = async (id, requestId) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/proposals/${id}`,
        {
          tutorName: props.tutorName,
          proposalText: props.proposalText,
          class: props.class,
          subject: props.subject,
          proposalId: props.proposalId,
          isAccepted: true,
          isRejected: false,
          email: props.email,
          studentId: props.studentId,
          monthlyFee: props.monthlyFee,
        }
      );
      const { data } = response;
      // console.log(data);

      //proposal is accepted and request is removed
      await removeIsAcceptedRequest(requestId);
      dispatch(proposalsActions.deleteProposal(data));

      return response.data;
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  const rejectProposal = useCallback(async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/proposals/${id}`,
        {
          tutorName: props.tutorName,
          proposalText: props.proposalText,
          class: props.class,
          subject: props.subject,
          proposalId: props.proposalId,
          isAccepted: false,
          isRejected: true,
          email: props.email,
          studentId: props.studentId,
        }
      );
      const { data } = response;
      dispatch(proposalsActions.deleteProposal(data));

      return data;
    } catch (error) {
      alert(error.message);
    }
  });
  const handleAcceptanceAndPayment = async (e) => {
    try {
      const status = e.target.value;

      // Attempt to make the payment
      const paymentSuccess = await handlePayment(
        props.tutorId,
        props.monthlyFee
      );

      if (paymentSuccess) {
        // Payment was successful, now attempt to accept the proposal
        const proposalAccepted = await acceptProposal(
          props.proposalId,
          props.requestId
        );

        if (proposalAccepted) {
          // Proposal acceptance was successful, show success messages
          // alert("Payment is Successful and Proposal is Accepted");
          toast.success(`Payment is Successful and Proposal is Accepted`);

          // Close the modal after a short delay (100ms)
          setTimeout(() => {
            setShowModal(!showModal);
          }, 100);
        } else {
          // Proposal acceptance failed, show an error message
          toast.error("Proposal acceptance failed. Please try again.");
        }
      } else {
        // Payment failed, show an error message
        // alert("Payment failed. Proposal cannot be accepted.");
        toast.error("Payment failed. Proposal cannot be accepted.");
      }
    } catch (error) {
      // Handle any errors that occur during the process
      toast.error(error);
    }
  };

  const handlePayment = async (id, fee) => {
    const paymentAmount = parseFloat(prompt("Enter payment amount:"));
    if (isNaN(paymentAmount) || paymentAmount < 0) {
      toast.error(`Enter a valid amount`);
      return;
    }
    if (paymentAmount < fee) {
      toast.error(
        `Enter a match amount, your amount does not match the proposed amount.`
      );
      return;
    }
    if (paymentAmount > fee) {
      toast.error(
        `Enter a match amount, your amount does not match the proposed amount.`
      );
      return;
    } else {
      try {
        // console.log(paymentAmount, fee);
        if (
          !isNaN(paymentAmount) &&
          paymentAmount > 0 &&
          paymentAmount === fee
        ) {
          // Actual payment logic here
          const tutorDataResponse = await axios.get(
            `http://localhost:3000/tutors/${id}`
          );
          const tutorData = tutorDataResponse.data;
          // Calculate the new balance by adding the payment amount to the current balance
          const newBalance = tutorData.balance + paymentAmount;

          // Send the updated balance back to the server
          const updatedTutorBalance = { balance: newBalance };
          const response = await axios.patch(
            `http://localhost:3000/tutors/${id}`,
            updatedTutorBalance
          );

          // alert(`Payment of Rs.${paymentAmount} successful.`);
          toast.success(`Payment of Rs.${paymentAmount} successful.`);
        } else {
          return false;

          // throw new Error();
        }
        // return true;
      } catch (error) {
        return false;
        // alert(`${error} catch`);
      }
    }
  };
  const handleReject = async () => {
    props.handleRejection(props.proposalId);
    // Show a confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to reject this proposal?"
    );

    if (isConfirmed) {
      try {
        const data = await rejectProposal(props.proposalId);
        // alert("Proposal is rejected!!");
        toast.success("Proposal is rejected!!");
        setTimeout(() => {
          setShowModal(!setShowModal);
        }, 100);
      } catch (error) {
        alert(error.message);
        toast(`${error.message}`);
      }
    }
    handleClose();
  };
  const handleRejection = async () => {
    // Show a confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to reject this proposal?"
    );

    if (isConfirmed) {
      try {
        const data = await rejectProposal(props.proposalId);
        setShowModal(!setShowModal);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="bg-green-400 rounded-md w-48 shadow-md mr-5 ml-5 flex flex-col items-center gap-5 py-2">
      <div className="heading">
        <h1 className="font-bold text-sm">Proposed By</h1>
      </div>
      <div className="tutor-name">
        <h1 className="font-bold text-sm">
          Name : <span className="font-semibold">{props.tutorName}</span>
        </h1>
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
      <Modal
        showModal={showModal}
        modalHeading={`Proposal Details`}
        modalDetails={props.proposalText}
        monthlyFee={props.monthlyFee}
        loader={props.loader}
        handleClose={handleClose}
        handleClick={handleAcceptanceAndPayment}
        modalActions={props.modalActions}
        proposal={props.studentId}
        modalButtonTwoText={props.modalButtonTwoText}
        style={props.style}
        tutorEmail={props.tutorEmail}
        isAdmin={props.isAdmin}
        isTutor={props.isTutor}
        isStudent={props.isStudent}
        studentName={props.studentName}
        studentClass={props.studentClass}
        subject={props.subject}
        modalButtonOneText={props.modalButtonOneText}
        handleReject={handleReject}
        emailText={props.emailText}
      />
    </div>
  );
};

export default StudentProposal;
