import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/User/Header";
import Footer from "../components/User/Footer";



const UserLayout:React.FC = ()=>{

   return (
    <>
<Header/>
<Outlet/>
<Footer/>
</>
   )



}

export default UserLayout

// import React from "react";
// import { Outlet } from "react-router-dom";
// import Header from "../components/User/Header";
// import Footer from "../components/User/Footer";

// interface UserLayoutProps {
//   children: React.ReactNode;
// }

// const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
//   return (
//     <>
//       <Header />
//       {children || <Outlet />}
//       <Footer />
//     </>
//   );
// };

// export default UserLayout;