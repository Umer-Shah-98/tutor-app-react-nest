import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../navbar/Navbar";
import Form from "../../reqForm/Form";
import Request from "../../requests/Request";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { requestActions } from "../../../store/request-slice";
import "./studentDashboard.css";
import RequestCard from "../../requestCard/RequestCard";

const DashboardStudent = () => {
  const dispatch = useDispatch();
  // const userData = JSON.parse(localStorage.getItem("user"));
  const user = useSelector((state) => state.auth.userData);
  const userData = user?.user;
  const id = userData?.id;
  const requests = useSelector((state) => state.request.requests);
  const [showUnauthorized, setShowUnauthorized] = useState(false);
  const [username, setUsername] = useState("");
  // const [studentRequests, setStudentsRequests] = useState([false]);

  const fetchRequests = useCallback(
    async (id) => {
      const response = await axios.get(
        `http://localhost:3000/requests/student/${id}`
      );
      const { data } = response;
      dispatch(requestActions.addRequest(data));

      setLoading(false);
      return data;
    },
    [dispatch]
  );

  useEffect(() => {
    if (user) {
      fetchRequests(id);
      const username = capitalizeUsername(name);
      setUsername(username);
    }
  }, [user]);

  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(!showModal);
  };
  const capitalizeUsername = (name) => {
    const capitalizedName = name
      .split(" ") // Split the name into words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
      .join(" ");
    return capitalizedName;
  };
  const name = user?.user?.username;
  const roleIsStudent = user?.user?.isStudent;
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
          <Navbar
            homeURL={`/students/dashboard`}
            heading={`Student Dashboard`}
            linkone={`Proposals`}
            linkUrl={`/student/proposals`}
          />
          <h1 className="typewriter font-bold text-2xl text-center m-5">
            <span>{`Welcome ${username}`}</span>
          </h1>
          <Form />
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 m-5">
            {loading ? (
              <h1 className="font-bold text-2xl">Loading...</h1>
            ) : requests.length > 0 ? (
              requests?.map((request, index) => (
                <div key={index}>
                  <Request
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
                    modalButtonOneText={`Close`}
                    handleClose={handleClose}
                  />
                </div>
              ))
            ) : (
              <h1 className="font-bold text-2xl">No requests found</h1>
            )}
          </div>
        </div>
      ) : (
        noUser
      )}
      {showUnauthorized && <h1>You are Unauthorized to this page</h1>}
    </>
  );
};

export default DashboardStudent;
