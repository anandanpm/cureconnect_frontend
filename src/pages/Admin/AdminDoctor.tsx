

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { toggleDoctorStatus, verifyDoctor, fetchDoctors } from '../../redux/adminSlice';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import './AdminDoctor.scss';

interface Doctor {
  _id: string;
  profile_pic: string;
  username: string;
  email: string;
  phone: string;
  address: string;
  medical_license: string;
  certification: string;
  department: string;
  experience: string;
  education: string;
  about: string;
  is_active: boolean;
  verified: boolean;
}

const DoctorList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const { loading, error } = useSelector((state: RootState) => state.admin);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [expandedAbout, setExpandedAbout] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await dispatch(fetchDoctors());
      setDoctors(data.payload);
    };
    fetchData();
  }, [dispatch]);

  const handleToggleStatus = (doctorId: string) => {
    dispatch(toggleDoctorStatus(doctorId));
    setDoctors((prevDoctors) =>
      prevDoctors.map((doctor) =>
        doctor._id === doctorId ? { ...doctor, is_active: !doctor.is_active } : doctor
      )
    );
  };

  const handleVerifyDoctor = (doctorId: string) => {
    dispatch(verifyDoctor(doctorId));
    setDoctors((prevDoctors) =>
      prevDoctors.map((doctor) =>
        doctor._id === doctorId ? { ...doctor, verified: !doctor.verified } : doctor
      )
    );
  };

  const toggleAbout = (doctorId: string) => {
    setExpandedAbout(expandedAbout === doctorId ? null : doctorId);
  };

  if (loading) {
    return <div className="doctor-list__loading">Loading...</div>;
  }

  if (error) {
    return <div className="doctor-list__error">{error}</div>;
  }

  return (
    <div className="doctor-list">
      <h2 className="doctor-list__title">DOCTOR LIST</h2>
      <div className="doctor-list__container">
        {doctors.map((doctor: Doctor) => (
          <div key={doctor._id} className="doctor-card">
            <div className="doctor-card__left">
              <div className="doctor-card__profile-pic-container">
                <img
                  src={doctor.profile_pic || '/placeholder.svg?height=150&width=150'}
                  alt={`${doctor.username}'s profile`}
                  className="doctor-card__profile-pic"
                />
              </div>
              <h3 className="doctor-card__name">{doctor.username}</h3>
              <div className="doctor-card__actions">
                <button
                  className={`doctor-card__toggle-btn ${doctor.is_active ? 'active' : 'blocked'}`}
                  onClick={() => handleToggleStatus(doctor._id)}
                >
                  {doctor.is_active ? 'Block' : 'Unblock'}
                </button>
                <button
                  className={`doctor-card__verify-btn ${doctor.verified ? 'verified' : 'not-verified'}`}
                  onClick={() => handleVerifyDoctor(doctor._id)}
                >
                  {doctor.verified ? 'Verified' : 'Not Verified'}
                </button>
              </div>
            </div>
            <div className="doctor-card__right">
              <div className="doctor-card__details">
                <p><strong>Email:</strong> {doctor.email}</p>
                <p><strong>Phone:</strong> {doctor.phone}</p>
                <p><strong>Address:</strong> {doctor.address}</p>
                <p><strong>Medical License:</strong> {doctor.medical_license}</p>
                <p><strong>Department:</strong> {doctor.department}</p>
                <p><strong>Experience:</strong> {doctor.experience}</p>
                <p><strong>Education:</strong> {doctor.education}</p>
                <div className="doctor-card__about">
                  <strong>About:</strong>
                  <p className={expandedAbout === doctor._id ? 'expanded' : ''}>
                    {doctor.about}
                  </p>
                  <button className="doctor-card__about-toggle" onClick={() => toggleAbout(doctor._id)}>
                    {expandedAbout === doctor._id ? <ChevronUp /> : <ChevronDown />}
                  </button>
                </div>
                <p>
                  <strong>Certification:</strong>
                  {doctor.certification ? (
                    <button className="doctor-card__view-cert" onClick={() => setSelectedImage(doctor.certification)}>
                      View Certificate
                    </button>
                  ) : (
                    <span className="doctor-card__no-cert">No certification</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedImage && (
        <div className="doctor-list__modal" onClick={() => setSelectedImage(null)}>
          <div className="doctor-list__modal-content">
            <img src={selectedImage} alt="Doctor's Certificate" />
            <button className="doctor-list__modal-close" onClick={() => setSelectedImage(null)}>
              <X />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorList;

