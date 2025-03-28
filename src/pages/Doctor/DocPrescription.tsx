
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Paper, 
  Snackbar,
  Alert,
  MenuItem
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import { createPrescription } from "../../api/doctorApi";
import './DocPrescription.scss';

// Updated interface to match backend schema
export interface PrescriptionData {
  appointment_id: string;
  medicines: {
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
  }[];
  notes?: string;
}

interface MedicineEntry {
  id: number;
  name: string;
  dosage: string;
  frequency: {
    morning: boolean;
    afternoon: boolean;
    evening: boolean;
    night: boolean;
  };
  duration: number;
  instructions: string;
}

// Styled Components
const PrescriptionPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2),
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
}));

const FormHeader = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  fontWeight: 600,
  color: theme.palette.primary.main,
}));

const PrescriptionPage: React.FC = () => {
  const navigate = useNavigate();
  const { appointmentId } = useParams<{ appointmentId: string }>();

  const [medicines, setMedicines] = useState<MedicineEntry[]>([
    { 
      id: 1, 
      name: '', 
      dosage: '', 
      frequency: {
        morning: false,
        afternoon: false,
        evening: false,
        night: false
      },
      duration: 1,
      instructions: ''
    }
  ]);

  const [notes, setNotes] = useState<string>('');

  // State for handling API response and errors
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addMedicineEntry = () => {
    const newId = medicines.length > 0 
      ? Math.max(...medicines.map(m => m.id)) + 1 
      : 1;
    setMedicines([
      ...medicines, 
      { 
        id: newId, 
        name: '', 
        dosage: '', 
        frequency: {
          morning: false,
          afternoon: false,
          evening: false,
          night: false
        },
        duration: 1,
        instructions: ''
      }
    ]);
  };

  const updateMedicineEntry = (id: number, field: keyof MedicineEntry, value: any) => {
    setMedicines(medicines.map(med => 
      med.id === id ? { ...med, [field]: value } : med
    ));
  };

  const updateMedicineFrequency = (id: number, frequencyField: keyof MedicineEntry['frequency']) => {
    setMedicines(medicines.map(med => 
      med.id === id 
        ? { 
            ...med, 
            frequency: { 
              ...med.frequency, 
              [frequencyField]: !med.frequency[frequencyField] 
            } 
          } 
        : med
    ));
  };

  const removeMedicineEntry = (id: number) => {
    if (medicines.length > 1) {
      setMedicines(medicines.filter(med => med.id !== id));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!appointmentId) {
      setSnackbarMessage('Missing appointment details');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    // Validate medicines
    const invalidMedicines = medicines.some(med => 
      !med.name.trim() || 
      !med.dosage.trim() || 
      med.duration <= 0 || 
      (!med.frequency.morning && 
       !med.frequency.afternoon && 
       !med.frequency.evening && 
       !med.frequency.night)
    );

    if (invalidMedicines) {
      setSnackbarMessage('Please fill in all medicine details and select at least one time of day');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    // Prepare prescription data
    const prescriptionData: PrescriptionData = {
      appointment_id: appointmentId,
      medicines: medicines.map(med => ({
        name: med.name,
        dosage: med.dosage,
        frequency: med.frequency,
        duration: med.duration,
        instructions: med.instructions
      })),
      notes: notes
    };

    try {
      setIsSubmitting(true);
      // Call API to create prescription
      await createPrescription(prescriptionData);
      
      // Show success message
      setSnackbarMessage('Prescription created successfully');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);

      // Navigate back to patient list or appointments
      setTimeout(() => {
        navigate('/doctor/patient');
      }, 1500);
    } catch (error: any) {
      // Handle API error
      const errorMessage = error.response?.data?.message || 'Failed to create prescription. Please try again.';
      setSnackbarMessage(errorMessage);
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box 
      className="prescription-page"
      sx={{ 
        flexGrow: 1, 
        padding: 3,
        backgroundColor: '#f4f6f8',
        minHeight: '100vh'
      }}
    >
      <PrescriptionPaper 
        className="prescription-page__paper" 
        elevation={3}
      >
        <FormHeader 
          className="prescription-page__header"
          variant="h4" 
          align="center"
        >
          Create Prescription
        </FormHeader>

        <form onSubmit={handleSubmit}>
          {medicines.map((medicine) => (
            <Grid 
              container 
              spacing={2} 
              key={medicine.id} 
              className="prescription-page__medicine-entry"
              sx={{ 
                marginBottom: 2, 
                backgroundColor: 'white', 
                padding: 2, 
                borderRadius: 2 
              }}
            >
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Medicine Name"
                  variant="outlined"
                  value={medicine.name}
                  onChange={(e) => updateMedicineEntry(medicine.id, 'name', e.target.value)}
                  required
                  className="prescription-input__field"
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Dosage"
                  variant="outlined"
                  value={medicine.dosage}
                  onChange={(e) => updateMedicineEntry(medicine.id, 'dosage', e.target.value)}
                  required
                  className="prescription-input__field"
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  fullWidth
                  select
                  label="Duration (Days)"
                  variant="outlined"
                  value={medicine.duration}
                  onChange={(e) => updateMedicineEntry(medicine.id, 'duration', Number(e.target.value))}
                  required
                  className="prescription-input__field"
                >
                  {[1,2,3,4,5,6,7,10,14,21,30].map((days) => (
                    <MenuItem key={days} value={days}>
                      {days} {days === 1 ? 'Day' : 'Days'}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box 
                  display="flex" 
                  justifyContent="space-between" 
                  alignItems="center"
                  className="prescription-page__time-buttons"
                >
                  <Button 
                    variant={medicine.frequency.morning ? "contained" : "outlined"}
                    color="primary"
                    onClick={() => updateMedicineFrequency(medicine.id, 'morning')}
                  >
                    Morning
                  </Button>
                  <Button 
                    variant={medicine.frequency.afternoon ? "contained" : "outlined"}
                    color="secondary"
                    onClick={() => updateMedicineFrequency(medicine.id, 'afternoon')}
                  >
                    Afternoon
                  </Button>
                  <Button 
                    variant={medicine.frequency.evening ? "contained" : "outlined"}
                    color="error"
                    onClick={() => updateMedicineFrequency(medicine.id, 'evening')}
                  >
                    Evening
                  </Button>
                  <Button 
                    variant={medicine.frequency.night ? "contained" : "outlined"}
                    color="info"
                    onClick={() => updateMedicineFrequency(medicine.id, 'night')}
                  >
                    Night
                  </Button>
                  {medicines.length > 1 && (
                    <Button 
                      variant="outlined" 
                      color="error"
                      onClick={() => removeMedicineEntry(medicine.id)}
                    >
                      Remove
                    </Button>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Special Instructions"
                  variant="outlined"
                  multiline
                  rows={2}
                  value={medicine.instructions}
                  onChange={(e) => updateMedicineEntry(medicine.id, 'instructions', e.target.value)}
                  className="prescription-input__field"
                  placeholder="Any specific instructions for this medicine"
                />
              </Grid>
            </Grid>
          ))}

          <Grid item xs={12} sx={{ marginBottom: 2 }}>
            <TextField
              fullWidth
              label="Prescription Notes"
              variant="outlined"
              multiline
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="prescription-input__field"
              placeholder="Additional notes for the prescription"
            />
          </Grid>

          <Box 
            className="prescription-page__actions"
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginTop: 2 
            }}
          >
            <Button 
              variant="outlined" 
              color="primary" 
              onClick={addMedicineEntry}
            >
              Add Medicine
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Prescription'}
            </Button>
          </Box>
        </form>
      </PrescriptionPaper>

      {/* Snackbar for feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        className="prescription-snackbar"
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity} 
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PrescriptionPage;