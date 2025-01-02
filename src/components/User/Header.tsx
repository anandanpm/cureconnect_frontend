import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/userSlice';
import './Header.scss';
import companyLogo from '../../assets/company logo.png';
import { AppDispatch } from '../../redux/store'; // Adjust the path as needed

interface RootState {
  user: {
    isActive: boolean;
    error: string | null;
  };
}

const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isActive = useSelector((state: RootState) => state.user.isActive);
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
            <button onClick={handleLogout} className="header__login" type="button">Logout</button>
          ) : (
            <Link to="/login" className="header__login">LogIn</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

