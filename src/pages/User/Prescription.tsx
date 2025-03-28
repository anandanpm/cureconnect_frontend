

// import React, { useState, useEffect, useRef } from 'react';
// import { useParams } from 'react-router-dom';
// import { getPrescriptionByAppointmentId } from '../../api/userApi';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import './Prescription.scss';

// interface Medicine {
//   name: string;
//   dosage: string;
//   frequency: {
//     morning: boolean;
//     afternoon: boolean;
//     evening: boolean;
//     night: boolean;
//   };
//   duration: number;
//   instructions?: string;
// }

// interface Prescription {
//   _id?: string;
//   appointment_id: string;
//   medicines: Medicine[];
//   notes?: string;
//   created_at?: Date;
//   updated_at?: Date;
// }

// const PrescriptionDetails: React.FC = () => {
//   const { appointmentid } = useParams<{ appointmentid: string }>();
//   const [prescription, setPrescription] = useState<Prescription | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const prescriptionRef = useRef<HTMLDivElement>(null); // Reference for PDF capture

//   useEffect(() => {
//     const fetchPrescriptionDetails = async () => {
//       if (!appointmentid) {
//         setError('Invalid Appointment ID');
//         setLoading(false);
//         return;
//       }

//       try {
//         const data = await getPrescriptionByAppointmentId(appointmentid);
//         console.log(data, 'the data is coming');

//         const firstPrescription = Array.isArray(data) ? data[0] : data;

//         const safePrescription: Prescription = {
//           _id: firstPrescription?._id || '',
//           appointment_id: firstPrescription?.appointment_id || '',
//           medicines: Array.isArray(firstPrescription?.medicines)
//             ? (firstPrescription.medicines[0] ? [firstPrescription.medicines[0]] : [])
//             : [],
//           notes: firstPrescription?.notes || '',
//           created_at: firstPrescription?.created_at,
//           updated_at: firstPrescription?.updated_at
//         };

//         console.log('Safe Prescription:', safePrescription);

//         setPrescription(safePrescription);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching prescription:', err);
//         setError(err instanceof Error ? err.message : 'An unknown error occurred');
//         setLoading(false);
//       }
//     };

//     fetchPrescriptionDetails();
//   }, [appointmentid]);

//   const formatFrequency = (frequency: Medicine['frequency']): string => {
//     if (!frequency) return 'Not specified';

//     const times: string[] = [];
//     if (frequency.morning) times.push('Morning');
//     if (frequency.afternoon) times.push('Afternoon');
//     if (frequency.evening) times.push('Evening');
//     if (frequency.night) times.push('Night');

//     return times.length > 0 ? times.join(', ') : 'Not specified';
//   };

//   const downloadPDF = () => {
//     if (!prescriptionRef.current) return;

//     html2canvas(prescriptionRef.current, { scale: 2 }).then((canvas) => {
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       const imgWidth = 190; // Fit within A4 width
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;

//       pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
//       pdf.save(`Prescription_${appointmentid}.pdf`);
//     });
//   };

//   if (loading) {
//     return <div className="prescription-loading">Loading prescription details...</div>;
//   }

//   if (error) {
//     return <div className="prescription-error">{error}</div>;
//   }

//   if (!prescription || !Array.isArray(prescription.medicines) || prescription.medicines.length === 0) {
//     return <div className="prescription-not-found">No prescription found for this appointment.</div>;
//   }

//   return (
//     <div>
//       <div className="prescription-details" ref={prescriptionRef}>
//         <div className="prescription-header">
//           <h2>Prescription Details</h2>
//           {prescription.notes && (
//             <div className="prescription-notes">
//               <p><strong>Notes:</strong> {prescription.notes}</p>
//             </div>
//           )}
//           <div className="prescription-info">
//             <p>
//               <strong>Prescription Date:</strong>
//               {prescription.created_at
//                 ? new Date(prescription.created_at).toLocaleDateString()
//                 : 'Date not available'}
//             </p>
//           </div>
//         </div>

//         <table className="medications-table">
//           <thead>
//             <tr>
//               <th>Medication</th>
//               <th>Dosage</th>
//               <th>Frequency</th>
//               <th>Duration</th>
//               <th>Instructions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {prescription.medicines.map((medicine, index) => (
//               <tr key={index}>
//                 <td>{medicine.name || 'N/A'}</td>
//                 <td>{medicine.dosage || 'N/A'}</td>
//                 <td>{formatFrequency(medicine.frequency)}</td>
//                 <td>{medicine.duration ? `${medicine.duration} days` : 'N/A'}</td>
//                 <td>{medicine.instructions || 'No specific instructions'}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <button onClick={downloadPDF} className="download-btn">Download PDF</button>
//     </div>
//   );
// };

// export default PrescriptionDetails;


import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getPrescriptionByAppointmentId } from '../../api/userApi';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './Prescription.scss';

interface Medicine {
  name: string;
  dosage: string;
  frequency: {
    morning: boolean;
    afternoon: boolean;
    evening: boolean;
    night: boolean;
  };
  duration: number;
  instructions?: string;
}

interface Prescription {
  _id?: string;
  appointment_id: string;
  medicines: Medicine[];
  notes?: string;
  created_at?: Date;
  updated_at?: Date;
}

const PrescriptionDetails: React.FC = () => {
  const { appointmentid } = useParams<{ appointmentid: string }>();
  const [prescription, setPrescription] = useState<Prescription | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const prescriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPrescriptionDetails = async () => {
      if (!appointmentid) {
        setError('Invalid Appointment ID');
        setLoading(false);
        return;
      }

      try {
        const data = await getPrescriptionByAppointmentId(appointmentid);
        const firstPrescription = Array.isArray(data) ? data[0] : data;

        const safePrescription: Prescription = {
          _id: firstPrescription?._id || '',
          appointment_id: firstPrescription?.appointment_id || '',
          medicines: Array.isArray(firstPrescription?.medicines)
            ? (firstPrescription.medicines[0] ? [firstPrescription.medicines[0]] : [])
            : [],
          notes: firstPrescription?.notes || '',
          created_at: firstPrescription?.created_at,
          updated_at: firstPrescription?.updated_at
        };

        setPrescription(safePrescription);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching prescription:', err);
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        setLoading(false);
      }
    };

    fetchPrescriptionDetails();
  }, [appointmentid]);

  const formatFrequency = (frequency: Medicine['frequency']): string => {
    if (!frequency) return 'Not specified';

    const times: string[] = [];
    if (frequency.morning) times.push('Morning');
    if (frequency.afternoon) times.push('Afternoon');
    if (frequency.evening) times.push('Evening');
    if (frequency.night) times.push('Night');

    return times.length > 0 ? times.join(', ') : 'Not specified';
  };

  const downloadPDF = () => {
    if (!prescriptionRef.current) return;

    html2canvas(prescriptionRef.current, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save(`Prescription_${appointmentid}.pdf`);
    });
  };

  if (loading) {
    return <div className="prescription-loading">Loading prescription details...</div>;
  }

  if (error) {
    return <div className="prescription-error">{error}</div>;
  }

  if (!prescription || !Array.isArray(prescription.medicines) || prescription.medicines.length === 0) {
    return <div className="prescription-not-found">No prescription found for this appointment.</div>;
  }

  return (
    <div className="prescription-details-container">
      <div className="prescription-details" ref={prescriptionRef}>
        <div className="prescription-header">
          <h2>Prescription Details</h2>
          {prescription.notes && (
            <div className="prescription-notes">
              <p><strong>Notes:</strong> {prescription.notes}</p>
            </div>
          )}
          <div className="prescription-info">
            <p>
              <strong>Prescription Date:</strong>
              {prescription.created_at
                ? new Date(prescription.created_at).toLocaleDateString()
                : 'Date not available'}
            </p>
          </div>
        </div>

        <table className="medications-table">
          <thead>
            <tr>
              <th>Medication</th>
              <th>Dosage</th>
              <th>Frequency</th>
              <th>Duration</th>
              <th>Instructions</th>
            </tr>
          </thead>
          <tbody>
            {prescription.medicines.map((medicine, index) => (
              <tr key={index}>
                <td>{medicine.name || 'N/A'}</td>
                <td>{medicine.dosage || 'N/A'}</td>
                <td>{formatFrequency(medicine.frequency)}</td>
                <td>{medicine.duration ? `${medicine.duration} days` : 'N/A'}</td>
                <td>{medicine.instructions || 'No specific instructions'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={downloadPDF} className="download-btn">
        Download PDF
      </button>
    </div>
  );
};

export default PrescriptionDetails;