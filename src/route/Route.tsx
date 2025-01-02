import { RouteObject } from 'react-router-dom';
import UserLayout from '../layout/Userlayout';
import DoctorLayout from '../layout/Doctorlayout';
import AdminLayout from '../layout/Adminlayout';
import Mainpage from '../pages/User/Mainpage';
import SignupPage from '../pages/User/SignupPage';
import Otppage from '../pages/User/Otppage';
import LoginPage from '../pages/User/LoginPage';
import About from '../pages/User/About';
import DocMainpage from '../pages/Doctor/DoctorMainpage';
import Docsignup from '../pages/Doctor/DoctorSignup';
import DocOtp from '../pages/Doctor/DoctorOtp';
import Doclogin from '../pages/Doctor/DoctorLogin';
import AdminLogin from '../pages/Admin/AdminLogin';
import AdminDashboard from '../pages/Admin/AdminDashboard';

export const routes: RouteObject[] = [
  // Standalone OTP routes (no layout)
  { path: '/otp', element: <Otppage /> },
  { path: '/Docotp', element: <DocOtp /> },
  
  // Admin Routes
  { path: '/admin', element: <AdminLogin /> },
  {
    path: '/admin/dashboard',
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> }
    ]
  },

  // User Routes with layout
  {
    path: '/',
    element: <UserLayout />,
    children: [
      { index: true, element: <Mainpage /> },
      { path: 'signup', element: <SignupPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'about', element: <About /> }
    ]
  },

  // Doctor Routes with layout
  {
    path: '/doctor',
    element: <DoctorLayout />,
    children: [
      { index: true, element: <DocMainpage /> },
      { path: 'docsignup', element: <Docsignup /> },
      { path: 'doclogin', element: <Doclogin /> }
    ]
  }
];

