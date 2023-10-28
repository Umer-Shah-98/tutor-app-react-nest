import React from "react";
import Header from "../../header/Header";
import Login from "../../login/Login";
import { useSelector } from "react-redux";

const LoginPage = () => {
  return (
    <>
      <Header
        heading="Login to your account"
        paragraph="Don't have an account yet? "
        linkName="SignUp"
        linkUrl="/signup"
      />
      <Login />
    </>
  );
};

export default LoginPage;
