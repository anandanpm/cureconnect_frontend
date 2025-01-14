import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import DeleteIcon from '@mui/icons-material/Delete';
import './DoctorSlot.scss';

interface Slot {
  doctor_id: string;
  day: string;
  start_time: string;
  end_time: string;
  status: 'available' | 'booked';
  created_at?: Date;
  updated_at?: Date;
}

interface RootState {
  doctor: {
    _id: string;
  };
}

const DoctorAppointmentPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  
  const doctorId = useSelector((state: RootState) => state.doctor._id);

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setSelectedDate(date);
  };

  const handleStartTimeChange = (time: dayjs.Dayjs | null) => {
    setStartTime(time);
  };

  const handleAddSlot = () => {
    if (selectedDate && startTime) {
      const endTime = startTime.add(1, 'hour');
      const newSlot: Slot = {
        doctor_id: doctorId,
        day: selectedDate.format('YYYY-MM-DD'),
        start_time: startTime.format('HH:mm'),
        end_time: endTime.format('HH:mm'),
        status: 'available',
      };
      setSlots([...slots, newSlot]);
      setStartTime(null);
    }
  };

  const handleDeleteSlot = (index: number) => {
    const updatedSlots = slots.filter((_, i) => i !== index);
    setSlots(updatedSlots);
  };

  return (
    <Container maxWidth="md" className="appointment-page">
      <Card className="appointment-card">
        <CardHeader
          title={<Typography variant="h5">Create Appointment Slots</Typography>}
          className="card-header"
        />
        <CardContent className="card-content">
          <div className="form-container">
            <DatePicker
              label="Select Date"
              value={selectedDate}
              onChange={handleDateChange}
              disablePast
              slotProps={{ textField: { fullWidth: true, className: 'date-picker' } }}
            />
            <TimePicker
              label="Start Time"
              value={startTime}
              onChange={handleStartTimeChange}
              slotProps={{ textField: { fullWidth: true, className: 'time-picker' } }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddSlot}
              disabled={!selectedDate || !startTime}
              fullWidth
              className="add-slot-button"
            >
              Add Slot
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="appointment-card slots-list-card">
        <CardHeader
          title={<Typography variant="h5">Available Slots</Typography>}
          className="card-header"
        />
        <CardContent className="card-content">
          <List className="slots-list">
            {slots.map((slot, index) => (
              <ListItem
                key={index}
                className="slot-item"
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteSlot(index)}
                    className="delete-button"
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={`${slot.day} | ${slot.start_time} - ${slot.end_time}`}
                  className="slot-text"
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};

export default DoctorAppointmentPage;