import { Outlet, Navigate, Route, Routes, useLocation } from "react-router-dom";
import  Footer  from "./component/foooter.jsx";
import  Navbar from "./component/navBar.jsx"
import FindJob from "./pages/findJob/findJob.jsx";
import Jobdetails from "./pages/findJob/jobdetails.jsx";
import PostJob from "./pages/postJob/postjob.jsx"
import  UserProfile from './pages/userProfile/userProfile.jsx'
import  Company   from './pages/company/company.jsx'
import CompanyProfile from './pages/company/companyProfile.jsx'
import Auth from "./pages/auth/auth.jsx"
import About from './pages/about/about.jsx'
import { useSelector } from "react-redux";
import EmailVerify from "./pages/auth/emailVerify.jsx";
import User from "./pages/userProfile/users.jsx";
import UserProfileId from "./pages/userProfile/userProfileId.jsx";
import Application from "./pages/findJob/applyForJob.jsx";
import  Home  from "./pages/home/home.jsx";
import Reset from "./pages/auth/reset.jsx";
import ResetPassword from "./pages/auth/resetPassword.jsx";
import Applicants from "./pages/userProfile/applicants.jsx";
// import VerifyEmail from "./pages/auth/emailVerify.jsx";
// import VerifyCompanyEmail from "./pages/company/verify.jsx";
import Verify from "./pages/auth/mailsent.jsx";

function Layout() {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  return user?.token ?(
    <Outlet />
  ) : (
    <Navigate to='/auth' state={{ from: location }} replace />
  );
}

function App() {
  // const { user } = useSelector((state) => state.user);
  return (
    <main className='bg-[#f7fdfd]'>
      <Navbar />
      <Routes>
        <Route element={<Layout />}>
          {/* <Route path='/' element={<Navigate to='/Home' replace={true} />} /> */}
          <Route path="/user-profile" element={<UserProfile />}/>
          <Route path={"/user-profile/:id"} element={<UserProfileId />} />
          <Route path={"/company-profile"} element={<CompanyProfile />} />
          <Route path={"/company-profile/:id"} element={<CompanyProfile />} />
          <Route path={"/upload-job"} element={<PostJob />} />
          {/* <Route  path="/application" element={<Application />}/> */}
        </Route>

        <Route path="/" element={<Home />}/>
        <Route path='/find-jobs' element={<FindJob />} />
        <Route path='/company' element={<Company />} />
        <Route path="/find-users" element={<User/>}/>
        <Route path='/about-us' element={<About />} />
        <Route path='/auth' element={<Auth />} />
        <Route path="/verify-email/:id/:token" element={<EmailVerify />} />
        <Route path="/verify-email" element={<Verify />} />
        <Route path={"/job-details/:id"} element={<Jobdetails />} />
        <Route path={"/applications/:id"} element={<Application />}/>
        <Route path="/applicant-profile/:applicationId/:userId" element={<Applicants />}/>
        <Route path="/reset-password" element={<Reset />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />

      </Routes>
       <Footer />
    </main>
  );
}

export default App;