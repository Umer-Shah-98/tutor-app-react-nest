import { useState } from "react";
import { signUpFields } from "../constants/formFields";
import FormAction from "../form/FormActions";
import Input from "../input/Input";
import { useDispatch, useSelector } from "react-redux";
import { studentActions } from "../../store/student-slice";
import { tutorActions } from "../../store/tutor-slice";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
const fields = signUpFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.id] = ""));

const SignUp = () => {
  const [loader, setLoader] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    isStudent: false,
    isTutor: false,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) =>
    // setSignUpState({ ...signUpState, [e.target.id]: e.target.value });
    setCredentials(() => {
      return {
        ...credentials,
        [e.target.name]: e.target.value,
      };
    });
  const handleRadioButtonTutor = (e) => {
    setCredentials(() => {
      const { isTutor, isStudent } = credentials;
      return {
        ...credentials,
        isTutor: !isTutor,
        isStudent: false,
      };
    });
  };
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
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const { username, email, password, isStudent, isTutor } = credentials;
    if (username.length < 3) {
      toast.error(`Username must be at least three characters`);
      return;
    }
    if (emailRegex.test(email) === false) {
      toast.error(`Your email is badly formatted`);
      return;
    }
    if (password.length <= 5) {
      toast.error(`Password must be at least 6 characters`);
      return;
    }
    if (isStudent === false && isTutor === false) {
      toast.error(`You must select one of the two options Tutor or Student.`);
      return;
    } else {
      try {
        setLoader(true);
        if (isTutor === false && isStudent === true) {
          const user = {
            username: username,
            email: email,
            password: password,
            isStudent: isStudent,
          };
          const studentData = await createAccount(`students`, user);
          if (studentData) {
            console.log("dispatched navigate");

            console.log("dispatched and navigate");
            setLoader(false);
            dispatch(studentActions.addStudent(studentData));
            navigate("/login");
            toast.success("SignUp is successful");
          } else {
            return false;
          }
        } else if (isStudent === false && isTutor === true) {
          const user = {
            username: username,
            email: email,
            password: password,
            isTutor: isTutor,
          };
          const tutorData = await createAccount(`tutors`, user);
          console.log(tutorData.data);
          if (tutorData) {
            console.log(tutorData);
            console.log("dispatched navigate");
            setLoader(false);
            dispatch(tutorActions.addTutor(tutorData));
            navigate("/login");
            toast.success("SignUp is successful");
          } else {
            return false;
          }
        }
        // else {
        //   throw new Error("You must select one of the two Tutor or Student");
        // }
        setLoader(false);
      } catch (error) {
        setLoader(false);
        console.log(error);
        toast.error(`${error}`);
      }
    }
  };
  //handle Signup API Integration here
  const createAccount = async (endpoint, user) => {
    console.log("create");
    try {
      const response = await axios.post(
        `http://localhost:3000/${endpoint}/signup`,
        user
      );
      // console.log(response.data);
      return response;
      // if (response.data.error) {
      //   // console.log(response.data.error);
      //   toast.error(
      //     `Email is already exists, enter unique one and try again later`
      //   );
      //   // alert(`Email is already exists, enter unique one and try again later `);
      // } else {
      //   // Registration was successful
      //   return response.data;
      // }
    } catch (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
      console.log(error);
      throw errorMessage;
    }
  };

  return (
    <div className="flex justify-center">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="">
          {fields.map((field) => (
            <Input
              key={field.id}
              handleChange={handleChange}
              value={credentials[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
            />
          ))}
          <div className="check-box flex justify-around">
            <div className="flex items-center mb-4">
              <input
                id="tutor-radio"
                type="radio"
                value=""
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
            <div className="flex items-center mb-4">
              <input
                id="student-radio"
                type="radio"
                value=""
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
          <FormAction
            handleSubmit={handleSubmit}
            loader={loader}
            text="Sign Up"
          />
        </div>
      </form>
    </div>
  );
};
export default SignUp;
