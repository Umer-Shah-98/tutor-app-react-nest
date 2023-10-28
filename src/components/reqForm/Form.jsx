import React, { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestActions } from "../../store/request-slice";
import axios from "axios";
import "../pages/student-dashboard/studentDashboard.css";
import { toast } from "react-toastify";
const Form = () => {
  const requests = useSelector((state) => state.request.requests);
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem("user"));
  const { user } = userData;
  const { username, email, id } = user;
  const [loader, setLoader] = useState(false);
  const [request, setRequest] = useState({
    studentName: username,
    email: email,
    id: id,
    subject: "",
    class: "",
    // details: "",
  });
  const handleChange = useCallback((e) => {
    setRequest(() => {
      return {
        ...request,
        [e.target.name]: e.target.value,
        // [details]: detailsInputRef.current.value,
      };
    });
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { subject, details } = request;
    // console.log(subject, details, request.class);
    if (subject === undefined || subject === "") {
      toast.error(`Please write your requested subject.`);
      return;
    }
    if (request.class === undefined || request.class === "") {
      toast.error(`Please write your class for the requested subject.`);
      return;
    }
    if (details === undefined || details === "") {
      toast.error(`Please write your request details.`);
      return;
    }
    if (details.length < 10) {
      toast.error(`Details must be 10 characters long۔.`);
      return;
    } else {
      try {
        const sentRequest = await sendRequestData(request);
        if (sentRequest) {
          toast.success(`Request is added successfully`);
          dispatch(requestActions.updateRequest(sentRequest));
          setRequest({
            studentName: username,
            email: email,
            id: id,
            subject: "",
            class: "",
            details: "",
          });
        } else {
          return false;
        }
      } catch (error) {
        toast.error(`${error}`);
        // alert(`${error.message} Enter all details regarding request.`);
      }
    }
  };
  const sendRequestData = useCallback(async (request) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/requests/create`,
        request
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error.response);
      throw error;
    }
  });
  return (
    <div className="bg-blue-200 m-2 rounded-md my-2">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center md:flex-row sm:justify-center py-3"
      >
        <div className="fields sm:flex gap-5 sm:items-center">
          <div className="shadow-md">
            {/* <label htmlFor="subject">Subject</label> */}
            <input
              type="text"
              id="subject"
              value={request.subject}
              onChange={handleChange}
              name="subject"
              placeholder="Enter Your Subject"
              className="border-2 sm:w-64 sm:h-16 text-center rounded "
            />
          </div>
          <div className="shadow-md">
            {/* <label htmlFor="subject">Subject</label> */}
            <input
              type="text"
              id="class"
              value={request.class}
              onChange={handleChange}
              name="class"
              placeholder="Enter Your Class"
              className="border-2  sm:w-64 sm:h-16 text-center rounded "
            />
          </div>
          <div className="mt-2 shadow-sm rounded">
            {/* <label htmlFor="request-details">Enter your request details</label> */}
            <textarea
              id="request-details"
              name="details"
              className="text-center rounded sm:w-64"
              // ref={detailsInputRef}
              value={request.details}
              onChange={handleChange}
              placeholder="Enter your request details"
              rows={3}
              cols={24}
            ></textarea>
          </div>
        </div>
        <div className="form-action ml-5">
          <button
            type="submit"
            className="font-bold px-2 py-3 bg-blue-400 rounded-md shadow-md hover:shadow-lg hover:bg-blue-600"
          >
            {" "}
            {loader && (
              <div
                id="loader"
                className="loader relative border-r-white border-b-black "
              ></div>
            )}
            Add request
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
