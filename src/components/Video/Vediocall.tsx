
// import React, { useEffect, useRef, useState } from "react";
// import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
// import "./Vediocall.scss";

// interface VideoCallProps {
//   appointmentId: string;
//   userRole: "doctor" | "patient";
//   userId: string;
//   userName: string;
// }

// const VideoCallComponent: React.FC<VideoCallProps> = ({ appointmentId, userId, userRole, userName }) => {
//   console.log(appointmentId, userId, userRole, userName, 'video call component props');
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const videoContainerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (!videoContainerRef.current) {
//         console.error("Video container ref is null");
//         setError("Video container not found. Please refresh and try again.");
//         setIsLoading(false);
//         return;
//       }

//       const initializeCall = async () => {
//         try {
          
//           console.log("Initializing video call...");
          
//           const appID = Number(import.meta.env.VITE_ZEGOCLOUD_APP_ID);
//           const serverSecret = import.meta.env.VITE_ZEGOCLOUD_SECRETKEY;
          
//           if (!appID || !serverSecret) {
//             throw new Error("Missing ZEGOCLOUD credentials. Check your environment variables.");
//           }

//           console.log("Using appID:", appID);
          
//           // Generate token for the session
//           const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//             appID,
//             serverSecret,
//             appointmentId,
//             userId,
//             userName
//           );

//           console.log("Token generated successfully");

//           // Create a Zego instance
//           const zp = ZegoUIKitPrebuilt.create(kitToken);
          
//           if (!zp) {
//             throw new Error("Failed to create ZegoUIKitPrebuilt instance");
//           }

//           // Configure and join room
//           zp.joinRoom({
//             container: videoContainerRef.current,
//             scenario: {
//               mode: ZegoUIKitPrebuilt.OneONoneCall,
//             },
//             showScreenSharingButton: userRole === "doctor",
//             showLeavingView: true,
//             turnOnMicrophoneWhenJoining: true,
//             turnOnCameraWhenJoining: true,
//             showMyCameraToggleButton: true,
//             showMyMicrophoneToggleButton: true,
//             showUserList: true,
//             maxUsers: 2,
//             onJoinRoom: () => {
//               console.log("Successfully joined room");
//               setIsLoading(false);
//             },
//             onLeaveRoom: () => {
//               console.log("Left room");
//             },
//           });
//           setTimeout(() => {
//             setIsLoading(false);
//           }, 10000);
          
//         } catch (err) {
//           console.error("Failed to initialize video call:", err);
//           setError(`Failed to initialize video call: ${err instanceof Error ? err.message : "Unknown error"}`);
//           setIsLoading(false);
//         }
//       };

//       initializeCall();
//     }, 500); 

//     return () => clearTimeout(timer);
//   }, [appointmentId, userId, userName, userRole]);

//   return (
//     <div className="video-call-wrapper">
//       {isLoading && (
//         <div className="loading-container">
//           <p className="loading-text">Preparing video call...</p>
//           <div className="loading-spinner"></div>
//         </div>
//       )}
      
//       {error && (
//         <div className="error-container">
//           <p className="error-message">{error}</p>
//         </div>
//       )}
      
//       <div 
//         ref={videoContainerRef} 
//         className="video-container" 
//         style={{ 
//           width: '100%', 
//           height: '70vh',
//           display: 'block'
//         }}
//       ></div>
//     </div>
//   );
// };

// export default VideoCallComponent;

// import React, { useEffect, useRef, useState } from "react";
// import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
// import "./Vediocall.scss";
// import io,{Socket} from "socket.io-client";

// interface VideoCallProps {
//   appointmentId: string;
//   userRole: "doctor" | "patient";
//   userId: string; //patientId
//   userName: string;
//   doctorId: string;
// }

// const VideoCallComponent: React.FC<VideoCallProps> = ({ 
//   appointmentId, 
//   userId, 
//   userRole, 
//   doctorId,
//   userName,
// }) => {
//   console.log(appointmentId, userId, userRole, userName, 'video call component props');
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const videoContainerRef = useRef<HTMLDivElement>(null);

//   const socketRef = useRef<Socket | null>(null);

//   useEffect(() => {
//     socketRef.current = io(import.meta.env.VITE_WEBSOCKET_URL || "http://localhost:3000", {
//       withCredentials: true
//     });

//     const timer = setTimeout(() => {
//       if (!videoContainerRef.current) {
//         console.error("Video container ref is null");
//         setError("Video container not found. Please refresh and try again.");
//         setIsLoading(false);
//         return;
//       }

//       const initializeCall = async () => {
//         try {
//           console.log("Initializing video call...");
          
//           const appID = Number(import.meta.env.VITE_ZEGOCLOUD_APP_ID);
//           const serverSecret = import.meta.env.VITE_ZEGOCLOUD_SECRETKEY;
          
//           if (!appID || !serverSecret) {
//             throw new Error("Missing ZEGOCLOUD credentials. Check your environment variables.");
//           }

//           const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//             appID,
//             serverSecret,
//             doctorId,
//             appointmentId,
//             userName
//           );

//           const zp = ZegoUIKitPrebuilt.create(kitToken);
          
//           if (!zp) {
//             throw new Error("Failed to create ZegoUIKitPrebuilt instance");
//           }

//           zp.joinRoom({
//             container: videoContainerRef.current,
//             scenario: {
//               mode: ZegoUIKitPrebuilt.OneONoneCall,
//             },
//             showScreenSharingButton: userRole === "doctor",
//             showLeavingView: true,
//             turnOnMicrophoneWhenJoining: true,
//             turnOnCameraWhenJoining: true,
//             showMyCameraToggleButton: true,
//             showMyMicrophoneToggleButton: true,
//             showUserList: true,
//             maxUsers: 2,
//             onJoinRoom: () => {
//               console.log("Successfully joined room");
//               setIsLoading(false);
//               // When doctor joins, send notification to patient
//               if (userRole === "doctor" && socketRef.current) {
//                 socketRef.current.emit("callNotification", {
//                   appointmentId,
//                    userId, 
//                   doctorName: userName
//                 });
//               }
//             },
//             onLeaveRoom: () => {
//               console.log("Left room");
//             },
//           });
          
//         } catch (err) {
//           console.error("Failed to initialize video call:", err);
//           setError(`Failed to initialize video call: ${err instanceof Error ? err.message : "Unknown error"}`);
//           setIsLoading(false);
//         }
//       };

//       initializeCall();

//       // For patient: Listen for call notifications using userId as patientId
//       if (userRole === "patient" && socketRef.current) {
//         socketRef.current.emit("joinChat", userId); // userId is patientId
//         socketRef.current.on("callNotification", (data: any) => {
//           if (data.appointmentId === appointmentId) {
//             console.log("Received call notification from doctor:", data.doctorName);
//             setIsLoading(false); // Patient can join once notified
//           }
//         });
//       }

//     }, 500);

//     return () => {
//       clearTimeout(timer);
//       if (socketRef.current) {
//         socketRef.current.disconnect();
//       }
//     };
//   }, [appointmentId, userId, userRole, userName]);

//   return (
//     <div className="video-call-wrapper">
//       {isLoading && (
//         <div className="loading-container">
//           <p className="loading-text">Preparing video call...</p>
//           <div className="loading-spinner"></div>
//         </div>
//       )}
      
//       {error && (
//         <div className="error-container">
//           <p className="error-message">{error}</p>
//         </div>
//       )}
      
//       <div 
//         ref={videoContainerRef} 
//         className="video-container" 
//         style={{ 
//           width: '100%', 
//           height: '70vh',
//           display: 'block'
//         }}
//       ></div>
//     </div>
//   );
// };

// export default VideoCallComponent;

// import React, { useEffect, useRef, useState } from "react";
// import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
// import "./Vediocall.scss";
// import io, { Socket } from "socket.io-client";
// import { useParams, useLocation } from "react-router-dom";

// interface VideoCallProps {
//   appointmentId?: string;
//   userRole?: "doctor" | "patient";
//   userId?: string; //patientId
//   userName?: string;
//   doctorId?: string;
// }

// const VideoCallComponent: React.FC<VideoCallProps> = ({ 
//   appointmentId: propAppointmentId, 
//   userId: propUserId, 
//   userRole: propUserRole, 
//   doctorId: propDoctorId,
//   userName: propUserName,
// }) => {
//   const location = useLocation();
//   const { appointmentId: paramAppointmentId } = useParams<{ appointmentId: string }>();

//   // Prioritize props, then location state, then params
//   const appointmentId = propAppointmentId || location.state?.appointmentId || paramAppointmentId;
//   const userId = propUserId || location.state?.userId;
//   const userRole = propUserRole || location.state?.userRole || "doctor";
//   const doctorId = propDoctorId || location.state?.doctorId;
//   const userName = propUserName || location.state?.doctorName || "User";

//   console.log(appointmentId, userId, userRole, userName, 'video call component props');
  
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const videoContainerRef = useRef<HTMLDivElement>(null);
//   const socketRef = useRef<Socket | null>(null);

//   useEffect(() => {
//     // Validate required parameters
//     if (!appointmentId || !userId || !doctorId) {
//       setError("Missing required video call parameters");
//       setIsLoading(false);
//       return;
//     }

//     socketRef.current = io(import.meta.env.VITE_WEBSOCKET_URL || "http://localhost:3000", {
//       withCredentials: true
//     });

//     const timer = setTimeout(() => {
//       if (!videoContainerRef.current) {
//         console.error("Video container ref is null");
//         setError("Video container not found. Please refresh and try again.");
//         setIsLoading(false);
//         return;
//       }

//       const initializeCall = async () => {
//         try {
//           console.log("Initializing video call...");
          
//           const appID = Number(import.meta.env.VITE_ZEGOCLOUD_APP_ID);
//           const serverSecret = import.meta.env.VITE_ZEGOCLOUD_SECRETKEY;
          
//           if (!appID || !serverSecret) {
//             throw new Error("Missing ZEGOCLOUD credentials. Check your environment variables.");
//           }

//           const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//             appID,
//             serverSecret,
//             doctorId,
//             appointmentId,
//             userName
//           );

//           const zp = ZegoUIKitPrebuilt.create(kitToken);
          
//           if (!zp) {
//             throw new Error("Failed to create ZegoUIKitPrebuilt instance");
//           }

//           zp.joinRoom({
//             container: videoContainerRef.current,
//             scenario: {
//               mode: ZegoUIKitPrebuilt.OneONoneCall,
//             },
//             showScreenSharingButton: userRole === "doctor",
//             showLeavingView: true,
//             turnOnMicrophoneWhenJoining: true,
//             turnOnCameraWhenJoining: true,
//             showMyCameraToggleButton: true,
//             showMyMicrophoneToggleButton: true,
//             showUserList: true,
//             maxUsers: 2,
//             onJoinRoom: () => {
//               console.log("Successfully joined room");
//               setIsLoading(false);
//               // When doctor joins, send notification to patient
//               if (userRole === "doctor" && socketRef.current) {
//                 socketRef.current.emit("callNotification", {
//                   appointmentId,
//                   userId, 
//                   doctorName: userName
//                 });
//               }
//             },
//             onLeaveRoom: () => {
//               console.log("Left room");
//             },
//           });
          
//         } catch (err) {
//           console.error("Failed to initialize video call:", err);
//           setError(`Failed to initialize video call: ${err instanceof Error ? err.message : "Unknown error"}`);
//           setIsLoading(false);
//         }
//       };

//       initializeCall();

//       // For patient: Listen for call notifications using userId as patientId
//       if (userRole === "patient" && socketRef.current) {
//         socketRef.current.emit("joinChat", userId); // userId is patientId
//         socketRef.current.on("callNotification", (data: any) => {
//           if (data.appointmentId === appointmentId) {
//             console.log("Received call notification from doctor:", data.doctorName);
//             setIsLoading(false); // Patient can join once notified
//           }
//         });
//       }

//     }, 500);

//     return () => {
//       clearTimeout(timer);
//       if (socketRef.current) {
//         socketRef.current.disconnect();
//       }
//     };
//   }, [appointmentId, userId, userRole, userName, doctorId]);

//   // If there's an error with parameters, show error message
//   if (error) {
//     return (
//       <div className="error-container">
//         <p className="error-message">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="video-call-wrapper">
//       {isLoading && (
//         <div className="loading-container">
//           <p className="loading-text">Preparing video call...</p>
//           <div className="loading-spinner"></div>
//         </div>
//       )}
      
//       <div 
//         ref={videoContainerRef} 
//         className="video-container" 
//         style={{ 
//           width: '100%', 
//           height: '70vh',
//           display: 'block'
//         }}
//       ></div>
//     </div>
//   );
// };

// export default VideoCallComponent;

// import React, { useEffect, useRef, useState } from "react";
// import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
// import "./Vediocall.scss";
// import io, { Socket } from "socket.io-client";
// import { useParams, useLocation,useNavigate } from "react-router-dom";

// interface VideoCallProps {
//   appointmentId?: string;
//   userRole?: "doctor" | "patient";
//   userId?: string; // patientId
//   userName?: string;
//   doctorId?: string;
// }

// const VideoCallComponent: React.FC<VideoCallProps> = ({
//   appointmentId: propAppointmentId,
//   userId: propUserId,
//   userRole: propUserRole,
//   doctorId: propDoctorId,
//   userName: propUserName,
// }) => {
//   const location = useLocation();
//   const { appointmentId: paramAppointmentId } = useParams<{ appointmentId: string }>();

//   // Prioritize props, then location state, then params
//   const appointmentId = propAppointmentId || location.state?.appointmentId || paramAppointmentId;
//   const userId = propUserId || location.state?.userId;
//   const userRole = propUserRole || location.state?.userRole || "doctor";
//   const doctorId = propDoctorId || location.state?.doctorId;
//   const userName = propUserName || location.state?.userName || "User";

//   console.log(appointmentId, userId, userRole, userName, doctorId, "video call component props");

//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isCallActive, setIsCallActive] = useState(true); // To control call state
//   const videoContainerRef = useRef<HTMLDivElement>(null);
//   const socketRef = useRef<Socket | null>(null);
//   const zpRef = useRef<ZegoUIKitPrebuilt | null>(null); // Store Zego instance
//   const navigate = useNavigate()

//   useEffect(() => {
//     // Validate required parameters
//     if (!appointmentId || !userId || !doctorId) {
//       setError("Missing required video call parameters");
//       setIsLoading(false);
//       return;
//     }

//     socketRef.current = io(import.meta.env.VITE_WEBSOCKET_URL || "http://localhost:3000", {
//       withCredentials: true,
//     });

//     const initializeCall = async () => {
//       if (!videoContainerRef.current) {
//         console.error("Video container ref is null");
//         setError("Video container not found.");
//         setIsLoading(false);
//         return;
//       }

//       try {
//         console.log("Initializing video call...");
//         const appID = Number(import.meta.env.VITE_ZEGOCLOUD_APP_ID);
//         const serverSecret = import.meta.env.VITE_ZEGOCLOUD_SECRETKEY;

//         if (!appID || !serverSecret) {
//           throw new Error("Missing ZEGOCLOUD credentials. Check your environment variables.");
//         }

//         const effectiveUserId = userRole === "doctor" ? doctorId : userId;
//         console.log("Effective User ID for token:", effectiveUserId);

//         const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//           appID,
//           serverSecret,
//           appointmentId, // Use appointmentId as roomID
//           effectiveUserId,
//           userName
//         );

//         console.log("Kit Token generated:", kitToken ? "[GENERATED]" : "undefined");

//         if (!kitToken) {
//           throw new Error("Failed to generate kit token.");
//         }

//         zpRef.current = ZegoUIKitPrebuilt.create(kitToken);

//         if (!zpRef.current) {
//           throw new Error("Failed to create ZegoUIKitPrebuilt instance");
//         }

//         console.log("Zego instance created successfully");

//         zpRef.current.joinRoom({
//           container: videoContainerRef.current,
//           scenario: {
//             mode: ZegoUIKitPrebuilt.OneONoneCall,
//           },
//           showScreenSharingButton: userRole === "doctor",
//           showLeavingView: true,
//           turnOnMicrophoneWhenJoining: true,
//           turnOnCameraWhenJoining: true,
//           showMyCameraToggleButton: true,
//           showMyMicrophoneToggleButton: true,
//           showUserList: true,
//           maxUsers: 2,
//           onJoinRoom: () => {
//             console.log("Successfully joined room");
//             setIsLoading(false);
//             if (userRole === "doctor" && socketRef.current) {
//               socketRef.current.emit("callNotification", {
//                 appointmentId,
//                 userId, // Patient ID
//                 doctorName: userName,
//                 doctorId: doctorId,
//               });
//             }
//           },
//           onLeaveRoom: () => {
//             console.log("Left room");
//             setIsCallActive(false);
//             navigate('/doctor/patient')
//           },
//         });
//       } catch (err) {
//         console.error("Failed to initialize video call:", err);
//         setError(
//           `Failed to initialize video call: ${err instanceof Error ? err.message : "Unknown error"}`
//         );
//         setIsLoading(false);
//       }
//     };

//     initializeCall();

//     if (userRole === "patient" && socketRef.current) {
//       socketRef.current.emit("joinChat", userId);
//       socketRef.current.on("callNotification", (data: any) => {
//         if (data.appointmentId === appointmentId) {
//           console.log("Received call notification from doctor:", data.doctorName);
//           setIsLoading(false);
//         }
//       });
//     }

//     // Cleanup function
//     return () => {
//       if (zpRef.current) {
//         zpRef.current.hangUp(); // Explicitly hang up the call
//         console.log("Hung up call on cleanup");
//       }
//       if (socketRef.current) {
//         socketRef.current.disconnect();
//         console.log("Disconnected socket on cleanup");
//       }
//     };
//   }, [appointmentId, userId, userRole, userName, doctorId]);

//   // const handleCancelCall = () => {
//   //   if (zpRef.current) {
//   //     zpRef.current.hangUp(); // Hang up the call
//   //     console.log("Call manually cancelled");
//   //   }
//   //   if (socketRef.current) {
//   //     socketRef.current.disconnect();
//   //   }
//   //   setIsCallActive(false);
//   // };

//   if (error) {
//     return (
//       <div className="error-container">
//         <p className="error-message">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="video-call-wrapper">
//       {isLoading && (
//         <div className="loading-container">
//           {/* <p className="loading-text">Preparing video call...</p>
//           <div className="loading-spinner"></div> */}
//         </div>
//       )}

//       {isCallActive && (
//         <>
//           <div
//             ref={videoContainerRef}
//             className="video-container"
//             style={{
//               width: "100%",
//               height: "70vh",
//               display: "block",
//             }}
//           ></div>
//         </>
//       )}
//     </div>
//   );
// };

// export default VideoCallComponent;


import React, { useEffect, useRef, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import "./Vediocall.scss";
import io, { Socket } from "socket.io-client";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { completeAppointment } from "../../api/doctorApi";

interface VideoCallProps {
  appointmentId?: string;
  userRole?: "doctor" | "patient";
  userId?: string; // patientId
  userName?: string;
  doctorId?: string;
}

const VideoCallComponent: React.FC<VideoCallProps> = ({
  appointmentId: propAppointmentId,
  userId: propUserId,
  userRole: propUserRole,
  doctorId: propDoctorId,
  userName: propUserName,
}) => {
  const location = useLocation();
  const { appointmentId: paramAppointmentId } = useParams<{ appointmentId: string }>();

  // Prioritize props, then location state, then params
  const appointmentId = propAppointmentId || location.state?.appointmentId || paramAppointmentId;
  const userId = propUserId || location.state?.userId;
  const userRole = propUserRole || location.state?.userRole || "doctor";
  const doctorId = propDoctorId || location.state?.doctorId;
  const userName = propUserName || location.state?.userName || "User";

  console.log(appointmentId, userId, userRole, userName, doctorId, "video call component props");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCallActive, setIsCallActive] = useState(true); // To control call state
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);
  const zpRef = useRef<ZegoUIKitPrebuilt | null>(null); // Store Zego instance
  const navigate = useNavigate();

  useEffect(() => {
    // Validate required parameters
    if (!appointmentId || !userId || !doctorId) {
      setError("Missing required video call parameters");
      setIsLoading(false);
      return;
    }

    // Connect to the socket with auth credentials to ensure proper user identification
    socketRef.current = io(import.meta.env.VITE_WEBSOCKET_URL || "http://localhost:3000", {
      withCredentials: true,
    });

    // Setup socket event handlers
    if (socketRef.current) {
      socketRef.current.on("connect", () => {
        console.log("Socket connected with ID:", socketRef.current?.id);
      });

      // Specific handler for doctor to know if notification was sent successfully
      if (userRole === "doctor") {
        socketRef.current.on("callNotificationSent", (data) => {
          console.log("Call notification sent status:", data);
          if (!data.success) {
            console.warn("Patient may not be online to receive the call");
          }
        });
      }
      
      // Patient specific handlers
      if (userRole === "patient") {

        
        socketRef.current.on("callNotificationemit", (data: any) => {
          console.log("Received call notification:", data);
          if (data.userId === userId) {
            console.log("Received call notification from doctor:", data.doctorName);
            setIsLoading(false);
          }
        });
        
        socketRef.current.on("debugCallNotification", (data) => {
          console.log("Debug call notification received:", data);
        });
      }
    }

    const initializeCall = async () => {
      if (!videoContainerRef.current) {
        console.error("Video container ref is null");
        setError("Video container not found.");
        setIsLoading(false);
        return;
      }

      try {
        console.log("Initializing video call...");
        const appID = Number(import.meta.env.VITE_ZEGOCLOUD_APP_ID);
        const serverSecret = import.meta.env.VITE_ZEGOCLOUD_SECRETKEY;

        if (!appID || !serverSecret) {
          throw new Error("Missing ZEGOCLOUD credentials. Check your environment variables.");
        }

        const effectiveUserId = userRole === "doctor" ? doctorId : userId;
        console.log("Effective User ID for token:", effectiveUserId);

        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appID,
          serverSecret,
          appointmentId, // Use appointmentId as roomID
          effectiveUserId,
          userName
        );

        console.log("Kit Token generated:", kitToken ? "[GENERATED]" : "undefined");

        if (!kitToken) {
          throw new Error("Failed to generate kit token.");
        }

        zpRef.current = ZegoUIKitPrebuilt.create(kitToken);

        if (!zpRef.current) {
          throw new Error("Failed to create ZegoUIKitPrebuilt instance");
        }

        console.log("Zego instance created successfully");

        zpRef.current.joinRoom({
          container: videoContainerRef.current,
          scenario: {
            mode: ZegoUIKitPrebuilt.OneONoneCall,
          },
          showScreenSharingButton: userRole === "doctor",
          showLeavingView: true,
          turnOnMicrophoneWhenJoining: true,
          turnOnCameraWhenJoining: true,
          showMyCameraToggleButton: true,
          showMyMicrophoneToggleButton: true,
          showUserList: true,
          maxUsers: 2,
          onJoinRoom: () => {
            console.log("Successfully joined room");
            setIsLoading(false);
            
            // Send notification only after successfully joining the room
            if (userRole === "doctor" && socketRef.current && socketRef.current.connected) {
              console.log("Doctor sending call notification for patient:", userId);
              socketRef.current.emit("callNotification", {
                appointmentId,
                userId, // Patient ID
                doctorName: userName,
                doctorId: doctorId,
              });
            }
          },
          onLeaveRoom: async () => {
            console.log("Left room");
            setIsCallActive(false);
            if (userRole === "doctor") {
              try {
                await completeAppointment(appointmentId);
                console.log(`Appointment ${appointmentId} marked as complete`);
              } catch (error) {
                console.error('Error completing appointment:', error);
              }
              navigate(`/doctor/prescription/${appointmentId}`);
            } else if (userRole === "patient") {
              navigate(`/review/${appointmentId}`);
            }
          },
        });
      } catch (err) {
        console.error("Failed to initialize video call:", err);
        setError(
          `Failed to initialize video call: ${err instanceof Error ? err.message : "Unknown error"}`
        );
        setIsLoading(false);
      }
    };

    // Short delay before initializing call to ensure socket is connected
    setTimeout(() => {
      initializeCall();
    }, 1000);

    // Cleanup function
    return () => {
      if (zpRef.current) {
        zpRef.current.hangUp(); // Explicitly hang up the call
        console.log("Hung up call on cleanup");
      }
      if (socketRef.current) {
        socketRef.current.disconnect();
        console.log("Disconnected socket on cleanup");
      }
    };
  }, [appointmentId, userId, userRole, userName, doctorId, navigate]);

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="video-call-wrapper">
      {isLoading && (
        <div className="loading-container">
          <p className="loading-text">Preparing video call...</p>
          <div className="loading-spinner"></div>
        </div>
      )}

      {isCallActive && (
        <>
          <div
            ref={videoContainerRef}
            className="video-container"
            style={{
              width: "100%",
              height: "70vh",
              display: "block",
            }}
          ></div>
        </>
      )}
    </div>
  );
};

export default VideoCallComponent;

