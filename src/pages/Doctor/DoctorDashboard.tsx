import React, { useState, useEffect } from 'react';
import styles from './DoctorDashboard.scss';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
} from 'recharts';

// Interfaces for data types
interface AppointmentSummary {
  total: number;
  completed: number;
  pending: number;
}

interface RevenueSummary {
  totalRevenue: number;
  monthlyRevenue: { month: string; revenue: number }[];
}

interface ReviewSummary {
  averageRating: number;
  totalReviews: number;
  recentReviews: Review[];
}

interface Review {
  id: string;
  appointmentId: string;
  rating: number;
  reviewText: string;
  createdAt: string;
}

const Dashboard: React.FC = () => {
  // State management for dashboard data
  const [appointmentData, setAppointmentData] = useState<AppointmentSummary>({
    total: 0,
    completed: 0,
    pending: 0
  });

  const [revenueData, setRevenueData] = useState<RevenueSummary>({
    totalRevenue: 0,
    monthlyRevenue: []
  });

  const [reviewData, setReviewData] = useState<ReviewSummary>({
    averageRating: 0,
    totalReviews: 0,
    recentReviews: []
  });

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Replace with your actual API endpoints
        const [appointmentsResponse, revenueResponse, reviewsResponse] = await Promise.all([
          fetch('/api/appointments/summary'),
          fetch('/api/revenue/summary'),
          fetch('/api/reviews/summary')
        ]);

        const appointmentSummary = await appointmentsResponse.json();
        const revenueSummary = await revenueResponse.json();
        const reviewSummary = await reviewsResponse.json();

        setAppointmentData(appointmentSummary);
        setRevenueData(revenueSummary);
        setReviewData(reviewSummary);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  // Render methods
  const renderAppointmentStats = () => (
    <div className={styles.statsCard}>
      <h3>Appointment Summary</h3>
      <div className={styles.statGrid}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Total Appointments</span>
          <span className={styles.statValue}>{appointmentData.total}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Completed</span>
          <span className={styles.statValue}>{appointmentData.completed}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Pending</span>
          <span className={styles.statValue}>{appointmentData.pending}</span>
        </div>
      </div>
    </div>
  );

  const renderRevenueChart = () => (
    <div className={styles.chartCard}>
      <h3>Monthly Revenue</h3>
      <BarChart width={500} height={300} data={revenueData.monthlyRevenue}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="revenue" fill="#8884d8" />
      </BarChart>
      <div className={styles.totalRevenue}>
        Total Revenue: ${revenueData.totalRevenue.toFixed(2)}
      </div>
    </div>
  );

  const renderReviewSummary = () => (
    <div className={styles.reviewCard}>
      <h3>Review Summary</h3>
      <div className={styles.reviewHeader}>
        <div className={styles.averageRating}>
          <span>Average Rating</span>
          <strong>{reviewData.averageRating.toFixed(1)}/5</strong>
        </div>
        <div className={styles.totalReviews}>
          Total Reviews: {reviewData.totalReviews}
        </div>
      </div>
      
      <div className={styles.recentReviews}>
        <h4>Recent Reviews</h4>
        {reviewData.recentReviews.map(review => (
          <div key={review.id} className={styles.reviewItem}>
            <div className={styles.reviewRating}>
              {[...Array(review.rating)].map((_, i) => (
                <span key={i} className={styles.star}>★</span>
              ))}
            </div>
            <p>{review.reviewText}</p>
            <small>{new Date(review.createdAt).toLocaleDateString()}</small>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={styles.dashboard}>
      <h1>Business Dashboard</h1>
      <div className={styles.dashboardGrid}>
        {renderAppointmentStats()}
        {renderRevenueChart()}
        {renderReviewSummary()}
      </div>
    </div>
  );
};

export default Dashboard;