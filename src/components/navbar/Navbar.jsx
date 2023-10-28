import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth-slice";
import { toast } from "react-toastify";
const Navbar = ({ heading, linkone, linkUrl, onGoBack, homeURL }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(authActions.deleteUser());
    localStorage.removeItem("user");
    navigate(`/login`);
    // toast.info(`You are logged out of the App...`);
  };
  return (
    <>
      <div className="sm:flex sm:items-center sm:justify-around sm:h-16 bg-blue-300 w-full">
        <div className="image">
          <img
            alt=""
            className="h-14 w-14"
            src="https://ik.imagekit.io/pibjyepn7p9/Lilac_Navy_Simple_Line_Business_Logo_CGktk8RHK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649962071315"
          />
        </div>
        <h1 className="heading font-bold px-2 py-3">{heading}</h1>
        <nav className="nav-bar">
          <ul className="font-bold sm:flex sm:items-center sm:justify-around">
            <li className="px-2 py-3 mx-2">
              <Link to={homeURL}>Home</Link>
            </li>
            <li className="px-2 py-3 mx-2">
              <Link to={linkUrl} onClick={onGoBack}>
                {linkone}
              </Link>
            </li>
          </ul>
        </nav>
        <div className="right-side">
          <button
            onClick={handleLogout}
            className="font-bold px-2 py-3 bg-blue-400 rounded-md shadow-md hover:shadow-lg hover:bg-blue-600"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
