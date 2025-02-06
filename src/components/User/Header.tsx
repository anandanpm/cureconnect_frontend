

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/userSlice';
import './Header.scss';
import companyLogo from '../../assets/company logo.png';
import { AppDispatch } from '../../redux/store';
import { 
  Avatar,
  Menu,
  MenuItem,
  Divider,
  IconButton,
  Typography
} from '@mui/material';
import { User, Calendar, MessageSquare, Wallet, LogOut } from 'lucide-react';

interface RootState {
  user: {
    isActive: boolean;
    error: string | null;
    profile_pic?: string;
    username?: string;
  };
}

const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isActive, profile_pic, username } = useSelector((state: RootState) => state.user);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    handleClose();
  };

  const handleLogout = async () => {
    try {
      const resultAction = await dispatch(logoutUser());
      if (logoutUser.fulfilled.match(resultAction)) {
        navigate('/');
      } else {
        console.error("Logout failed:", resultAction.payload);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
    handleClose();
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          <img src={companyLogo} alt="Curaconnect" />
          <div>
            <span className="cura">Cura</span><span className="connect">connect</span>
          </div>
        </Link>
        <nav className="header__nav">
          <Link to="/" className="header__nav-link">Home</Link>
          <Link to="/doctordetails" className="header__nav-link">Doctor</Link>
          <Link to="/about" className="header__nav-link">About</Link>
          <Link to="/contact" className="header__nav-link">Contact</Link>
        </nav>
        <div className="header__actions">
          {!isActive && (
            <Link to="/signup" className="header__signup">SignUp</Link>
          )}
          {isActive ? (
            <div className="header__user-info">
              <IconButton
                onClick={handleClick}
                size="small"
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar 
                  sx={{ width: 40, height: 40 }}
                  src={profile_pic}
                  alt={username || 'User'}
                >
                  
                </Avatar>
              </IconButton>
              <Typography variant="subtitle1" className="header__user-name">
                {username || 'User'}
              </Typography>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    width: 220,
                    '& .MuiMenuItem-root': {
                      px: 2,
                      py: 1,
                      gap: 1.5,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={() => handleMenuItemClick('/profile')}>
                  <User size={18} />
                  Profile
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('/appointment')}>
                  <Calendar size={18} />
                  Appointments
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('/chat')}>
                  <MessageSquare size={18} />
                  Chat
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('/wallet')}>
                  <Wallet size={18} />
                  Wallet
                </MenuItem>
                <Divider />
                <MenuItem 
                  onClick={handleLogout}
                  sx={{ color: 'error.main' }}
                >
                  <LogOut size={18} />
                  Logout
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Link to="/login" className="header__login">LogIn</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

