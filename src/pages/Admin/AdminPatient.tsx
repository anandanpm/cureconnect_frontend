import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatients, togglePatientStatus } from '../../redux/adminSlice';
import { AppDispatch, RootState } from '../../redux/store';
import './AdminPatient.scss';

interface Patients {
  _id: string;
  profile_pic: string;
  username: string;
  email: string;
  phone: string;
  gender: string;
  age: number;
  is_active: boolean;
}

const PatientList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [patients, setPatients] = useState<Patients[]>([]);
  const { loading, error } = useSelector((state: RootState) => state.admin);

  // useEffect(() => {
  //   dispatch(fetchPatients());
  // }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await dispatch(fetchPatients());
      setPatients(data.payload);
    };
    fetchData();
  }, []);


  const handleToggleStatus = (patientId: string, currentStatus: boolean) => {
    dispatch(togglePatientStatus({ patientId, newStatus: !currentStatus }));
    setPatients((prevPatients) =>
      prevPatients.map((patient) =>
        patient._id === patientId ? { ...patient, is_active: !patient.is_active } : patient))
  };

  if (loading) return <div className="patient-list__loading">Loading...</div>;
  if (error) return <div className="patient-list__error">{error}</div>;

  return (
    <div className="patient-list">
      <h2 className="patient-list__title">Patient List</h2>
      <table className="patient-list__table">
        <thead>
          <tr>
            <th>Profile</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient._id}>
              <td>
                <img 
                  src={patient.profile_pic || '/placeholder.svg?height=50&width=50'} 
                  alt={`${patient.username}'s profile`} 
                  className="patient-list__profile-pic"
                />
              </td>
              <td>{patient.username}</td>
              <td>{patient.email}</td>
              <td>{patient.phone}</td>
              <td>{patient.gender}</td>
              <td>{patient.age}</td>
              <td>{patient.is_active ? 'Active' : 'Blocked'}</td>
              <td>
                <button
                  className={`patient-list__toggle-btn ${patient.is_active ? 'active' : 'blocked'}`}
                  onClick={() => handleToggleStatus(patient._id, patient.is_active)}
                >
                  {patient.is_active ? 'Block' : 'Unblock'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;

