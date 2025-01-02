import React from "react";
import { Outlet } from "react-router-dom";
import DocHeader from "../components/Doctor/Doc-header";
import DocFooter from "../components/Doctor/Doc-footer";



const DoctorLayout:React.FC = ()=>{

   return (
    <>
<DocHeader/>
<Outlet/>
<DocFooter/>
</>
   )



}

export default DoctorLayout

// import React from "react";
// import { Outlet } from "react-router-dom";
// import DocHeader from "../components/Doctor/Doc-header";
// import DocFooter from "../components/Doctor/Doc-footer";

// interface DoctorLayoutProps {
//   children: React.ReactNode;
// }

// const DoctorLayout: React.FC<DoctorLayoutProps> = ({ children }) => {
//   return (
//     <>
//       <DocHeader />
//       {children || <Outlet />}
//       <DocFooter />
//     </>
//   );
// };

// export default DoctorLayout;
