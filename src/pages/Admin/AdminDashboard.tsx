import React from 'react';
import './AdminDashboard.scss';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <h1 className="dashboard__title">Dashboard</h1>
      <div className="dashboard__content">
        <p>
          Welcome to your admin dashboard. Here you can manage your patients, view reports, and handle complaints.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;

