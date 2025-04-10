
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutDoctor } from '../../redux/doctorSlice';
import './Doc-Header.scss';
import companyLogo from '../../assets/company logo.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { io, Socket } from 'socket.io-client';

interface RootState {
  doctor: {
    isActive: boolean;
    error: string | null;
    _id?: string;
    doctorId?: string;
    username?: string;
  };
}

interface MessageNotification {
  userId: string;
  count: number;
  timestamp?: number;
}

const DocHeader: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const socketRef = useRef<Socket | null>(null);
  const [messageNotifications, setMessageNotifications] = useState<Record<string, MessageNotification>>({});
  
  const { isActive, doctorId } = useSelector((state: RootState) => ({
    isActive: state.doctor.isActive,
    doctorId: state.doctor._id || state.doctor.doctorId,
    username: state.doctor.username
  }));

  // Function to update message notification - similar to DoctorPatient component
  const updateMessageNotification = (userId: string) => {
    setMessageNotifications((prev) => {
      const currentNotification = prev[userId] || { userId, count: 0 };
      return {
        ...prev,
        [userId]: {
          userId,
          count: currentNotification.count + 1,
          timestamp: Date.now(),
        },
      };
    });
    
    // Show toast notification
    showNotification(userId);
  };

  // Function to show notification
  const showNotification = (senderId: string, message?: string) => {
    // Get current count from state
    const currentCount = messageNotifications[senderId]?.count || 1;
    
    toast.info(
      <div>
        <p><strong>New message from Patient</strong></p>
        <p>{message || `You have new message${currentCount > 1 ? 's' : ''}`}</p>
        <button 
          onClick={() => {
            clearMessageNotification(senderId);
            navigate(`/doctor/chat/${senderId}`);
          }}
          className="toast-btn"
        >
          View Messages
        </button>
      </div>, 
      {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
      }
    );
  };

  const clearMessageNotification = (userId: string) => {
    setMessageNotifications((prev) => {
      const newNotifications = { ...prev };
      delete newNotifications[userId];
      return newNotifications;
    });
  };

  // Initialize WebSocket connection
  useEffect(() => {
    if (doctorId) {
      console.log("Initializing socket with doctor ID:", doctorId);
      
      // Initialize socket connection
      socketRef.current = io(import.meta.env.VITE_WEBSOCKET_URL || "http://localhost:3000", {
        withCredentials: true,
      });

      socketRef.current.on("connect", () => {
        console.log("Socket connected with ID from header:", socketRef.current?.id);
        // Join doctor's room for receiving messages
        socketRef.current?.emit("joinChat", doctorId);
      });

      socketRef.current.on("callNotificationSent", (data) => {
        console.log("Call notification sent status:", data);
        if (!data.success) {
          console.warn("Patient may not be online to receive the call");
          toast.warning("Patient may not be online to receive the call");
        }
      });

      // Listen for incoming messages - match the format from the working component
      socketRef.current.on("receiveMessage", (data) => {
        console.log("Raw message received from header:", data);
        // Extract the sender ID from the message object
        const senderId = data.message?.sender || data.senderId;
        console.log("Sender ID from header:", senderId);
        
        if (senderId && senderId !== doctorId) {
          console.log("Processing message from patient in header:", senderId);
          updateMessageNotification(senderId);
        }
      });

      // Additional notification for appointment bookings
      socketRef.current.on("newAppointment", (data) => {
        toast.success(
          <div>
            <p><strong>New Appointment Booked</strong></p>
            <p>Patient: {data.patientName}</p>
            <p>Date: {new Date(data.appointmentDate).toLocaleDateString()}</p>
            <button 
              onClick={() => navigate('/doctor/appointment')}
              className="toast-btn"
            >
              View Appointments
            </button>
          </div>,
          {
            position: "top-right",
            autoClose: 8000,
          }
        );
      });

      // Clean up function
      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
          console.log("Disconnected socket on cleanup from header");
        }
      };
    }
  }, [doctorId]); // Only depend on doctorId, not isActive

  const handleLogout = async () => {
    try {
      const resultAction = await dispatch(logoutDoctor());
      if (logoutDoctor.fulfilled.match(resultAction)) {
        // Disconnect socket before logout
        if (socketRef.current) {
          socketRef.current.disconnect();
        }
        navigate('/doctor');
      } else {
        console.error("Logout failed:", resultAction.payload);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <header className="doc-header">
        <div className="doc-header__logo">
          <img src={companyLogo} alt="Curaconnect" />
          <h1>Curaconnect</h1>
        </div>
        <nav className="doc-header__nav">
          <ul>
            <li><Link to="/doctor">Home</Link></li>
            <li><Link to="/doctor/appointment">Appointment</Link></li>
            <li><Link to="/doctor/patient">Patient</Link></li>
            <li><Link to="/doctor/profile">Profile</Link></li>
            <li><Link to="/doctor/dashboard">dashboard</Link></li>
          </ul>
        </nav>
        <div className="doc-header__auth">
          {!isActive && (
            <Link to="/doctor/signup" className="doc-header__btn">SignUp</Link>
          )}
          {isActive ? (
            <button onClick={handleLogout} className="doc-header__btn">Logout</button>
          ) : (
            <Link to="/doctor/login" className="doc-header__btn">LogIn</Link>
          )}
        </div>
      </header>
    </>
  );
};

export default DocHeader;
