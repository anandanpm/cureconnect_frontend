
// import type React from "react"
// import { useState, useEffect, useRef } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import { useDispatch, useSelector } from "react-redux"
// import { logoutUser } from "../../redux/userSlice"
// import "./Header.scss"
// import companyLogo from "../../assets/company logo.png"
// import type { AppDispatch } from "../../redux/store"
// import { Avatar, Menu, MenuItem, Divider, IconButton, Typography } from "@mui/material"
// import { User, Calendar, LogOut, MenuIcon, X } from "lucide-react"
// import io, { type Socket } from "socket.io-client"
// import Swal from "sweetalert2"

// interface RootState {
//   user: {
//     isActive: boolean
//     error: string | null
//     profile_pic?: string
//     username?: string
//     _id?: string
//     role?: string
//   }
// }

// interface CallNotificationData {
//   appointmentId: string
//   userId: string
//   doctorName: string
//   doctorId: string
//   roomId: string
// }

// const Header: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>()
//   const navigate = useNavigate()
//   const { isActive, profile_pic, username, _id: id, role } = useSelector((state: RootState) => state.user)
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
//   const open = Boolean(anchorEl)
//   const socketRef = useRef<Socket | null>(null)
//   const [socketConnected, setSocketConnected] = useState(false)
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

//   useEffect(() => {
//     socketRef.current = io("http://localhost:3000", {
//       withCredentials: true,
//       reconnection: true,
//       reconnectionAttempts: 5,
//       reconnectionDelay: 1000,
//     })

//     socketRef.current.on("connect", () => {
//       console.log("Socket connected with ID:", socketRef.current?.id)
//       setSocketConnected(true)
//       // Join chat with user ID
//       socketRef.current?.emit("joinChat", id)
//       console.log("Emitted joinChat with user ID:", id)
//     })

//     socketRef.current.on("connect_error", (error) => {
//       console.error("Socket connection error:", error)
//       setSocketConnected(false)
//     })

//     // Listen specifically for callNotificationemit event
//     socketRef.current.on("callNotificationemit", (data: CallNotificationData) => {
//       console.log("Received call notification emit:", data)

//       // Check if the notification is for the current user
//       console.log(id, "is the id is comming or not ")
//       if (data.userId === id) {
//         console.log("Call notification matches current user")
//         showCallAlert(data)
//       }
//     })

//     socketRef.current.on("disconnect", (reason) => {
//       console.log("Socket disconnected:", reason)
//       setSocketConnected(false)
//     })

//     return () => {
//       console.log("Cleaning up socket connection")
//       if (socketRef.current) {
//         socketRef.current.off("connect")
//         socketRef.current.off("connect_error")
//         socketRef.current.off("callNotificationemit")
//         socketRef.current.off("disconnect")
//         socketRef.current.disconnect()
//       }
//     }
//   }, [isActive, id, role])

//   useEffect(() => {
//     if (socketRef.current) {
//       socketRef.current.emit("joinChat", id)
//       console.log("Re-joined chat with user ID:", id)
//     }
//   }, [id, socketConnected])

//   // Close mobile menu when navigating
//   useEffect(() => {
//     setMobileMenuOpen(false)
//   }, [navigate])

//   const showCallAlert = (data: CallNotificationData) => {
//     const { appointmentId, doctorName, doctorId, roomId } = data

//     Swal.fire({
//       title: "Incoming Video Call",
//       html: `<p>Dr. ${doctorName} is calling you for your appointment.</p>`,
//       icon: "info",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Join Call",
//       cancelButtonText: "Decline",
//       allowOutsideClick: false,
//       allowEscapeKey: false,
//       timer: 60000,
//       timerProgressBar: true,
//     }).then((result) => {
//       if (result.isConfirmed) {
//         // Inform the server that call was accepted
//         if (socketRef.current) {
//           socketRef.current.emit("callAccepted", {
//             appointmentId,
//             roomId: roomId,
//             userId: id,
//             doctorId: doctorId,
//           })
//         }

//         // Pass the roomId to the video call component via URL parameter for reliability
//         navigate(`/video-call/${appointmentId}/${roomId}`, {
//           state: {
//             roomId: roomId, // Also include in state as backup
//             appointmentId,
//             userId: id,
//             userRole: "patient",
//             userName: username || "Patient",
//             doctorId: doctorId,
//           },
//         })
//       } else {
//         console.log("Call declined")
//         if (socketRef.current) {
//           socketRef.current.emit("callDeclined", {
//             appointmentId,
//             userId: id,
//             doctorId: doctorId,
//           })
//         }
//       }
//     })
//   }

//   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget)
//   }

//   const handleClose = () => {
//     setAnchorEl(null)
//   }

//   const handleMenuItemClick = (path: string) => {
//     navigate(path)
//     handleClose()
//   }

//   const handleLogout = async () => {
//     try {
//       if (socketRef.current) {
//         socketRef.current.disconnect()
//         setSocketConnected(false)
//       }

//       const resultAction = await dispatch(logoutUser())
//       if (logoutUser.fulfilled.match(resultAction)) {
//         navigate("/")
//       } else {
//         console.error("Logout failed:", resultAction.payload)
//       }
//     } catch (error) {
//       console.error("Logout error:", error)
//     }
//     handleClose()
//   }

//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!mobileMenuOpen)
//   }

//   return (
//     <header className="header">
//       <div className="header__container">
//         <Link to="/" className="header__logo">
//           <img src={companyLogo || "/placeholder.svg"} alt="Curaconnect" />
//           <div className="header__brand">
//             <span className="cura">Cura</span>
//             <span className="connect">connect</span>
//           </div>
//         </Link>

//         <div className="header__right-section">
//           <nav className={`header__nav ${mobileMenuOpen ? "header__nav--active" : ""}`}>
//             <Link to="/" className="header__nav-link">
//               Home
//             </Link>
//             <Link to="/doctordetails" className="header__nav-link">
//               Doctor
//             </Link>
//             <Link to="/about" className="header__nav-link">
//               About
//             </Link>
//             <Link to="/contact" className="header__nav-link">
//               Contact
//             </Link>
//           </nav>

//           <div className="header__actions">
//             {!isActive && (
//               <Link to="/signup" className="header__signup">
//                 SignUp
//               </Link>
//             )}
//             {isActive ? (
//               <div className="header__user-info">
//                 <IconButton
//                   onClick={handleClick}
//                   size="small"
//                   aria-controls={open ? "account-menu" : undefined}
//                   aria-haspopup="true"
//                   aria-expanded={open ? "true" : undefined}
//                 >
//                   <Avatar sx={{ width: 40, height: 40 }} src={profile_pic} alt={username || "User"} />
//                 </IconButton>
//                 <Typography variant="subtitle1" className="header__user-name">
//                   {username || "User"}
//                 </Typography>
//                 <Menu
//                   anchorEl={anchorEl}
//                   id="account-menu"
//                   open={open}
//                   onClose={handleClose}
//                   onClick={handleClose}
//                   PaperProps={{
//                     elevation: 0,
//                     sx: {
//                       overflow: "visible",
//                       filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
//                       mt: 1.5,
//                       width: 220,
//                       "& .MuiMenuItem-root": {
//                         px: 2,
//                         py: 1,
//                         gap: 1.5,
//                       },
//                     },
//                   }}
//                   transformOrigin={{ horizontal: "right", vertical: "top" }}
//                   anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
//                 >
//                   <MenuItem onClick={() => handleMenuItemClick("/profile")}>
//                     <User size={18} />
//                     Profile
//                   </MenuItem>
//                   <MenuItem onClick={() => handleMenuItemClick("/appointment")}>
//                     <Calendar size={18} />
//                     Appointments
//                   </MenuItem>
//                   <MenuItem onClick={() => handleMenuItemClick("/historyappointment")}>
//                     <Calendar size={18} />
//                     AppointmentsHistory
//                   </MenuItem>
//                   <Divider />
//                   <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
//                     <LogOut size={18} />
//                     Logout
//                   </MenuItem>
//                 </Menu>
//               </div>
//             ) : (
//               <Link to="/login" className="header__login">
//                 LogIn
//               </Link>
//             )}
//           </div>
//         </div>

//         <button className="header__mobile-toggle" onClick={toggleMobileMenu} aria-label="Toggle menu">
//           {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
//         </button>
//       </div>

//       {/* Mobile menu overlay */}
//       <div
//         className={`header__mobile-overlay ${mobileMenuOpen ? "header__mobile-overlay--active" : ""}`}
//         onClick={() => setMobileMenuOpen(false)}
//       />
//     </header>
//   )
// }

// export default Header


"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "../../redux/userSlice"
import "./Header.scss"
import companyLogo from "../../assets/company logo.png"
import type { AppDispatch } from "../../redux/store"
import { Avatar, Menu, MenuItem, Divider, IconButton, Typography } from "@mui/material"
import { User, Calendar, LogOut, MenuIcon, X } from "lucide-react"
import io, { type Socket } from "socket.io-client"
import Swal from "sweetalert2"

// Import ToastContainer and toast from react-toastify at the top of the file
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

interface RootState {
  user: {
    isActive: boolean
    error: string | null
    profile_pic?: string
    username?: string
    _id?: string
    role?: string
  }
}

interface CallNotificationData {
  appointmentId: string
  userId: string
  doctorName: string
  doctorId: string
  roomId: string
}

// Add these interfaces after the CallNotificationData interface
interface MessageNotification {
  userId: string
  count: number
  timestamp?: number
}

const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { isActive, profile_pic, username, _id: id, role } = useSelector((state: RootState) => state.user)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const socketRef = useRef<Socket | null>(null)
  const [socketConnected, setSocketConnected] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Add this state in the Header component after the existing useState declarations
  const [messageNotifications, setMessageNotifications] = useState<Record<string, MessageNotification>>({})

  useEffect(() => {
    socketRef.current = io("http://localhost:3000", {
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    })

    socketRef.current.on("connect", () => {
      console.log("Socket connected with ID:", socketRef.current?.id)
      setSocketConnected(true)
      // Join chat with user ID
      socketRef.current?.emit("joinChat", id)
      console.log("Emitted joinChat with user ID:", id)
    })

    socketRef.current.on("connect_error", (error) => {
      console.error("Socket connection error:", error)
      setSocketConnected(false)
    })

    // Listen specifically for callNotificationemit event
    socketRef.current.on("callNotificationemit", (data: CallNotificationData) => {
      console.log("Received call notification emit:", data)

      // Check if the notification is for the current user
      console.log(id, "is the id is comming or not ")
      if (data.userId === id) {
        console.log("Call notification matches current user")
        showCallAlert(data)
      }
    })

    // Add this socket listener in the useEffect where you set up the socket connection
    // Add this after the callNotificationemit listener
    socketRef.current.on("receiveMessage", (data) => {
      console.log("Raw message received:", data)
      // Extract the sender ID from the message object
      const senderId = data.message?.sender || data.senderId
      console.log("Sender ID:", senderId)

      if (senderId && senderId !== id) {
        console.log("Processing message from doctor:", senderId)
        updateMessageNotification(senderId)
      }
    })

    socketRef.current.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason)
      setSocketConnected(false)
    })

    return () => {
      console.log("Cleaning up socket connection")
      if (socketRef.current) {
        socketRef.current.off("connect")
        socketRef.current.off("connect_error")
        socketRef.current.off("callNotificationemit")
        socketRef.current.off("receiveMessage")
        socketRef.current.off("disconnect")
        socketRef.current.disconnect()
      }
    }
  }, [isActive, id, role])

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.emit("joinChat", id)
      console.log("Re-joined chat with user ID:", id)
    }
  }, [id, socketConnected])

  // Close mobile menu when navigating
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [navigate])

  // Add these functions before the showCallAlert function
  const updateMessageNotification = (userId: string) => {
    setMessageNotifications((prev) => {
      const currentNotification = prev[userId] || { userId, count: 0 }
      return {
        ...prev,
        [userId]: {
          userId,
          count: currentNotification.count + 1,
          timestamp: Date.now(),
        },
      }
    })

    // Show toast notification
    showMessageNotification(userId)
  }

  const showMessageNotification = (senderId: string, message?: string) => {
    // Get current count from state
    const currentCount = messageNotifications[senderId]?.count || 1

    toast.info(
      <div>
        <p>
          <strong>New message from Doctor</strong>
        </p>
        <p>{message || `You have new message${currentCount > 1 ? "s" : ""}`}</p>
        <button
          onClick={() => {
            clearMessageNotification(senderId)
            navigate(`/chat/${senderId}`)
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
      },
    )
  }

  const clearMessageNotification = (userId: string) => {
    setMessageNotifications((prev) => {
      const newNotifications = { ...prev }
      delete newNotifications[userId]
      return newNotifications
    })
  }

  const showCallAlert = (data: CallNotificationData) => {
    const { appointmentId, doctorName, doctorId, roomId } = data

    Swal.fire({
      title: "Incoming Video Call",
      html: `<p>Dr. ${doctorName} is calling you for your appointment.</p>`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Join Call",
      cancelButtonText: "Decline",
      allowOutsideClick: false,
      allowEscapeKey: false,
      timer: 60000,
      timerProgressBar: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // Inform the server that call was accepted
        if (socketRef.current) {
          socketRef.current.emit("callAccepted", {
            appointmentId,
            roomId: roomId,
            userId: id,
            doctorId: doctorId,
          })
        }

        // Pass the roomId to the video call component via URL parameter for reliability
        navigate(`/video-call/${appointmentId}/${roomId}`, {
          state: {
            roomId: roomId, // Also include in state as backup
            appointmentId,
            userId: id,
            userRole: "patient",
            userName: username || "Patient",
            doctorId: doctorId,
          },
        })
      } else {
        console.log("Call declined")
        if (socketRef.current) {
          socketRef.current.emit("callDeclined", {
            appointmentId,
            userId: id,
            doctorId: doctorId,
          })
        }
      }
    })
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMenuItemClick = (path: string) => {
    navigate(path)
    handleClose()
  }

  const handleLogout = async () => {
    try {
      if (socketRef.current) {
        socketRef.current.disconnect()
        setSocketConnected(false)
      }

      const resultAction = await dispatch(logoutUser())
      if (logoutUser.fulfilled.match(resultAction)) {
        navigate("/")
      } else {
        console.error("Logout failed:", resultAction.payload)
      }
    } catch (error) {
      console.error("Logout error:", error)
    }
    handleClose()
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  // Add ToastContainer at the beginning of the return statement, right before the header element
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
      <header className="header">
        <div className="header__container">
          <Link to="/" className="header__logo">
            <img src={companyLogo || "/placeholder.svg"} alt="Curaconnect" />
            <div className="header__brand">
              <span className="cura">Cura</span>
              <span className="connect">connect</span>
            </div>
          </Link>

          <div className="header__right-section">
            <nav className={`header__nav ${mobileMenuOpen ? "header__nav--active" : ""}`}>
              <Link to="/" className="header__nav-link">
                Home
              </Link>
              <Link to="/doctordetails" className="header__nav-link">
                Doctor
              </Link>
              <Link to="/about" className="header__nav-link">
                About
              </Link>
              <Link to="/contact" className="header__nav-link">
                Contact
              </Link>
            </nav>

            <div className="header__actions">
              {!isActive && (
                <Link to="/signup" className="header__signup">
                  SignUp
                </Link>
              )}
              {isActive ? (
                <div className="header__user-info">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar sx={{ width: 40, height: 40 }} src={profile_pic} alt={username || "User"} />
                  </IconButton>
                  <Typography variant="subtitle1" className="header__user-name">
                    {username || "User"}
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
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        width: 220,
                        "& .MuiMenuItem-root": {
                          px: 2,
                          py: 1,
                          gap: 1.5,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem onClick={() => handleMenuItemClick("/profile")}>
                      <User size={18} />
                      Profile
                    </MenuItem>
                    <MenuItem onClick={() => handleMenuItemClick("/appointment")}>
                      <Calendar size={18} />
                      Appointments
                    </MenuItem>
                    <MenuItem onClick={() => handleMenuItemClick("/historyappointment")}>
                      <Calendar size={18} />
                      AppointmentsHistory
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
                      <LogOut size={18} />
                      Logout
                    </MenuItem>
                  </Menu>
                </div>
              ) : (
                <Link to="/login" className="header__login">
                  LogIn
                </Link>
              )}
            </div>
          </div>

          <button className="header__mobile-toggle" onClick={toggleMobileMenu} aria-label="Toggle menu">
            {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>

        {/* Mobile menu overlay */}
        <div
          className={`header__mobile-overlay ${mobileMenuOpen ? "header__mobile-overlay--active" : ""}`}
          onClick={() => setMobileMenuOpen(false)}
        />
      </header>
    </>
  )
}

export default Header
