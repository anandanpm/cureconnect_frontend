
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVerifiedDoctors } from '../../redux/userSlice'; 
import { AppDispatch, RootState } from '../../redux/store';
import { Search, Filter } from 'lucide-react';
import './DoctorPage.scss';

const DoctorList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const doctors = useSelector((state: RootState) => state.user.doctor);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

  useEffect(() => {
    dispatch(getVerifiedDoctors());
  }, [dispatch]);

  const departments = [...new Set(doctors.map(doctor => doctor.department))];

  const filteredDoctors = doctors.filter(doctor => 
    (doctor.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
     doctor.department.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedDepartment === '' || doctor.department === selectedDepartment)
  );

  const handleAppointment = (doctorId: string) => {
    console.log(`Appointment requested for doctor ${doctorId}`);
  };

  return (
    <div className="doctor-list-container">
      <div className="search-filter-container">
        <div className="search-wrapper">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search doctors or departments"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="select-wrapper">
          <Filter className="filter-icon" />
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="department-select"
          >
            <option value="">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="doctors-grid">
        {filteredDoctors.map(doctor => (
          <div key={doctor._id} className="doctor-card">
            <img src={doctor.profile_pic || '/placeholder.svg'} alt={doctor.username} className="doctor-image" />
            <h3 className="doctor-name">{doctor.username}</h3>
            <p className="doctor-department">{doctor.department}</p>
            <div className="doctor-about">
              <h4>About</h4>
              <p>{doctor.about}</p>
            </div>
            <div className="doctor-details">
              <p><strong>Experience:</strong> {doctor.experience}</p>
              <p><strong>Education:</strong> {doctor.education}</p>
              <p><strong>Clinic:</strong> {doctor.clinic_name}</p>
              <p><strong>Gender:</strong> {doctor.gender}</p>
              <p><strong>Age:</strong> {doctor.age}</p>
            </div>
            <button 
              className="appointment-button"
              onClick={() => handleAppointment(doctor._id)}
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;

