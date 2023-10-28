import { useCallback, useEffect, useState } from "react";
import { loginFields } from "../constants/formFields";
import FormAction from "../form/FormActions";
import Input from "../input/Input";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Navigate, useNavigate } from "react-router";
import { authActions } from "../../store/auth-slice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for styling

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Login() {
  // useEffect(() => {
  //   const fetchStudents = async () => {
  //     const response = await axios.get(`http://localhost:3000/students`);
  //     const { studentsData } = response.data;
  //   };
  //   fetchStudents();
  // });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    isStudent: false,
    isTutor: false,
  });
  // State variable to track password visibility
  const [showPassword, setShowPassword] = useState(false);
  // let students = useSelector((state) => state.student.students);

  // let tutors = useSelector((state) => state.tutor.tutors);
  const handleChange = useCallback((e) => {
    setCredentials(() => {
      return { ...credentials, [e.target.name]: e.target.value };
    });
  });
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleRadioButtonTutor = useCallback((e) => {
    setCredentials(() => {
      const { isTutor, isStudent } = credentials;
      return {
        ...credentials,
        isTutor: !isTutor,
        isStudent: false,
      };
    });
  });
  const handleRadioButtonStudent = (e) => {
    setCredentials(() => {
      const { isTutor, isStudent } = credentials;
      return {
        ...credentials,
        isStudent: !isStudent,
        isTutor: false,
      };
    });
  };
  const handleSubmit = async (e) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const { email, password, isStudent, isTutor } = credentials;
    e.preventDefault();
    console.log(credentials);
    if (emailRegex.test(email) === false) {
      toast.error(`Your email is badly formatted`);
      return;
    }
    if (password.length <= 5) {
      toast.error(`Incorrect password`);
      return;
    }
    if (isStudent === false && isTutor === false && password !== "iamadmin") {
      toast.error(
        `Select one of the two options Tutor or Student if not selected.`
      );
      return;
    } else {
      try {
        setLoader(true);
        if (isTutor === false && isStudent === true) {
          const user = {
            email: email,
            password: password,
          };
          const studentData = await loginUser(`students`, user);
          // dispatch(studentActions.addStudent(studentData));
        } else if (isStudent === false && isTutor === true) {
          const user = {
            email: email,
            password: password,
          };
          const tutorData = await loginUser(`tutors`, user);
          // dispatch(tutorActions.addTutor(tutorData));
        } else if (
          isStudent === false &&
          isTutor === false &&
          password === "iamadmin" &&
          email === `admin@admin.com`
        ) {
          const user = {
            email: email,
            password: password,
          };
          const adminData = await loginUser(`admins`, user);
        }
        setLoader(false);
      } catch (error) {
        console.log(error.response);
        setLoader(false);
        toast.error(`${error.response.data.message}`);
      }
    }

    // authenticateUser();
  };

  //Handle Login API Integration here
  const loginUser = async (endpoint, user) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/${endpoint}/login`,
        user
      );
      const userData = response.data;
      localStorage.setItem("user", JSON.stringify(userData));
      dispatch(authActions.addUser(userData));
      navigate(`/${endpoint}/dashboard`);
      toast.success("Login successful");
      return userData;
    } catch (error) {
      setLoader(false);

      throw error;
    }
  };

  return (
    <div className="flex justify-center">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="-space-y-px">
          {fields.map((field) => (
            <Input
              key={field.id}
              handleChange={handleChange}
              value={credentials[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={
                field.id === "password"
                  ? showPassword
                    ? "text"
                    : "password"
                  : field.type
              }
              isRequired={field.isRequired}
              placeholder={field.placeholder}
            />
          ))}
          <div className="show-hide-password-button">
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="text-blue-600 hover:text-purple-600 hover:italic hover:font-semibold focus:outline-none m-5"
            >
              {showPassword ? "Hide Password" : "Show Password"}
            </button>
          </div>
          <div className="check-box flex justify-around">
            <div className="flex items-center mt-5">
              <input
                id="tutor-radio"
                type="radio"
                value={credentials.isTutor}
                name="default-radio"
                onClick={handleRadioButtonTutor}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              />
              <label
                htmlFor="tutor-radio"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Tutor
              </label>
            </div>
            <div className="flex items-center mt-5">
              <input
                id="student-radio"
                type="radio"
                value={credentials.isStudent}
                onClick={handleRadioButtonStudent}
                name="default-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              />
              <label
                htmlFor="student-radio"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Student
              </label>
            </div>
          </div>
        </div>

        {/* <FormExtra /> */}
        <FormAction handleSubmit={handleSubmit} loader={loader} text="Login" />
      </form>
      {/* <ToastContainer /> */}
    </div>
  );
}
