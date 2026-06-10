import { Outlet, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

import Navigation from "./components/NavigationModern.jsx";
import Footer from "./component/foooter.jsx";

import Home from "./pages/home/HomeModern.jsx";
import FindJob from "./pages/findJob/FindJobModern.jsx";
import Company from "./pages/company/CompanyModern.jsx";
import AuthModern from "./pages/auth/AuthModern.jsx";

import Jobdetails from "./pages/findJob/jobdetails.jsx";
import Application from "./pages/findJob/applyForJob.jsx";
import PostJob from "./pages/postJob/postjob.jsx";

import CompanyProfile from "./pages/company/companyProfile.jsx";
import CompanyProfileById from "./pages/company/companyProfilebyId.jsx";
import VerifyCompanyEmail from "./pages/company/verify.jsx";

import UserProfile from "./pages/userProfile/userProfile.jsx";
import UserProfileId from "./pages/userProfile/userProfileId.jsx";
import Users from "./pages/userProfile/users.jsx";
import Applicants from "./pages/userProfile/applicants.jsx";

import About from "./pages/about/about.jsx";
import EmailVerify from "./pages/auth/emailVerify.jsx";
import Reset from "./pages/auth/reset.jsx";
import ResetPassword from "./pages/auth/resetPassword.jsx";

function Layout() {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  return user?.token ? (
    <Outlet />
  ) : (
    <Navigate to="/auth" state={{ from: location }} replace />
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      <Routes>
        {/* Protected routes */}
        <Route element={<Layout />}>
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/user-profile/:id" element={<UserProfileId />} />
          <Route path="/company-profile" element={<CompanyProfile />} />
          <Route path="/company-profile/:id" element={<CompanyProfileById />} />
          <Route path="/upload-job" element={<PostJob />} />
          <Route
            path="/applicant-profile/:applicationId/:userId"
            element={<Applicants />}
          />
        </Route>

        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/find-jobs" element={<FindJob />} />
        <Route path="/company" element={<Company />} />
        <Route path="/find-users" element={<Users />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/auth" element={<AuthModern />} />
        <Route path="/verify-email/:id/:token" element={<EmailVerify />} />
        <Route path="/verify-user/:id/:token" element={<VerifyCompanyEmail />} />
        <Route path="/job-details/:id" element={<Jobdetails />} />
        <Route path="/applications/:id" element={<Application />} />
        <Route path="/reset-password" element={<Reset />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
