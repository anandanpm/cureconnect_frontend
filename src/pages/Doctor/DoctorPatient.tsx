import React, { useEffect, useState } from 'react';
import { useSelector} from 'react-redux';
import { fetchDoctorAppointments } from '../../api/doctorApi';
import { Button, IconButton } from "@mui/material";
import { NavigateBefore, NavigateNext, Chat, VideoCall } from "@mui/icons-material";
import "./DoctorPatient.scss";
import { RootState } from '../../redux/store';

 export interface AppointmentDetail {
  doctorDepartment: string;
  doctorName: string;
  username: string;
  startTime: string;
  endTime: string;
  date: string;
  status: string;
  appointmentId: string;
  payment_id?: string;
  amount?: number;
}

const DoctorAppointments: React.FC = () => {
  const doctorId  = useSelector((state: RootState) => state.doctor._id)
  const [appointments, setAppointments] = useState<AppointmentDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past' | 'cancelled'>('all');

  const PAGE_SIZE = 3;

  useEffect(() => {
    if (doctorId) {
      loadDoctorAppointments();
    }
  }, [doctorId]);

  const loadDoctorAppointments = async () => {
    try {
      setLoading(true);
      const data = await fetchDoctorAppointments(doctorId);
      setAppointments(data);
    } catch (err) {
      setError('Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  };

  const convertTo12HourFormat = (time: string) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    const hourNum = parseInt(hours);
    const period = hourNum >= 12 ? "PM" : "AM";
    const convertedHours = hourNum % 12 || 12;
    return `${convertedHours}:${minutes} ${period}`;
  };

  const handleVideoCall = (appointmentId: string) => {
    console.log("Starting video call for appointment:", appointmentId);
    // Implement video call logic
  };

  const handleChat = (appointmentId: string) => {
    console.log("Opening chat for appointment:", appointmentId);
    // Implement chat logic
  };

  const filterAppointments = (appointments: AppointmentDetail[]) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    switch (filter) {
      case 'upcoming':
        return appointments.filter(app => new Date(app.date) >= today && app.status !== 'cancelled');
      case 'past':
        return appointments.filter(app => new Date(app.date) < today && app.status !== 'cancelled');
      case 'cancelled':
        return appointments.filter(app => app.status === 'cancelled');
      default:
        return appointments;
    }
  };

  const filteredAppointments = filterAppointments(appointments);
  const totalPages = Math.ceil(filteredAppointments.length / PAGE_SIZE);
  const currentAppointments = filteredAppointments.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  if (loading) return <div className="loading">Loading appointments...</div>;
  if (error) return <div className="error">{error}</div>;
  if (appointments.length === 0) {
    return <div className="no-appointments">No appointments found</div>;
  }

  return (
    <div className="doctor-appointments">
      <h1>Doctor's Appointments</h1>

      <div className="filter-buttons">
        <Button 
          variant={filter === 'all' ? 'contained' : 'outlined'}
          onClick={() => setFilter('all')}
        >
          All
        </Button>
        <Button 
          variant={filter === 'upcoming' ? 'contained' : 'outlined'}
          onClick={() => setFilter('upcoming')}
        >
          Upcoming
        </Button>
        <Button 
          variant={filter === 'past' ? 'contained' : 'outlined'}
          onClick={() => setFilter('past')}
        >
          Past
        </Button>
        <Button 
          variant={filter === 'cancelled' ? 'contained' : 'outlined'}
          onClick={() => setFilter('cancelled')}
        >
          Cancelled
        </Button>
      </div>

      <div className="appointments-list">
        {currentAppointments.map((appointment) => (
          <div 
            key={appointment.appointmentId} 
            className={`appointment-item ${appointment.status.toLowerCase()}`}
          >
            <div className="patient-info">
              <h3>Patient Information</h3>
              <p><strong>Name:</strong> {appointment.username}</p>
            </div>

            <div className="appointment-time">
              <h3>Appointment Time</h3>
              <p><strong>Date:</strong> {appointment.date}</p>
              <p>
                <strong>Time:</strong> {convertTo12HourFormat(appointment.startTime)} - {" "}
                {convertTo12HourFormat(appointment.endTime)}
              </p>
              <p>
                <strong>Status:</strong> 
                <span className={`status ${appointment.status.toLowerCase()}`}>
                  {appointment.status}
                </span>
              </p>
            </div>

            {appointment.status !== 'Cancelled' && (
              <div className="action-buttons">
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
                  onClick={() => handleChat(appointment.appointmentId)}
                  className="action-button chat"
                >
                  Chat
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <IconButton 
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            <NavigateBefore />
          </IconButton>
          <span>{currentPage} of {totalPages}</span>
          <IconButton 
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            <NavigateNext />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default DoctorAppointments;