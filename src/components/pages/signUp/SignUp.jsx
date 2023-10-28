import SignUp from "../../signup/SignUp";
import Header from "../../header/Header";

const SignUpPage = () => {
  return (
    <>
      <Header
        heading="Signup to create an account"
        paragraph="Already have an account? "
        linkName="Login"
        linkUrl="/login"
      />
      <SignUp />
    </>
  );
};
export default SignUpPage;
