import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginDoctor, clearError } from '../../redux/doctorSlice';
import google from '../../assets/free-icon-google-300221 1.png';
import './DoctorLogin.scss';

// Define the login schema
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .required('Password is required'),
});

// Define types
interface LoginFormData {
  email: string;
  password: string;
}

interface RootState {
  doctor: {
    loading: boolean;
    error: string | null;
    isActive: boolean;
  };
}

const DoctorLoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isActive } = useSelector((state: RootState) => state.doctor);

  useEffect(() => {
    if (isActive) {
      navigate('/doctor');
    }
  }, [isActive, navigate]);

  useEffect(() => {
    // Clear any existing errors when the component mounts
    dispatch(clearError());
  }, [dispatch]);

  const formik = useFormik<LoginFormData>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(loginDoctor(values) as any);
        // Navigation is handled by the useEffect hook watching isActive
      } catch (error) {
        console.error('Login failed:', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    isSubmitting,
  } = formik;

  return (
    <div className="doctor-login-container">
      <div className="login-card">
        <div className="header">
          <h1>WELCOME BACK, DOCTOR</h1>
          <p>Welcome back! Please enter your details to access your account</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.email && errors.email ? 'error' : ''}
              placeholder="Enter your email"
            />
            {touched.email && errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.password && errors.password ? 'error' : ''}
              placeholder="••••••••"
            />
            {touched.password && errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </div>

          <div className="remember-forgot">
            <div className="remember">
            </div>
            <a href="#" className="forgot">Forgot password?</a>
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={isSubmitting || loading || Object.keys(errors).length > 0}
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="button" 
            className="google-button"
          >
            <img 
              src={google}
              alt="Google logo" 
            />
            Sign in with Google
          </button>

          <div className="signup-link">
            Don't have an account? <Link to={'docsignup'}>Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorLoginPage;

