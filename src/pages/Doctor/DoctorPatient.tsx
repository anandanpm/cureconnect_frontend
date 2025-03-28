
// // import type React from "react"
// // import { useEffect, useState } from "react"
// // import { useSelector, useDispatch } from "react-redux"
// // import { fetchDoctorAppointments } from "../../api/doctorApi"
// // import { fetchAppointment } from '../../redux/doctorSlice'
// // import { Button, IconButton, Paper, Typography, Dialog } from "@mui/material"
// // import { NavigateBefore, NavigateNext, Chat, VideoCall } from "@mui/icons-material"
// // import VideoCallComponent from "../../components/Video/Vediocall"
// // import "./DoctorPatient.scss"
// // import type { AppDispatch, RootState } from "../../redux/store"
// // import { useNavigate } from "react-router-dom"

// // export interface AppointmentDetail {
// //   doctorDepartment: string
// //   doctorName: string
// //   userId: string
// //   username: string
// //   startTime: string
// //   endTime: string
// //   date: string
// //   status: string
// //   appointmentId: string
// //   payment_id?: string
// //   amount?: number
// // }

// // const DoctorAppointments: React.FC = () => {
// //   const dispatch = useDispatch<AppDispatch>()
// //   const navigate = useNavigate()
// //   const doctorId = useSelector((state: RootState) => state.doctor._id)
// //   const doctorName = useSelector((state: RootState) => state.doctor.username)
// //   const [appointments, setAppointments] = useState<AppointmentDetail[]>([])
// //   const [loading, setLoading] = useState<boolean>(true)
// //   const [error, setError] = useState<string | null>(null)
// //   const [currentPage, setCurrentPage] = useState<number>(1)
// //   const [filter, setFilter] = useState<"all" | "upcoming" | "past" | "cancelled">("all")
// //   const [selectedAppointment, setSelectedAppointment] = useState<AppointmentDetail | null>(null)
// //   const [isVideoCallOpen, setIsVideoCallOpen] = useState(false)

// //   const PAGE_SIZE = 3

// //   useEffect(() => {
// //     if (doctorId) {
// //       loadDoctorAppointments()
// //     }
// //   }, [doctorId])

// //   const loadDoctorAppointments = async () => {
// //     try {
// //       setLoading(true)
// //       dispatch(fetchAppointment(doctorId))
// //       const data = await fetchDoctorAppointments(doctorId)
// //       console.log(data)
// //       setAppointments(data)

// //     } catch (err) {
// //       setError("Failed to fetch appointments")
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const convertTo12HourFormat = (time: string) => {
// //     if (!time) return ""
// //     const [hours, minutes] = time.split(":")
// //     const hourNum = Number.parseInt(hours)
// //     const period = hourNum >= 12 ? "PM" : "AM"
// //     const convertedHours = hourNum % 12 || 12
// //     return `${convertedHours}:${minutes} ${period}`
// //   }

// //   const handleVideoCall = (appointment: AppointmentDetail) => {
// //     setSelectedAppointment(appointment)
// //     setIsVideoCallOpen(true)
// //   }

// //   const handleCloseVideoCall = () => {
// //     setIsVideoCallOpen(false)
// //     setSelectedAppointment(null)
// //   }

// //   const handleChat = (appointmentId: string) => {
// //     console.log(appointmentId)
// //     navigate(`/doctor/chat/${appointmentId}`)
// //   }

// //   const filterAppointments = (appointments: AppointmentDetail[]) => {
// //     const today = new Date()
// //     today.setHours(0, 0, 0, 0)

// //     switch (filter) {
// //       case "upcoming":
// //         return appointments.filter((app) => new Date(app.date) >= today && app.status !== "cancelled")
// //       case "past":
// //         return appointments.filter((app) => new Date(app.date) < today && app.status !== "cancelled")
// //       case "cancelled":
// //         return appointments.filter((app) => app.status === "cancelled")
// //       default:
// //         return appointments
// //     }
// //   }

// //   const filteredAppointments = filterAppointments(appointments)
// //   const totalPages = Math.ceil(filteredAppointments.length / PAGE_SIZE)
// //   const currentAppointments = filteredAppointments.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

// //   const renderNoAppointmentsMessage = () => {
// //     let message = "There are no appointments to show."
// //     switch (filter) {
// //       case "upcoming":
// //         message = "You have no upcoming appointments."
// //         break
// //       case "past":
// //         message = "You have no past appointments."
// //         break
// //       case "cancelled":
// //         message = "You have no cancelled appointments."
// //         break
// //     }
// //     return (
// //       <Paper elevation={3} className="no-appointments">
// //         <Typography variant="h6" component="h2">
// //           {message}
// //         </Typography>
// //         <Typography variant="body1">Check back later or try a different filter.</Typography>
// //       </Paper>
// //     )
// //   }

// //   return (
// //     <div className="doctor-appointments">
// //       <h1>Doctor Appointments</h1>

// //       <div className="filter-buttons">
// //         <Button variant={filter === "all" ? "contained" : "outlined"} onClick={() => setFilter("all")}>
// //           All
// //         </Button>
// //         <Button variant={filter === "upcoming" ? "contained" : "outlined"} onClick={() => setFilter("upcoming")}>
// //           Upcoming
// //         </Button>
// //         <Button variant={filter === "past" ? "contained" : "outlined"} onClick={() => setFilter("past")}>
// //           Past
// //         </Button>
// //         <Button variant={filter === "cancelled" ? "contained" : "outlined"} onClick={() => setFilter("cancelled")}>
// //           Cancelled
// //         </Button>
// //       </div>

// //       {loading ? (
// //         <div className="loading">Loading appointments...</div>
// //       ) : error ? (
// //         <div className="error">{error}</div>
// //       ) : filteredAppointments.length === 0 ? (
// //         renderNoAppointmentsMessage()
// //       ) : (
// //         <div className="appointments-list">
// //           {currentAppointments.map((appointment) => (
// //             <Paper
// //               key={appointment.appointmentId}
// //               className={`appointment-item ${appointment.status.toLowerCase()}`}
// //               elevation={3}
// //             >
// //               <div className="patient-info">
// //                 <h3>Patient Information</h3>
// //                 <p>
// //                   <strong>Name:</strong> {appointment.username}
// //                 </p>
// //               </div>

// //               <div className="appointment-time">
// //                 <h3>Appointment Time</h3>
// //                 <p>
// //                   <strong>Date:</strong> {appointment.date}
// //                 </p>
// //                 <p>
// //                   <strong>Time:</strong> {convertTo12HourFormat(appointment.startTime)} -{" "}
// //                   {convertTo12HourFormat(appointment.endTime)}
// //                 </p>
// //                 <p>
// //                   <strong>Status:</strong>
// //                   <span className={`status ${appointment.status.toLowerCase()}`}>{appointment.status}</span>
// //                 </p>
// //               </div>

// //               {appointment.status !== "Cancelled" && (
// //                 <div className="action-buttons">
// //                   <Button
// //                     variant="contained"
// //                     color="primary"
// //                     startIcon={<VideoCall />}
// //                     onClick={() => handleVideoCall(appointment)}
// //                     className="action-button video-call"
// //                   >
// //                     Video Call
// //                   </Button>
// //                   <Button
// //                     variant="contained"
// //                     color="info"
// //                     startIcon={<Chat />}
// //                     onClick={() => handleChat(appointment.userId)}
// //                     className="action-button chat"
// //                   >
// //                     Chat
// //                   </Button>
// //                 </div>
// //               )}
// //             </Paper>
// //           ))}
// //         </div>
// //       )}

// //       <Dialog
// //          open={isVideoCallOpen}
// //          onClose={handleCloseVideoCall}
// //         maxWidth="lg"
// //         fullWidth
// //         PaperProps={{
// //           style: {
// //             height: '80vh',
// //             backgroundColor: '#f5f5f5'
// //           }
// //         }}
// //       >
// //         {selectedAppointment && (
// //           <VideoCallComponent
// //             appointmentId={selectedAppointment.appointmentId}
// //             userId={doctorId}
// //             userName={doctorName}
// //             userRole="doctor"
// //           />
// //         )}
// //       </Dialog>

// //       {totalPages > 1 && (
// //         <div className="pagination">
// //           <IconButton onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))} disabled={currentPage === 1}>
// //             <NavigateBefore />
// //           </IconButton>
// //           <span>
// //             {currentPage} of {totalPages}
// //           </span>
// //           <IconButton
// //             onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
// //             disabled={currentPage === totalPages}
// //           >
// //             <NavigateNext />
// //           </IconButton>
// //         </div>
// //       )}
// //     </div>
// //   )
// // }

// // export default DoctorAppointments


// import type React from "react"
// import { useEffect, useState } from "react"
// import { useSelector, useDispatch } from "react-redux"
// import { fetchDoctorAppointments } from "../../api/doctorApi"
// import { fetchAppointment } from '../../redux/doctorSlice'
// import { Button, IconButton, Paper, Typography, Dialog } from "@mui/material"
// import { NavigateBefore, NavigateNext, Chat, VideoCall } from "@mui/icons-material"
// import VideoCallComponent from "../../components/Video/Vediocall"
// import "./DoctorPatient.scss"
// import type { AppDispatch, RootState } from "../../redux/store"
// import { useNavigate } from "react-router-dom"

// export interface AppointmentDetail {
//   doctorDepartment: string
//   doctorName: string
//   userId: string
//   username: string
//   startTime: string
//   endTime: string
//   date: string
//   status: string
//   appointmentId: string
//   payment_id?: string
//   amount?: number
// }

// const DoctorAppointments: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>()
//   const navigate = useNavigate()
//   const doctorId = useSelector((state: RootState) => state.doctor._id)
//   const doctorName = useSelector((state: RootState) => state.doctor.username)
//   const [appointments, setAppointments] = useState<AppointmentDetail[]>([])
//   const [loading, setLoading] = useState<boolean>(true)
//   const [error, setError] = useState<string | null>(null)
//   const [currentPage, setCurrentPage] = useState<number>(1)
//   const [filter, setFilter] = useState<"all" | "upcoming" | "past" | "cancelled">("all")
//   const [selectedAppointment, setSelectedAppointment] = useState<AppointmentDetail | null>(null)
//   const [isVideoCallOpen, setIsVideoCallOpen] = useState(false)

//   const PAGE_SIZE = 3

//   useEffect(() => {
//     if (doctorId) {
//       loadDoctorAppointments()
//     }
//   }, [doctorId])

//   const loadDoctorAppointments = async () => {
//     try {
//       setLoading(true)
//       dispatch(fetchAppointment(doctorId))
//       const data = await fetchDoctorAppointments(doctorId)
//       console.log(data)
//       setAppointments(data)

//     } catch (err) {
//       setError("Failed to fetch appointments")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const convertTo12HourFormat = (time: string) => {
//     if (!time) return ""
//     const [hours, minutes] = time.split(":")
//     const hourNum = Number.parseInt(hours)
//     const period = hourNum >= 12 ? "PM" : "AM"
//     const convertedHours = hourNum % 12 || 12
//     return `${convertedHours}:${minutes} ${period}`
//   }

//   const parseTimeString = (timeString: string): { hours: number, minutes: number } => {
//     const [hours, minutes] = timeString.split(":").map(num => parseInt(num, 10))
//     return { hours, minutes }
//   }

//   const handleVideoCall = (appointment: AppointmentDetail) => {
//     setSelectedAppointment(appointment)
//     setIsVideoCallOpen(true)
//   }

//   const handleCloseVideoCall = () => {
//     setIsVideoCallOpen(false)
//     setSelectedAppointment(null)
//   }

//   const handleChat = (appointmentId: string) => {
//     console.log(appointmentId)
//     navigate(`/doctor/chat/${appointmentId}`)
//   }

//   // Helper function to check if appointment is in the past based on date AND time
//   const isAppointmentPast = (appointment: AppointmentDetail): boolean => {
//     const now = new Date()
//     const appointmentDate = new Date(appointment.date)
    
//     // Parse the end time (24-hour format)
//     const { hours, minutes } = parseTimeString(appointment.endTime)
    
//     // Set appointment end time
//     appointmentDate.setHours(hours, minutes, 0, 0)
    
//     // Check if the appointment end time is in the past
//     return appointmentDate < now
//   }

//   // Helper function to check if appointment is current (between start and end time)
//   const isAppointmentCurrent = (appointment: AppointmentDetail): boolean => {
//     const now = new Date()
//     const appointmentDate = new Date(appointment.date)
    
//     // Parse start and end times
//     const startTime = parseTimeString(appointment.startTime)
//     const endTime = parseTimeString(appointment.endTime)
    
//     // Create Date objects for start and end times
//     const startDateTime = new Date(appointmentDate)
//     startDateTime.setHours(startTime.hours, startTime.minutes, 0, 0)
    
//     const endDateTime = new Date(appointmentDate)
//     endDateTime.setHours(endTime.hours, endTime.minutes, 0, 0)
    
//     // Return true if now is between start and end time
//     return now >= startDateTime && now <= endDateTime
//   }

//   const getAppointmentStatus = (appointment: AppointmentDetail): string => {
//     if (appointment.status === "cancelled") return "Cancelled"
//     if (isAppointmentCurrent(appointment)) return "In Progress"
//     if (isAppointmentPast(appointment)) return "Completed"
//     return appointment.status
//   }

//   const filterAppointments = (appointments: AppointmentDetail[]) => {
//     switch (filter) {
//       case "upcoming":
//         return appointments.filter((app) => 
//           !isAppointmentPast(app) && app.status !== "cancelled"
//         )
//       case "past":
//         return appointments.filter((app) => 
//           isAppointmentPast(app) && app.status !== "cancelled"
//         )
//       case "cancelled":
//         return appointments.filter((app) => app.status === "cancelled")
//       default:
//         return appointments
//     }
//   }

//   const filteredAppointments = filterAppointments(appointments)
//   const totalPages = Math.ceil(filteredAppointments.length / PAGE_SIZE)
//   const currentAppointments = filteredAppointments.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

//   const renderNoAppointmentsMessage = () => {
//     let message = "There are no appointments to show."
//     switch (filter) {
//       case "upcoming":
//         message = "You have no upcoming appointments."
//         break
//       case "past":
//         message = "You have no past appointments."
//         break
//       case "cancelled":
//         message = "You have no cancelled appointments."
//         break
//     }
//     return (
//       <Paper elevation={3} className="no-appointments">
//         <Typography variant="h6" component="h2">
//           {message}
//         </Typography>
//         <Typography variant="body1">Check back later or try a different filter.</Typography>
//       </Paper>
//     )
//   }

//   return (
//     <div className="doctor-appointments">
//       <h1>Doctor Appointments</h1>

//       <div className="filter-buttons">
//         <Button variant={filter === "all" ? "contained" : "outlined"} onClick={() => setFilter("all")}>
//           All
//         </Button>
//         <Button variant={filter === "upcoming" ? "contained" : "outlined"} onClick={() => setFilter("upcoming")}>
//           Upcoming
//         </Button>
//         <Button variant={filter === "past" ? "contained" : "outlined"} onClick={() => setFilter("past")}>
//           Past
//         </Button>
//         <Button variant={filter === "cancelled" ? "contained" : "outlined"} onClick={() => setFilter("cancelled")}>
//           Cancelled
//         </Button>
//       </div>

//       {loading ? (
//         <div className="loading">Loading appointments...</div>
//       ) : error ? (
//         <div className="error">{error}</div>
//       ) : filteredAppointments.length === 0 ? (
//         renderNoAppointmentsMessage()
//       ) : (
//         <div className="appointments-list">
//           {currentAppointments.map((appointment) => {
//             const isPast = isAppointmentPast(appointment);
//             const displayStatus = getAppointmentStatus(appointment);
//             const isCurrent = isAppointmentCurrent(appointment);
            
//             return (
//               <Paper
//                 key={appointment.appointmentId}
//                 className={`appointment-item ${appointment.status.toLowerCase()}`}
//                 elevation={3}
//               >
//                 <div className="patient-info">
//                   <h3>Patient Information</h3>
//                   <p>
//                     <strong>Name:</strong> {appointment.username}
//                   </p>
//                 </div>

//                 <div className="appointment-time">
//                   <h3>Appointment Time</h3>
//                   <p>
//                     <strong>Date:</strong> {appointment.date}
//                   </p>
//                   <p>
//                     <strong>Time:</strong> {convertTo12HourFormat(appointment.startTime)} -{" "}
//                     {convertTo12HourFormat(appointment.endTime)}
//                   </p>
//                   <p>
//                     <strong>Status:</strong>
//                     <span className={`status ${displayStatus.toLowerCase().replace(/\s+/g, '-')}`}>
//                       {displayStatus}
//                     </span>
//                   </p>
//                 </div>

//                 {appointment.status !== "cancelled" && !isPast && (
//                   <div className="action-buttons">
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       startIcon={<VideoCall />}
//                       onClick={() => handleVideoCall(appointment)}
//                       className="action-button video-call"
//                     >
//                       {isCurrent ? "Join Video Call" : "Video Call"}
//                     </Button>
//                     <Button
//                       variant="contained"
//                       color="info"
//                       startIcon={<Chat />}
//                       onClick={() => handleChat(appointment.userId)}
//                       className="action-button chat"
//                     >
//                       Chat
//                     </Button>
//                   </div>
//                 )}
//               </Paper>
//             );
//           })}
//         </div>
//       )}
// <Dialog
//          open={isVideoCallOpen}
//          onClose={handleCloseVideoCall}
//         maxWidth="lg"
//         fullWidth
//         PaperProps={{
//           style: {
//             height: '80vh',
//             backgroundColor: '#f5f5f5'
//           }
//         }}
//       >
//         {selectedAppointment && (
//           <VideoCallComponent
//             appointmentId={selectedAppointment.appointmentId}
//             userId={selectedAppointment.userId}
//             userName={doctorName}
//             doctorId = {doctorId}
//             userRole="doctor"
//           />
//         )}
//       </Dialog>


//       {totalPages > 1 && (
//         <div className="pagination">
//           <IconButton onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))} disabled={currentPage === 1}>
//             <NavigateBefore />
//           </IconButton>
//           <span>
//             {currentPage} of {totalPages}
//           </span>
//           <IconButton
//             onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
//             disabled={currentPage === totalPages}
//           >
//             <NavigateNext />
//           </IconButton>
//         </div>
//       )}
//     </div>
//   )
// }

// export default DoctorAppointments





// import type React from "react"
// import { useEffect, useState } from "react"
// import { useSelector, useDispatch } from "react-redux"
// import { fetchDoctorAppointments } from "../../api/doctorApi"
// import { fetchAppointment } from '../../redux/doctorSlice'
// import { Button, IconButton, Paper, Typography } from "@mui/material"
// import { NavigateBefore, NavigateNext, Chat, VideoCall } from "@mui/icons-material"
// import "./DoctorPatient.scss"
// import type { AppDispatch, RootState } from "../../redux/store"
// import { useNavigate } from "react-router-dom"

// export interface AppointmentDetail {
//   doctorDepartment: string
//   doctorName: string
//   userId: string
//   username: string
//   startTime: string
//   endTime: string
//   date: string
//   status: string
//   appointmentId: string
//   payment_id?: string
//   amount?: number
// }

// const DoctorAppointments: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>()
//   const navigate = useNavigate()
//   const doctorId = useSelector((state: RootState) => state.doctor._id)
//   const doctorName = useSelector((state: RootState) => state.doctor.username)
//   const [appointments, setAppointments] = useState<AppointmentDetail[]>([])
//   const [loading, setLoading] = useState<boolean>(true)
//   const [error, setError] = useState<string | null>(null)
//   const [currentPage, setCurrentPage] = useState<number>(1)
//   const [filter, setFilter] = useState<"all" | "upcoming" | "past" | "cancelled">("all")

//   const PAGE_SIZE = 3

//   useEffect(() => {
//     if (doctorId) {
//       loadDoctorAppointments()
//     }
//   }, [doctorId])

//   const loadDoctorAppointments = async () => {
//     try {
//       setLoading(true)
//       dispatch(fetchAppointment(doctorId))
//       const data = await fetchDoctorAppointments(doctorId)
//       console.log(data)
//       setAppointments(data)

//     } catch (err) {
//       setError("Failed to fetch appointments")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const convertTo12HourFormat = (time: string) => {
//     if (!time) return ""
//     const [hours, minutes] = time.split(":")
//     const hourNum = Number.parseInt(hours)
//     const period = hourNum >= 12 ? "PM" : "AM"
//     const convertedHours = hourNum % 12 || 12
//     return `${convertedHours}:${minutes} ${period}`
//   }

//   const parseTimeString = (timeString: string): { hours: number, minutes: number } => {
//     const [hours, minutes] = timeString.split(":").map(num => parseInt(num, 10))
//     return { hours, minutes }
//   }

//   const handleVideoCall = (appointment: AppointmentDetail) => {
//     // Navigate to video call page with appointment details
//     navigate(`/doctor/video-call/${appointment.appointmentId}`, {
//       state: {
//         userId: appointment.userId,
//         appointmentId: appointment.appointmentId,
//         doctorName: doctorName,
//         doctorId: doctorId
//       }
//     })
//   }

//   const handleChat = (appointmentId: string) => {
//     console.log(appointmentId)
//     navigate(`/doctor/chat/${appointmentId}`)
//   }

//   // Helper function to check if appointment is in the past based on date AND time
//   const isAppointmentPast = (appointment: AppointmentDetail): boolean => {
//     const now = new Date()
//     const appointmentDate = new Date(appointment.date)
    
//     // Parse the end time (24-hour format)
//     const { hours, minutes } = parseTimeString(appointment.endTime)
    
//     // Set appointment end time
//     appointmentDate.setHours(hours, minutes, 0, 0)
    
//     // Check if the appointment end time is in the past
//     return appointmentDate < now
//   }

//   // Helper function to check if appointment is current (between start and end time)
//   const isAppointmentCurrent = (appointment: AppointmentDetail): boolean => {
//     const now = new Date()
//     const appointmentDate = new Date(appointment.date)
    
//     // Parse start and end times
//     const startTime = parseTimeString(appointment.startTime)
//     const endTime = parseTimeString(appointment.endTime)
    
//     // Create Date objects for start and end times
//     const startDateTime = new Date(appointmentDate)
//     startDateTime.setHours(startTime.hours, startTime.minutes, 0, 0)
    
//     const endDateTime = new Date(appointmentDate)
//     endDateTime.setHours(endTime.hours, endTime.minutes, 0, 0)
    
//     // Return true if now is between start and end time
//     return now >= startDateTime && now <= endDateTime
//   }

//   const getAppointmentStatus = (appointment: AppointmentDetail): string => {
//     if (appointment.status === "cancelled") return "Cancelled"
//     if (isAppointmentCurrent(appointment)) return "In Progress"
//     if (isAppointmentPast(appointment)) return "Completed"
//     return appointment.status
//   }

//   const filterAppointments = (appointments: AppointmentDetail[]) => {
//     switch (filter) {
//       case "upcoming":
//         return appointments.filter((app) => 
//           !isAppointmentPast(app) && app.status !== "cancelled"
//         )
//       case "past":
//         return appointments.filter((app) => 
//           isAppointmentPast(app) && app.status !== "cancelled"
//         )
//       case "cancelled":
//         return appointments.filter((app) => app.status === "cancelled")
//       default:
//         return appointments
//     }
//   }

//   const filteredAppointments = filterAppointments(appointments)
//   const totalPages = Math.ceil(filteredAppointments.length / PAGE_SIZE)
//   const currentAppointments = filteredAppointments.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

//   const renderNoAppointmentsMessage = () => {
//     let message = "There are no appointments to show."
//     switch (filter) {
//       case "upcoming":
//         message = "You have no upcoming appointments."
//         break
//       case "past":
//         message = "You have no past appointments."
//         break
//       case "cancelled":
//         message = "You have no cancelled appointments."
//         break
//     }
//     return (
//       <Paper elevation={3} className="no-appointments">
//         <Typography variant="h6" component="h2">
//           {message}
//         </Typography>
//         <Typography variant="body1">Check back later or try a different filter.</Typography>
//       </Paper>
//     )
//   }

//   return (
//     <div className="doctor-appointments">
//       <h1>Doctor Appointments</h1>

//       <div className="filter-buttons">
//         <Button variant={filter === "all" ? "contained" : "outlined"} onClick={() => setFilter("all")}>
//           All
//         </Button>
//         <Button variant={filter === "upcoming" ? "contained" : "outlined"} onClick={() => setFilter("upcoming")}>
//           Upcoming
//         </Button>
//         <Button variant={filter === "past" ? "contained" : "outlined"} onClick={() => setFilter("past")}>
//           Past
//         </Button>
//         <Button variant={filter === "cancelled" ? "contained" : "outlined"} onClick={() => setFilter("cancelled")}>
//           Cancelled
//         </Button>
//       </div>

//       {loading ? (
//         <div className="loading">Loading appointments...</div>
//       ) : error ? (
//         <div className="error">{error}</div>
//       ) : filteredAppointments.length === 0 ? (
//         renderNoAppointmentsMessage()
//       ) : (
//         <div className="appointments-list">
//           {currentAppointments.map((appointment) => {
//             const isPast = isAppointmentPast(appointment);
//             const displayStatus = getAppointmentStatus(appointment);
//             const isCurrent = isAppointmentCurrent(appointment);
            
//             return (
//               <Paper
//                 key={appointment.appointmentId}
//                 className={`appointment-item ${appointment.status.toLowerCase()}`}
//                 elevation={3}
//               >
//                 <div className="patient-info">
//                   <h3>Patient Information</h3>
//                   <p>
//                     <strong>Name:</strong> {appointment.username}
//                   </p>
//                 </div>

//                 <div className="appointment-time">
//                   <h3>Appointment Time</h3>
//                   <p>
//                     <strong>Date:</strong> {appointment.date}
//                   </p>
//                   <p>
//                     <strong>Time:</strong> {convertTo12HourFormat(appointment.startTime)} -{" "}
//                     {convertTo12HourFormat(appointment.endTime)}
//                   </p>
//                   <p>
//                     <strong>Status:</strong>
//                     <span className={`status ${displayStatus.toLowerCase().replace(/\s+/g, '-')}`}>
//                       {displayStatus}
//                     </span>
//                   </p>
//                 </div>

//                 {appointment.status !== "cancelled" && !isPast && (
//                   <div className="action-buttons">
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       startIcon={<VideoCall />}
//                       onClick={() => handleVideoCall(appointment)}
//                       className="action-button video-call"
//                     >
//                       {isCurrent ? "Join Video Call" : "Video Call"}
//                     </Button>
//                     <Button
//                       variant="contained"
//                       color="info"
//                       startIcon={<Chat />}
//                       onClick={() => handleChat(appointment.userId)}
//                       className="action-button chat"
//                     >
//                       Chat
//                     </Button>
//                   </div>
//                 )}
//               </Paper>
//             );
//           })}
//         </div>
//       )}

//       {totalPages > 1 && (
//         <div className="pagination">
//           <IconButton onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))} disabled={currentPage === 1}>
//             <NavigateBefore />
//           </IconButton>
//           <span>
//             {currentPage} of {totalPages}
//           </span>
//           <IconButton
//             onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
//             disabled={currentPage === totalPages}
//           >
//             <NavigateNext />
//           </IconButton>
//         </div>
//       )}
//     </div>
//   )
// }

// export default DoctorAppointments


import type React from "react"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchDoctorAppointments } from "../../api/doctorApi"
import { fetchAppointment } from '../../redux/doctorSlice'
import { Button, IconButton, Paper, Typography } from "@mui/material"
import { NavigateBefore, NavigateNext, Chat, VideoCall } from "@mui/icons-material"
import "./DoctorPatient.scss"
import type { AppDispatch, RootState } from "../../redux/store"
import { useNavigate } from "react-router-dom"

export interface AppointmentDetail {
  doctorDepartment: string
  doctorName: string
  userId: string
  username: string
  startTime: string
  endTime: string
  date: string
  status: string
  appointmentId: string
  payment_id?: string
  amount?: number
}

const DoctorAppointments: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const doctorId = useSelector((state: RootState) => state.doctor._id)
  const doctorName = useSelector((state: RootState) => state.doctor.username)
  const [appointments, setAppointments] = useState<AppointmentDetail[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filter, setFilter] = useState<"all" | "upcoming" | "past" | "cancelled">("all")

  const PAGE_SIZE = 3

  useEffect(() => {
    if (doctorId) {
      loadDoctorAppointments()
    }
  }, [doctorId])

  const loadDoctorAppointments = async () => {
    try {
      setLoading(true)
      dispatch(fetchAppointment(doctorId))
      const data = await fetchDoctorAppointments(doctorId)
      console.log(data)
      setAppointments(data)

    } catch (err) {
      setError("Failed to fetch appointments")
    } finally {
      setLoading(false)
    }
  }

  const convertTo12HourFormat = (time: string) => {
    if (!time) return ""
    const [hours, minutes] = time.split(":")
    const hourNum = Number.parseInt(hours)
    const period = hourNum >= 12 ? "PM" : "AM"
    const convertedHours = hourNum % 12 || 12
    return `${convertedHours}:${minutes} ${period}`
  }

  const parseTimeString = (timeString: string): { hours: number, minutes: number } => {
    const [hours, minutes] = timeString.split(":").map(num => parseInt(num, 10))
    return { hours, minutes }
  }

  const handleVideoCall = (appointment: AppointmentDetail) => {
    // Navigate to video call page with appointment details
    navigate(`/doctor/video-call/${appointment.appointmentId}`, {
      state: {
        userId: appointment.userId,
        appointmentId: appointment.appointmentId,
        doctorName: doctorName,
        doctorId: doctorId
      }
    })
  }

  const handleChat = (appointmentId: string) => {
    console.log(appointmentId)
    navigate(`/doctor/chat/${appointmentId}`)
  }

  // Helper function to check if appointment is in the past based on date AND time
  const isAppointmentPast = (appointment: AppointmentDetail): boolean => {
    const now = new Date()
    const appointmentDate = new Date(appointment.date)
    
    // Parse the end time (24-hour format)
    const { hours, minutes } = parseTimeString(appointment.endTime)
    
    // Set appointment end time
    appointmentDate.setHours(hours, minutes, 0, 0)
    
    // Check if the appointment end time is in the past
    return appointmentDate < now
  }

  // Helper function to check if appointment is current (between start and end time)
  const isAppointmentCurrent = (appointment: AppointmentDetail): boolean => {
    const now = new Date()
    const appointmentDate = new Date(appointment.date)
    
    // Parse start and end times
    const startTime = parseTimeString(appointment.startTime)
    const endTime = parseTimeString(appointment.endTime)
    
    // Create Date objects for start and end times
    const startDateTime = new Date(appointmentDate)
    startDateTime.setHours(startTime.hours, startTime.minutes, 0, 0)
    
    const endDateTime = new Date(appointmentDate)
    endDateTime.setHours(endTime.hours, endTime.minutes, 0, 0)
    
    // Return true if now is between start and end time
    return now >= startDateTime && now <= endDateTime
  }

  const getAppointmentStatus = (appointment: AppointmentDetail): string => {
    if (appointment.status === "cancelled") return "Cancelled"
    if (isAppointmentCurrent(appointment)) return "In Progress"
    if (isAppointmentPast(appointment)) return "Completed"
    return appointment.status
  }

  const filterAppointments = (appointments: AppointmentDetail[]) => {
    switch (filter) {
      case "upcoming":
        return appointments.filter((app) => 
          !isAppointmentPast(app) && app.status !== "cancelled"
        )
      case "past":
        return appointments.filter((app) => 
          isAppointmentPast(app) && app.status !== "cancelled"
        )
      case "cancelled":
        return appointments.filter((app) => app.status === "cancelled")
      default:
        return appointments
    }
  }

  const filteredAppointments = filterAppointments(appointments)
  const totalPages = Math.ceil(filteredAppointments.length / PAGE_SIZE)
  const currentAppointments = filteredAppointments.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const renderNoAppointmentsMessage = () => {
    let message = "There are no appointments to show."
    switch (filter) {
      case "upcoming":
        message = "You have no upcoming appointments."
        break
      case "past":
        message = "You have no past appointments."
        break
      case "cancelled":
        message = "You have no cancelled appointments."
        break
    }
    return (
      <Paper elevation={3} className="no-appointments">
        <Typography variant="h6" component="h2">
          {message}
        </Typography>
        <Typography variant="body1">Check back later or try a different filter.</Typography>
      </Paper>
    )
  }

  return (
    <div className="doctor-appointments">
      <h1>Doctor Appointments</h1>

      <div className="filter-buttons">
        <Button variant={filter === "all" ? "contained" : "outlined"} onClick={() => setFilter("all")}>
          All
        </Button>
        <Button variant={filter === "upcoming" ? "contained" : "outlined"} onClick={() => setFilter("upcoming")}>
          Upcoming
        </Button>
        <Button variant={filter === "past" ? "contained" : "outlined"} onClick={() => setFilter("past")}>
          Past
        </Button>
        <Button variant={filter === "cancelled" ? "contained" : "outlined"} onClick={() => setFilter("cancelled")}>
          Cancelled
        </Button>
      </div>

      {loading ? (
        <div className="loading">Loading appointments...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : filteredAppointments.length === 0 ? (
        renderNoAppointmentsMessage()
      ) : (
        <div className="appointments-list">
          {currentAppointments.map((appointment) => {
            const isPast = isAppointmentPast(appointment);
            const displayStatus = getAppointmentStatus(appointment);
            const isCurrent = isAppointmentCurrent(appointment);
            
            return (
              <Paper
                key={appointment.appointmentId}
                className={`appointment-item ${appointment.status.toLowerCase()}`}
                elevation={3}
              >
                <div className="patient-info">
                  <h3>Patient Information</h3>
                  <p>
                    <strong>Name:</strong> {appointment.username}
                  </p>
                </div>

                <div className="appointment-time">
                  <h3>Appointment Time</h3>
                  <p>
                    <strong>Date:</strong> {appointment.date}
                  </p>
                  <p>
                    <strong>Time:</strong> {convertTo12HourFormat(appointment.startTime)} -{" "}
                    {convertTo12HourFormat(appointment.endTime)}
                  </p>
                  <p>
                    <strong>Status:</strong>
                    <span className={`status ${displayStatus.toLowerCase().replace(/\s+/g, '-')}`}>
                      {displayStatus}
                    </span>
                  </p>
                </div>

                {/* Updated condition to hide video call button when status is Completed */}
                {appointment.status !== "cancelled" && !isPast && displayStatus !== "completed" && (
                  <div className="action-buttons">
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<VideoCall />}
                      onClick={() => handleVideoCall(appointment)}
                      className="action-button video-call"
                    >
                      {isCurrent ? "Join Video Call" : "Video Call"}
                    </Button>
                    <Button
                      variant="contained"
                      color="info"
                      startIcon={<Chat />}
                      onClick={() => handleChat(appointment.userId)}
                      className="action-button chat"
                    >
                      Chat
                    </Button>
                  </div>
                )}
              </Paper>
            );
          })}
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <IconButton onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))} disabled={currentPage === 1}>
            <NavigateBefore />
          </IconButton>
          <span>
            {currentPage} of {totalPages}
          </span>
          <IconButton
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            <NavigateNext />
          </IconButton>
        </div>
      )}
    </div>
  )
}

export default DoctorAppointments