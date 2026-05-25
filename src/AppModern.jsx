import { Outlet, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Navigation from "../components/NavigationModern";
import Footer from "../component/foooter.jsx";
import HomeModern from "./home/HomeModern";
import CompanyModern from "./company/CompanyModern";
import FindJob from "./findJob/findJob";
import Jobdetails from "./findJob/jobdetails";
import PostJob from "./postJob/postjob";
import UserProfile from './userProfile/userProfile';
import Company from './company/company';
import CompanyProfile from './company/companyProfile';
import Auth from "./auth/auth";
import About from './about/about';
import EmailVerify from "./auth/emailVerify";
import User from "./userProfile/users";
import UserProfileId from "./userProfile/userProfileId";
import Application from "./findJob/applyForJob";
import Reset from "./auth/reset";
import ResetPassword from "./auth/resetPassword";
import Applicants from "./userProfile/applicants";
import VerifyCompanyEmail from "./company/verify";
import CompanyProfileById from "./company/companyProfilebyId";

function Layout() {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  return user?.token ? (
    <Outlet />
  ) : (
    <Navigate to='/auth' state={{ from: location }} replace />
  );
}

function AppModern() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/user-profile/:id" element={<UserProfileId />} />
          <Route path="/company-profile" element={<CompanyProfile />} />
          <Route path="/company-profile/:id" element={<CompanyProfileById />} />
          <Route path="/upload-job" element={<PostJob />} />
        </Route>

        <Route path="/" element={<HomeModern />} />
        <Route path='/find-jobs' element={<FindJob />} />
        <Route path='/company' element={<CompanyModern />} />
        <Route path="/find-users" element={<User />} />
        <Route path='/about-us' element={<About />} />
        <Route path='/auth' element={<Auth />} />
        <Route path="/verify-email/:id/:token" element={<EmailVerify />} />
        <Route path="/verify-user/:id/:token" element={<VerifyCompanyEmail />} />
        <Route path="/job-details/:id" element={<Jobdetails />} />
        <Route path="/applications/:id" element={<Application />} />
        <Route path="/applicant-profile/:applicationId/:userId" element={<Applicants />} />
        <Route path="/reset-password" element={<Reset />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default AppModern;
