
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVerifiedDoctors } from "../../redux/userSlice";
import type { AppDispatch, RootState } from "../../redux/store";
import { Search, Filter } from "lucide-react";
 import Pagination from "../../components/Pagination/Pagination";
import "./DoctorPage.scss";

const DoctorList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  const { 
    doctor: doctors,
    totalPages,
    departments=[],
    loading
  } = useSelector((state: RootState) => state.user);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  
  // Debounce search to prevent excessive API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchTerm]);
  
  // Fetch doctors whenever filters change
  useEffect(() => {
    dispatch(getVerifiedDoctors({
      page: currentPage,
      search: debouncedSearchTerm,
      department: selectedDepartment
    }));
  }, [dispatch, currentPage, debouncedSearchTerm, selectedDepartment]);
  
  const handleAppointment = (doctorId: string) => {
    navigate(`/appointment/${doctorId}`);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };
  
  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartment(e.target.value);
    setCurrentPage(1); // Reset to first page on new filter
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
        <div className="select-wrapper">
          <Filter className="filter-icon" />
          <select
            value={selectedDepartment}
            onChange={handleDepartmentChange}
            className="department-select"
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">Loading doctors...</div>
      ) : (
        <>
          <div className="doctors-grid">
            {doctors.length > 0 ? (
              doctors.map((doctor) => (
                <div key={doctor._id} className="doctor-card">
                  <img 
                    src={doctor.profile_pic || "/placeholder.svg"} 
                    alt={doctor.username} 
                    className="doctor-image" 
                  />
                  <h3 className="doctor-name">{doctor.username}</h3>
                  <p className="doctor-department">{doctor.department}</p>
                  <div className="doctor-about">
                    <h4>About</h4>
                    <p>{doctor.about}</p>
                  </div>
                  <div className="doctor-details">
                    <p>
                      <strong>Experience:</strong> {doctor.experience}
                    </p>
                    <p>
                      <strong>Education:</strong> {doctor.education}
                    </p>
                    <p>
                      <strong>Clinic:</strong> {doctor.clinic_name}
                    </p>
                    <p>
                      <strong>Gender:</strong> {doctor.gender}
                    </p>
                    <p>
                      <strong>Age:</strong> {doctor.age}
                    </p>
                  </div>
                  <button 
                    className="appointment-button" 
                    onClick={() => handleAppointment(doctor._id)}
                  >
                    Book Appointment
                  </button>
                </div>
              ))
            ) : (
              <div className="no-results">No doctors found matching your criteria</div>
            )}
          </div>

          {doctors.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default DoctorList;