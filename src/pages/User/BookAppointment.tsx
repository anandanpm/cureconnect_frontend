
import type React from "react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { fetchAppointmentDetails, requestRefund } from "../../api/userApi"
import type { RootState } from "../../redux/store"
import "./BookAppointment.scss"
import { Button, IconButton } from "@mui/material"
import { NavigateBefore, NavigateNext, Chat, VideoCall } from "@mui/icons-material"

interface AppointmentDetails {
  doctorDepartment: string
  doctorName: string
  patientName: string
  startTime: string
  endTime: string
  appointmentDate: string
  status: string
  appointmentId: string
  payment_id?: string
  amount?: number
}

const convertTo12HourFormat = (time: string) => {
  if (!time) return ""
  const [hours, minutes] = time.split(":")
  const hourNum = Number.parseInt(hours)
  const period = hourNum >= 12 ? "PM" : "AM"
  const convertedHours = hourNum % 12 || 12
  return `${convertedHours}:${minutes} ${period}`
}

const AppointmentDetails: React.FC = () => {
  const [appointmentDetails, setAppointmentDetails] = useState<AppointmentDetails[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentDetails | null>(null)
  const [processingRefund, setProcessingRefund] = useState<boolean>(false)

  const PAGE_SIZE = 1
  const MAX_VISIBLE_PAGES = 3
  const userId = useSelector((state: RootState) => state.user._id)

  useEffect(() => {
    if (userId) {
      loadAppointments()
    }
  }, [userId])

  const loadAppointments = async () => {
    try {
      const details = await fetchAppointmentDetails(userId)
      setAppointmentDetails(details)
    } catch (err) {
      setError("Failed to fetch appointment details")
    } finally {
      setLoading(false)
    }
  }

  const handleVideoCall = (appointmentId: string) => {
    console.log("Starting video call for appointment:", appointmentId)
  }

  const handleChat = (userId: string) => {
    console.log("Opening chat for appointment:", userId)
    // Implement chat functionality here
  }

  const handleCancelAppointment = (appointment: AppointmentDetails) => {
    setSelectedAppointment(appointment)
    setIsModalOpen(true)
  }

  const handleConfirmCancel = async () => {
    if (!selectedAppointment || !userId) return

    setProcessingRefund(true)
    try {
      await requestRefund(selectedAppointment.appointmentId)
      
      setAppointmentDetails(prevDetails =>
        prevDetails.map(appointment =>
          appointment.appointmentId === selectedAppointment.appointmentId
            ? { ...appointment, status: 'Cancelled' }
            : appointment
        )
      )

      await loadAppointments()
      setIsModalOpen(false)
      setSelectedAppointment(null)
    } catch (err) {
      setError("Failed to process refund. Please try again later.")
    } finally {
      setProcessingRefund(false)
    }
  }

  const totalPages = Math.ceil(appointmentDetails.length / PAGE_SIZE)
  const currentAppointments = appointmentDetails.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const renderPageNumbers = () => {
    const pageNumbers = []
    const startPage = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2))
    const endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1)

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Button key={i} onClick={() => paginate(i)} variant={currentPage === i ? "contained" : "outlined"} size="small">
          {i}
        </Button>,
      )
    }
    return pageNumbers
  }

  if (loading) return <div className="loading">Loading appointments...</div>
  if (error) return <div className="error">{error}</div>
  if (appointmentDetails.length === 0) {
    return <div className="no-appointments">No appointments found</div>
  }

  return (
    <div className="appointment-details">
      <h1>Your Appointments</h1>

      <div className="appointments-container">
        {currentAppointments.map((appointment) => (
          <div key={appointment.appointmentId} className={`appointment-card ${appointment.status.toLowerCase()}`}>
            <div className="details-container">
              <div className="doctor-info">
                <h2>Doctor Information</h2>
                <p>
                  <strong>Name:</strong> {appointment.doctorName}
                </p>
                <p>
                  <strong>Department:</strong> {appointment.doctorDepartment}
                </p>
              </div>

              <div className="appointment-info">
                <h2>Appointment Details</h2>
                <p>
                  <strong>Date:</strong> {appointment.appointmentDate}
                </p>
                <p>
                  <strong>Time:</strong> {convertTo12HourFormat(appointment.startTime)} -{" "}
                  {convertTo12HourFormat(appointment.endTime)}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`status ${appointment.status.toLowerCase()}`}>{appointment.status}</span>
                </p>
              </div>
            </div>

            <div className="action-buttons">
              {appointment.status !== "Cancelled" && (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<VideoCall />}
                    onClick={() => handleVideoCall(appointment.appointmentId)}
                    className="action-button video-call"
                  >
                    Video Call
                  </Button>
                  <Button
                    variant="contained"
                    color="info"
                    startIcon={<Chat />}
                    onClick={() => handleChat(userId)}
                    className="action-button chat"
                  >
                    Chat
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleCancelAppointment(appointment)}
                    disabled={processingRefund}
                    className="action-button cancel"
                  >
                    Cancel Appointment
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {appointmentDetails.length > PAGE_SIZE && (
        <div className="pagination">
          <IconButton onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            <NavigateBefore />
          </IconButton>
          {renderPageNumbers()}
          <IconButton onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
            <NavigateNext />
          </IconButton>
        </div>
      )}

      {isModalOpen && selectedAppointment && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Cancel Appointment</h2>
            <div className="modal-body">
              <p>Are you sure you want to cancel this appointment?</p>
              <div className="refund-details">
                <p>
                  <strong>Doctor:</strong> {selectedAppointment.doctorName}
                </p>
                <p>
                  <strong>Date:</strong> {selectedAppointment.appointmentDate}
                </p>
                <p className="note">Note: You will receive 50% of the original payment as refund.</p>
              </div>
            </div>
            <div className="modal-actions">
              <Button variant="contained" color="secondary" onClick={handleConfirmCancel} disabled={processingRefund}>
                {processingRefund ? "Processing..." : "Yes, Cancel Appointment"}
              </Button>
              <Button variant="outlined" onClick={() => setIsModalOpen(false)} disabled={processingRefund}>
                No, Keep Appointment
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AppointmentDetails