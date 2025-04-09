import React from 'react';
import { User, Calendar, DollarSign, Star, MessageSquare } from 'lucide-react';
import './DoctorDashboard.scss';

interface Review {
  patientName: string;
  rating: number;
  comment: string;
  date: string;
}

interface DoctorDashboardProps {
  doctorName: string;
  revenue: {
    total: number;
    thisMonth: number;
    lastMonth: number;
  };
  appointments: {
    completed: number;
    pending: number;
    cancelled: number;
  };
  reviews: Review[];
}

const DoctorDashboard: React.FC<DoctorDashboardProps> = ({
  doctorName,
  revenue,
  appointments,
  reviews,
}) => {
  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          className={i < rating ? "star filled" : "star empty"}
        />
      );
    }
    return stars;
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        {/* Header */}
        <header className="card">
          <div className="doctor-profile">
            <div className="profile-info">
              <div className="avatar">
                <User size={24} />
              </div>
              <div className="doctor-details">
                <h1>{doctorName}</h1>
                <p>Dashboard Overview</p>
              </div>
            </div>
            <div className="last-updated">
              <p>Last updated</p>
              <p>{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </header>

        {/* Revenue and Appointments Stats */}
        <div className="grid-container">
          {/* Revenue Card */}
          <div className="card">
            <div className="card-header">
              <DollarSign size={20} className="icon revenue-icon" />
              <h2>Revenue</h2>
            </div>
            <div className="stats-grid">
              <div className="stat-card">
                <p>Total</p>
                <p>${revenue.total.toLocaleString()}</p>
              </div>
              <div className="stat-card">
                <p>This Month</p>
                <p>${revenue.thisMonth.toLocaleString()}</p>
              </div>
              <div className="stat-card">
                <p>Last Month</p>
                <p>${revenue.lastMonth.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Appointments Card */}
          <div className="card">
            <div className="card-header">
              <Calendar size={20} className="icon appointment-icon" />
              <h2>Appointments</h2>
            </div>
            <div className="stats-grid">
              <div className="stat-card status-completed">
                <p>Completed</p>
                <p>{appointments.completed}</p>
              </div>
              <div className="stat-card status-pending">
                <p>Pending</p>
                <p>{appointments.pending}</p>
              </div>
              <div className="stat-card status-cancelled">
                <p>Cancelled</p>
                <p>{appointments.cancelled}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Patient Reviews */}
        <div className="card">
          <div className="card-header">
            <MessageSquare size={20} className="icon review-icon" />
            <h2>Patient Reviews</h2>
          </div>
          
          {reviews.length > 0 ? (
            <div className="reviews-container">
              {reviews.map((review, index) => (
                <div key={index} className="review">
                  <div className="review-header">
                    <div className="patient-info">
                      <p className="patient-name">{review.patientName}</p>
                      <div className="stars">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <span className="review-date">{review.date}</span>
                  </div>
                  <p className="review-content">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-reviews">
              <p>No reviews available yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;