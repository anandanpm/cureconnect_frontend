import { RouteObject } from "react-router-dom";
import UserLayout from "../layout/Userlayout";
import DoctorLayout from "../layout/Doctorlayout";
import AdminLayout from "../layout/Adminlayout";
import Mainpage from "../pages/User/Mainpage";
import SignupPage from "../pages/User/SignupPage";
import Otppage from "../pages/User/Otppage";
import LoginPage from "../pages/User/LoginPage";
import About from "../pages/User/About";
import DocMainpage from "../pages/Doctor/DoctorMainpage";
import Docsignup from "../pages/Doctor/DoctorSignup";
import DocOtp from "../pages/Doctor/DoctorOtp";
import Doclogin from "../pages/Doctor/DoctorLogin";
import AdminLogin from "../pages/Admin/AdminLogin";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import Profile from "../pages/User/Profile";
import Docprofile from "../pages/Doctor/DoctorProfile";
import ProtectedRoute from "./Protectedroute";
import AdminPatient from '../pages/Admin/AdminPatient';
import AdminDoctor from '../pages/Admin/AdminDoctor'
import DoctorPage from "../pages/User/DoctorPage";
// import DoctorSlot from "../pages/Doctor/DoctorSlot";

export const routes: RouteObject[] = [
  // Standalone OTP routes (no layout)
  { path: "/otp", element: <Otppage /> },
  { path: "/Docotp", element: <DocOtp /> },

  // Admin Routes
  { path: "/admin", element: <AdminLogin /> },
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute adminOnly>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
    ],
  },
  { 
    path: "/admin/patients", 
    element: ( 
      <ProtectedRoute adminOnly> 
        <AdminLayout /> 
      </ProtectedRoute> 
    ), 
    children: [ 
      { index: true, element: <AdminPatient /> } 
    ] 
  },
  { 
    path: "/admin/doctors", 
    element: ( 
      <ProtectedRoute adminOnly> 
        <AdminLayout /> 
      </ProtectedRoute> 
    ), 
    children: [ 
      { index: true, element: <AdminDoctor /> } 
    ] 
  },

  // User Routes with layout
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { index: true, element: <Mainpage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "about", element: <About /> },
      {path:'doctordetails',element:<DoctorPage/>},
      {
        path: "profile",
        element: (
          <ProtectedRoute userOnly>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },

  // Doctor Routes with layout
  {
    path: "/doctor",
    element: <DoctorLayout />,
    children: [
      { index: true, element: <DocMainpage /> },
      { path: "signup", element: <Docsignup /> },
      { path: "login", element: <Doclogin /> },
      {
        path: "profile",
        element: (
          <ProtectedRoute doctorOnly>
            <Docprofile />
          </ProtectedRoute>
        ),
      },
      // {
      //   path: "appointment",
      //   element: (
      //     <ProtectedRoute doctorOnly>
      //       <DoctorSlot/>
      //     </ProtectedRoute>
      //   ),
      // },
    ],
  },
];

