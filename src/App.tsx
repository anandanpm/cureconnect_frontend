// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { store } from './redux/store';
// import './App.scss';
// import Userlayout from './layout/Userlayout';
// import Doctorlayout from './layout/Doctorlayout';
// import Mainpage from '../src/pages/User/Mainpage';
// import SignupPage from '../src/pages/User/SignupPage';
// import Otppage from '../src/pages/User/Otppage';
// import LoginPage from './pages/User/LoginPage';
// import About from './pages/User/About';
// import DocMainpage from './pages/Doctor/DoctorMainpage';
// import Docsignup from './pages/Doctor/DoctorSignup';
// import DocOtp from './pages/Doctor/DoctorOtp';
// import Doclogin from './pages/Doctor/DoctorLogin';

// const App: React.FC = () => {
//   return (
//     <Provider store={store}>
//       <Router>
//         <Routes>
//           {/* Standalone OTP routes (no layout) */}
//           <Route path="/otp" element={<Otppage />} />
//           <Route path="/Docotp" element={<DocOtp />} />

//           {/* User Routes with layout */}
//           <Route path="/" element={<Userlayout />}>
//             <Route index element={<Mainpage />} />
//             <Route path="signup" element={<SignupPage />} />
//             <Route path="login" element={<LoginPage />} />
//             <Route path="about" element={<About />} />
//           </Route>

//           {/* Doctor Routes with layout */}
//           <Route path="/doctor" element={<Doctorlayout />}>
//             <Route index element={<DocMainpage />} />
//             <Route path="docsignup" element={<Docsignup />} />
//             <Route path="doclogin" element={<Doclogin/>}/>
//           </Route> 
//         </Routes>
//       </Router>
//     </Provider>
//   );
// };

// export default App;


// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { store } from './redux/store';
// import './App.scss';
// import Userlayout from './layout/Userlayout';
// import Doctorlayout from './layout/Doctorlayout';
//  import Adminlayout from './layout/Adminlayout';
// import Mainpage from '../src/pages/User/Mainpage';
// import SignupPage from '../src/pages/User/SignupPage';
// import Otppage from '../src/pages/User/Otppage';
// import LoginPage from './pages/User/LoginPage';
// import About from './pages/User/About';
// import DocMainpage from './pages/Doctor/DoctorMainpage';
// import Docsignup from './pages/Doctor/DoctorSignup';
// import DocOtp from './pages/Doctor/DoctorOtp';
// import Doclogin from './pages/Doctor/DoctorLogin';
// import AdminLogin from './pages/Admin/AdminLogin';
//  import AdminDashboard from './pages/Admin/AdminDashboard';


// const App: React.FC = () => {
//   return (
//     <Provider store={store}>
//       <Router>
//         <Routes>
//           {/* Standalone OTP routes (no layout) */}
//           <Route path="/otp" element={<Otppage />} />
//           <Route path="/Docotp" element={<DocOtp />} />

//           {/* Admin Routes */}
//           <Route path="/admin" element={<AdminLogin />} />
//           <Route index element={<Adminlayout />} />
//           <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
            
  

//           {/* User Routes with layout */}
//           <Route path="/" element={<Userlayout />}>
//             <Route index element={<Mainpage />} />
//             <Route path="signup" element={<SignupPage />} />
//             <Route path="login" element={<LoginPage />} />
//             <Route path="about" element={<About />} />
//           </Route>

//           {/* Doctor Routes with layout */}
//           <Route path="/doctor" element={<Doctorlayout />}>
//             <Route index element={<DocMainpage />} />
//             <Route path="docsignup" element={<Docsignup />} />
//             <Route path="doclogin" element={<Doclogin />} />
//           </Route>
//         </Routes>
//       </Router>
//     </Provider>
//   );
// };

// export default App;


// import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { store } from './redux/store';
// import './App.scss';
// import Userlayout from './layout/Userlayout';
// import Doctorlayout from './layout/Doctorlayout';
// import Adminlayout from './layout/Adminlayout';
// import Mainpage from '../src/pages/User/Mainpage';
// import SignupPage from '../src/pages/User/SignupPage';
// import Otppage from '../src/pages/User/Otppage';
// import LoginPage from './pages/User/LoginPage';
// import About from './pages/User/About';
// import DocMainpage from './pages/Doctor/DoctorMainpage';
// import Docsignup from './pages/Doctor/DoctorSignup';
// import DocOtp from './pages/Doctor/DoctorOtp';
// import Doclogin from './pages/Doctor/DoctorLogin';
// import AdminLogin from './pages/Admin/AdminLogin';
// import AdminDashboard from './pages/Admin/AdminDashboard';

// const App: React.FC = () => {
//   return (
//     <Provider store={store}>
//       <Router>
//         <Routes>
//           {/* Standalone OTP routes (no layout) */}
//           <Route path="/otp" element={<Otppage />} />
//           <Route path="/Docotp" element={<DocOtp />} />
          
//           {/* Admin Routes */}
//           <Route path="/admin" element={<AdminLogin />} />
//           <Route path="/admin/dashboard" element={<Adminlayout />}>
//             <Route index element={<AdminDashboard />} />
//           </Route>

//           {/* User Routes with layout */}
//           <Route path="/" element={<Userlayout />}>
//             <Route index element={<Mainpage />} />
//             <Route path="signup" element={<SignupPage />} />
//             <Route path="login" element={<LoginPage />} />
//             <Route path="about" element={<About />} />
//           </Route>

//           {/* Doctor Routes with layout */}
//           <Route path="/doctor" element={<Doctorlayout />}>
//             <Route index element={<DocMainpage />} />
//             <Route path="docsignup" element={<Docsignup />} />
//             <Route path="doclogin" element={<Doclogin />} />
//           </Route>
//         </Routes>
//       </Router>
//     </Provider>
//   );
// };

// export default App;


// import { BrowserRouter as Router } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { store } from './redux/store';
// import './App.scss';
// import AppRoutes from './route/Route';

// const App: React.FC = () => {
//   return (
//     <Provider store={store}>
//       <Router>
//         <AppRoutes />
//       </Router>
//     </Provider>
//   );
// };  
// export default App;


import { Provider } from 'react-redux';
import { store } from './redux/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.scss';
import { routes } from '../src/route/Route';

const router = createBrowserRouter(routes);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;

