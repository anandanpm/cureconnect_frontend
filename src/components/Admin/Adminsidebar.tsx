// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { 
//   Drawer, 
//   List, 
//   ListItem,
//   ListItemButton,
//   ListItemIcon, 
//   ListItemText, 
//   Typography
// } from '@mui/material';
// import { 
//   Dashboard as DashboardIcon,
//   People as PeopleIcon,
//   AccountBalanceWallet as WalletIcon,
//   Assignment as AssignmentIcon,
//   Person as PersonIcon,
//   Message as MessageIcon
// } from '@mui/icons-material';
// import './Adminsidebar.scss';

// const navItems = [
//   { path: '/admin/dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
//   { path: '/admin/patients', label: 'Patients', icon: <PeopleIcon /> },
//   { path: '/admin/wallet', label: 'Wallet', icon: <WalletIcon /> },
//   { path: '/admin/report', label: 'Report', icon: <AssignmentIcon /> },
//   { path: '/admin/profile', label: 'Profile', icon: <PersonIcon /> },
//   { path: '/admin/complaints', label: 'Complaints', icon: <MessageIcon /> },
// ];

// const Sidebar: React.FC = () => {
//   return (
//     <Drawer
//       variant="permanent"
//       className="sidebar"
//     >
//       <div className="logo">
//         <Typography variant="h6" component={NavLink} to="/admin/dashboard">
//           CuraConnect
//         </Typography>
//       </div>
//       <List>
//         {navItems.map((item) => (
//           <NavLink key={item.path} to={item.path} className="nav-link">
//             {({ isActive }) => (
//               <ListItem disablePadding>
//                 <ListItemButton component="div" className={isActive ? 'active' : ''}>
//                   <ListItemIcon>
//                     {item.icon}
//                   </ListItemIcon>
//                   <ListItemText primary={item.label} />
//                 </ListItemButton>
//               </ListItem>
//             )}
//           </NavLink>
//         ))}
//       </List>
//     </Drawer>
//   );
// };

// export default Sidebar;


import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Drawer, 
  List, 
  ListItem,
  ListItemButton,
  ListItemIcon, 
  ListItemText, 
  Typography
} from '@mui/material';
import { 
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  AccountBalanceWallet as WalletIcon,
  Assignment as AssignmentIcon,
  Person as PersonIcon,
  Message as MessageIcon,
  LocalHospital as DoctorIcon
} from '@mui/icons-material';
import './Adminsidebar.scss';

const navItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
  { path: '/admin/patients', label: 'Patients', icon: <PeopleIcon /> },
  { path: '/admin/doctors', label: 'Doctors', icon: <DoctorIcon /> },
  { path: '/admin/wallet', label: 'Wallet', icon: <WalletIcon /> },
  { path: '/admin/report', label: 'Report', icon: <AssignmentIcon /> },
  { path: '/admin/profile', label: 'Profile', icon: <PersonIcon /> },
  { path: '/admin/complaints', label: 'Complaints', icon: <MessageIcon /> },
];

const Sidebar: React.FC = () => {
  return (
    <Drawer
      variant="permanent"
      className="sidebar"
    >
      <div className="logo">
        <Typography variant="h6" component={NavLink} to="/admin/dashboard">
          CuraConnect
        </Typography>
      </div>
      <List>
        {navItems.map((item) => (
          <NavLink key={item.path} to={item.path} className="nav-link">
            {({ isActive }) => (
              <ListItem disablePadding>
                <ListItemButton component="div" className={isActive ? 'active' : ''}>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            )}
          </NavLink>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;