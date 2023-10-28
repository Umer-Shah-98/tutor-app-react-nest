import "./App.css";
import React, { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/pages/login/LoginPage";
import SignUp from "./components/pages/signUp/SignUp";
import NotFoundError from "./components/pages/error/NotFoundError";
import DashboardTutor from "./components/pages/tutor-dashboard/DashboardTutor";
import DashboardStudent from "./components/pages/student-dashboard/DashboardStudent";
import TutorProposals from "./components/pages/tutor-dashboard/TutorProposals";
import StudentProposals from "./components/pages/student-dashboard/StudentProposals";
import AcceptedProposals from "./components/pages/student-dashboard/AcceptedProposals";
import AdminDashboard from "./components/pages/admin-dashboard/AdminDashboard";
import AdminAcceptedProposals from "./components/pages/admin-dashboard/AdminAcceptedProposals";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for styling
// const AdminAcceptedProposals = React.lazy(() =>
//   import("./components/pages/admin-dashboard/AdminAcceptedProposals")
// );

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/proposals" element={<TutorProposals />} />
          <Route path="/acceptedProposals" element={<AcceptedProposals />} />
          <Route
            path="/admin/proposals/accepted"
            element={<AdminAcceptedProposals />}
          />

          <Route path="/student/proposals" element={<StudentProposals />} />
          <Route path="/tutors/dashboard" element={<DashboardTutor />} />
          <Route path="/students/dashboard" element={<DashboardStudent />} />
          <Route path="/admins/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<NotFoundError />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};

export default App;
