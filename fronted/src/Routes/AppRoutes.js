import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminProfile from '../Component/Admin/AdminDashboard';
import AdminMainCounsellor from '../Component/Admin/AdminMainCounsellor';
import AdminCollegeApplication from '../Component/Admin/AdminCollegeApplication';
import AdminUserApplications from '../Component/Admin/AdminUserApplications';
import AdminSetting from '../Component/Admin/AdminSetting';
import AdminEnquiry from '../Component/Admin/AdminUserEnquiry';
import CounselorUpdateProfile from '../Component/Admin/CounselorView_UpdateProfile.js';
import Questions_Answere from '../Component/Admin/Questions_Answere.js';
import AdminCallRequest from '../Component/Admin/AdminCallRequest.js';

import CollegeProfile from '../Component/College/CollegeProfile';
import CollegeGallery from '../Component/College/CollegeGallry';
import ManageCourses from '../Component/College/ManageCourse';
import Setting from '../Component/College/Setting';
import EditCourse from '../Component/College/EditCourse'

import UserProfile from '../Component/User/UserProfile';
import UserOwnApplicatins from '../Component/User/Application';
import Home from '../Component/User/Home'
import UserSettings from '../Component/User/UserSettings';

import AllCollegeList from '../Component/Others/AllCollegeList.js';
import CreateApplication from '../Component/Auth/CreateApplication';
import Explore from '../Component/Others/Explore';
import CollegeOverviewPage from '../Component/Others/CollegeOverviewPage'
import ForgetPassword from '../Component/Others/ForgetPassword.js';
import TopUniversity from '../Component/Others/TopUniversity.js';
import CounselorOverview from '../Component/Others/CounselorOverview.js';

import CollegeSignup from '../Component/Auth/CollegeSignIn';
import CollegeRegister from '../Component/Auth/CollegeRegister';
import UserSignup from '../Component/Auth/UserSignIn';
import UserRegister from '../Component/Auth/UserRegister';
import AdminLogin from '../Component/Auth/AdminLogin';
import UpdateCollegeProfile from '../Component/College/UpdateCollegeProfile';
import CounselorSignIn from '../Component/Auth/CounselorSignIn.js';
import { AuthContext } from '../App.js';

const AppRoutes = () => {
    const { user, role, token } = useContext(AuthContext)

    return (
        <Routes>
            <>
                <Route path="/home/collegeList" element={<AllCollegeList />} />
                <Route path="/home" element={<Home />} />
                <Route path="/home/explore" element={<Explore />} />
                <Route path="/home/collegedetail/:collegeId" element={<CollegeOverviewPage />} />
                <Route path="/home/collegeoverview/application" element={<CreateApplication />} />
                <Route path="/home/topUniversity" element={<TopUniversity />} />
            </>

            {/* AUTH ROUTES IF NOT LOGGED IN */}
            {!role && (
                <>
                    <Route path="/register" element={<UserRegister />} />
                    <Route path="/user-signup" element={<UserSignup />} />
                    <Route path="/college/register" element={<CollegeRegister />} />
                    <Route path="/college-signup" element={<CollegeSignup />} />
                    <Route path="/admin-signin" element={<AdminLogin />} />
                    <Route path='/counselor-Singin/9f3c2a7e6b1d4f0a8c5e7d9b2a1c4e6f8d0b3a5c7e9f1a2b4d6' element={<CounselorSignIn />} />
                    <Route path="/forget-password" element={<ForgetPassword />} />
                    <Route path="*" element={<Navigate to="/home" />} />
                </>
            )}

            {role && (user?.Role === 'admin' || user?.Role === 'counselor') && (
                <>
                    <Route path="/admin/dashboard" element={<AdminProfile />} />
                    <Route path="/admin/manageQuetions" element={<Questions_Answere />} />
                    <Route path="/admin/counsellors" element={<AdminMainCounsellor />} />
                    <Route path="/admin/Counselor/:fullname/:_id" element={<CounselorUpdateProfile />} />
                    <Route path="/admin/college-applications" element={<AdminCollegeApplication />} />
                    <Route path="/admin/user-applications" element={<AdminUserApplications />} />
                    <Route path="/admin/settings" element={<AdminSetting />} />
                    <Route path="/admin/enquiry" element={<AdminEnquiry />} />
                    <Route path="*" element={<Navigate to="/admin/dashboard" />} />
                    <Route path="/admin/call-requests" element={<AdminCallRequest />} />
                </>
            )}

            {/* COLLEGE ROUTES */}
            {role && user?.Role === "college" && (
                <>

                    {/* 🔥 Pending block FIXED */}
                    {user?.Status !== 'Approval' ? (
                        <Route
                            path="*"
                            element={
                                <p style={{ padding: 20, fontSize: 18, color: "black", fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                                    Your request is pending. Please wait for admin approval.
                                </p>
                            }
                        />
                    ) : (
                        <>
                            <Route path="/college/profile" element={<CollegeProfile />} />
                            <Route path="/college/gallery" element={<CollegeGallery />} />
                            <Route path="/college/manage-courses" element={<ManageCourses />} />
                            <Route path="/college/settings" element={<Setting />} />
                            <Route path="/college/manage-course/editcourse" element={<EditCourse />} />
                            <Route path="/college/profile/editprofile" element={<UpdateCollegeProfile />} />
                            <Route path="*" element={<Navigate to="/college/profile" />} />
                        </>
                    )}

                </>
            )}

            {/* USER ROUTES */}
            {role && user?.Role === "user" && (
                <>
                    <Route path="/user/profile" element={<UserProfile />} />
                    <Route path="/user/applications" element={<UserOwnApplicatins />} />
                    <Route path="/user/setting" element={<UserSettings />} />
                    <Route path="*" element={<Navigate to="/home" />} />
                    <Route path="/home/counselor/counselorOverview/:counselorId" element={<CounselorOverview />} />
                </>
            )}
        </Routes>
    )
}

export default AppRoutes
