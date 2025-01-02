import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutDoctor } from '../../redux/doctorSlice';
import './Doc-Header.scss';
import companyLogo from '../../assets/company logo.png';
import { AppDispatch } from '../../redux/store';

interface RootState {
  doctor: {
    isActive: boolean;
    error: string | null;
  };
}

const DocHeader: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isActive = useSelector((state: RootState) => state.doctor.isActive);

  const handleLogout = async () => {
    try {
      const resultAction = await dispatch(logoutDoctor());
      if (logoutDoctor.fulfilled.match(resultAction)) {
        navigate('/doctor');
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
        <Link to="/doctor" className="header__logo">
          <img src={companyLogo} alt="Curaconnect" />
          <div>
            <span className="cura">Cura</span><span className="connect">connect</span>
          </div>
        </Link>
        <nav className="header__nav">
          <Link to="/doctor" className="header__nav-link">Home</Link>
          <Link to="/doctor/appointment" className="header__nav-link">Appointment</Link>
          <Link to="/doctor/patient" className="header__nav-link">Patient</Link>
          <Link to="/doctor/profile" className="header__nav-link">Profile</Link>
        </nav>
        <div className="header__actions">
          {!isActive && (
            <Link to="docsignup" className="header__signup">SignUp</Link>
          )}
          {isActive ? (
            <button onClick={handleLogout} className="header__login" type="button">Logout</button>
          ) : (
            <Link to="doclogin" className="header__login">LogIn</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default DocHeader;

