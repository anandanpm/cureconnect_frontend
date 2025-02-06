
import type React from "react"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import dayjs from "dayjs"
import { RRule, Frequency } from "rrule" 
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
  CircularProgress,
  Box,
  Fade,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from "@mui/material"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { TimePicker } from "@mui/x-date-pickers/TimePicker"
import DeleteIcon from "@mui/icons-material/Delete"
import AddIcon from "@mui/icons-material/Add"
import SaveIcon from "@mui/icons-material/Save"
import { createDoctorSlots, fetchSlots } from "../../redux/doctorSlice"
import type { AppDispatch } from "../../redux/store"
import './DoctorSlot.scss'

interface Slot {
  _id?: string
  doctor_id: string
  day: string
  start_time: string
  end_time: string
  status: "available" | "booked"
  recurrence?: string
  created_at?: Date
  updated_at?: Date
}

interface RootState {
  doctor: {
    _id: string
    loading: boolean
    error: string | null
  }
}

const DoctorAppointmentPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null)
  const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(null)
  const [newSlots, setNewSlots] = useState<Slot[]>([])
  const [fetchedSlots, setFetchedSlots] = useState<Slot[]>([])
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [backendResponse, setBackendResponse] = useState<{ message: string; result: Slot | null }>({
    message: "",
    result: null,
  })
  const [recurrence, setRecurrence] = useState<string>("none")

  const dispatch = useDispatch<AppDispatch>()
  const { _id: doctorId, loading, error } = useSelector((state: RootState) => state.doctor)

  useEffect(() => {
    const getSlots = async () => {
      if (doctorId) {
        try {
          const response = await dispatch(fetchSlots(doctorId)).unwrap()
          if (response && response.data && Array.isArray(response.data)) {
            setFetchedSlots(response.data)
          } else {
            console.error("Unexpected response format:", response)
            setErrorMessage("Unexpected response format from server")
          }
        } catch (error) {
          console.error("Error fetching slots:", error)
          setErrorMessage("Failed to fetch slots. Please try again.")
        }
      }
    }
    getSlots()
  }, [doctorId, dispatch])

  const generateRecurringSlots = (baseSlot: Slot): Slot[] => {
    if (recurrence === "none") return [baseSlot]

    const startDate = dayjs(baseSlot.day)
    const [freq, interval] = recurrence.split("-")
    
    // Updated to use the Frequency enum
    const rruleOptions: Partial<any> = {
      freq: Frequency[freq as keyof typeof Frequency],
      interval: Number.parseInt(interval, 10),
      dtstart: startDate.toDate(),
      count: 52, // Generate slots for up to a year
    }

    const rule = new RRule(rruleOptions)
    const dates = rule.all()

    return dates.map((date) => ({
      ...baseSlot,
      day: dayjs(date).format("YYYY-MM-DD"),
      recurrence: rule.toString(),
    }))
  }

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setSelectedDate(date)
  }

  const handleStartTimeChange = (time: dayjs.Dayjs | null) => {
    setStartTime(time)
  }

  const handleRecurrenceChange = (event: SelectChangeEvent<string>) => {
    setRecurrence(event.target.value)
  }

  const handleAddSlot = () => {
    if (selectedDate && startTime) {
      const now = dayjs()
      const selectedDateTime = dayjs(`${selectedDate.format("YYYY-MM-DD")} ${startTime.format("HH:mm")}`)

      if (selectedDateTime.isBefore(now)) {
        setErrorMessage("Cannot create a slot in the past. Please select a future date and time.")
        return
      }

      const endTime = startTime.add(1, "hour")
      const baseSlot: Slot = {
        doctor_id: doctorId,
        day: selectedDate.format("YYYY-MM-DD"),
        start_time: startTime.format("HH:mm"),
        end_time: endTime.format("HH:mm"),
        status: "available",
      }

      const recurringSlots = generateRecurringSlots(baseSlot)
      const hasOverlap = recurringSlots.some((newSlot) => {
        const isDuplicateInNew = [...newSlots, ...fetchedSlots].some(
          (slot) =>
            slot.day === newSlot.day &&
            ((slot.start_time <= newSlot.start_time && newSlot.start_time < slot.end_time) ||
              (slot.start_time < newSlot.end_time && newSlot.end_time <= slot.end_time) ||
              (newSlot.start_time <= slot.start_time && slot.end_time <= newSlot.end_time)),
        )

        return isDuplicateInNew
      })

      if (hasOverlap) {
        setErrorMessage(
          "One or more recurring slots overlap with existing slots. Please choose different times or recurrence options.",
        )
      } else {
        setNewSlots([...newSlots, ...recurringSlots])
        setStartTime(null)
        setErrorMessage(null)
      }
    }
  }

  const handleDeleteSlot = (index: number) => {
    const updatedSlots = newSlots.filter((_, i) => i !== index)
    setNewSlots(updatedSlots)
  }

  const handleSaveSlots = () => {
    setOpenConfirmDialog(true)
  }

  const handleConfirmSave = async () => {
    try {
      const responses = await Promise.all(newSlots.map((slot) => dispatch(createDoctorSlots(slot))))
      const lastResponse = responses[responses.length - 1]
      if (lastResponse && lastResponse.payload) {
        setBackendResponse(lastResponse.payload as { message: string; result: Slot | null })
      }
      setOpenConfirmDialog(false)
      setNewSlots([])

      if (doctorId) {
        const response = await dispatch(fetchSlots(doctorId)).unwrap()
        if (response && response.data && Array.isArray(response.data)) {
          setFetchedSlots(response.data)
        } else {
          console.error("Unexpected response format after save:", response)
          setErrorMessage("Unexpected response format from server after save")
        }
      }
    } catch (error) {
      console.error("Error saving slots:", error)
      setErrorMessage("Failed to save slots. Please try again.")
    }
  }

  const formatTime = (time: string) => {
    return dayjs(time, "HH:mm").format("h:mm A")
  }

  const formatRecurrence = (recurrence: string): string => {
    if (recurrence === "none") return "No recurrence"
    const rule = RRule.fromString(recurrence)
    return rule.toText()
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress size={60} thickness={4} />
      </Box>
    )
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography color="error" variant="h5">
          Error: {error}
        </Typography>
      </Box>
    )
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="lg" className="appointment-page">
        <Typography variant="h3" className="page-title" gutterBottom>
          Manage Appointment Slots
        </Typography>
        <Box className="content-wrapper">
          <Card className="appointment-card create-slot-card">
            <CardHeader title={<Typography variant="h5">Create New Slot</Typography>} className="card-header" />
            <CardContent className="card-content">
              <Box className="form-container">
                <DatePicker
                  label="Select Date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  disablePast
                  slotProps={{ textField: { fullWidth: true, className: "date-picker" } }}
                />
                <TimePicker
                  label="Start Time"
                  value={startTime}
                  onChange={handleStartTimeChange}
                  slotProps={{ textField: { fullWidth: true, className: "time-picker" } }}
                />
                <FormControl fullWidth>
                  <InputLabel>Recurrence</InputLabel>
                  <Select value={recurrence} onChange={handleRecurrenceChange} label="Recurrence">
                    <MenuItem value="none">No recurrence</MenuItem>
                    <MenuItem value="DAILY-1">Daily</MenuItem>
                    <MenuItem value="WEEKLY-1">Weekly</MenuItem>
                    <MenuItem value="WEEKLY-2">Every 2 weeks</MenuItem>
                    <MenuItem value="MONTHLY-1">Monthly</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddSlot}
                  disabled={!selectedDate || !startTime}
                  fullWidth
                  className="add-slot-button"
                  startIcon={<AddIcon />}
                >
                  Add Slot
                </Button>
              </Box>
            </CardContent>
          </Card>

          <Box className="slots-container">
            <Card className="appointment-card slots-list-card">
              <CardHeader title={<Typography variant="h5">Existing Slots</Typography>} className="card-header" />
              <CardContent className="card-content">
                {fetchedSlots.length > 0 ? (
                  <List className="slots-list">
                    {fetchedSlots.map((slot) => (
                      <Fade in={true} key={slot._id}>
                        <ListItem className="slot-item">
                          <ListItemText
                            primary={`${slot.day} | ${formatTime(slot.start_time)} - ${formatTime(slot.end_time)}`}
                            secondary={`Status: ${slot.status}${slot.recurrence ? ` | ${formatRecurrence(slot.recurrence)}` : ""}`}
                            className="slot-text"
                          />
                        </ListItem>
                      </Fade>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body1" align="center" className="no-slots-message">
                    No slots have been created yet.
                  </Typography>
                )}
              </CardContent>
            </Card>

            <Card className="appointment-card slots-list-card">
              <CardHeader title={<Typography variant="h5">New Slots</Typography>} className="card-header" />
              <CardContent className="card-content">
                <List className="slots-list">
                  {newSlots.map((slot, index) => (
                    <Fade in={true} key={index}>
                      <ListItem
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
                          primary={`${slot.day} | ${formatTime(slot.start_time)} - ${formatTime(slot.end_time)}`}
                          secondary={slot.recurrence ? formatRecurrence(slot.recurrence) : "No recurrence"}
                          className="slot-text"
                        />
                      </ListItem>
                    </Fade>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Box>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveSlots}
            disabled={newSlots.length === 0}
            fullWidth
            className="save-slots-button"
            startIcon={<SaveIcon />}
          >
            Save Slots
          </Button>
        </Box>

        <Dialog
          open={openConfirmDialog}
          onClose={() => setOpenConfirmDialog(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm Save"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to save these slots?{" "}
              {newSlots.length > 1 && `This will create ${newSlots.length} slots.`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenConfirmDialog(false)}>Cancel</Button>
            <Button onClick={handleConfirmSave} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={!!errorMessage}
          autoHideDuration={6000}
          onClose={() => setErrorMessage(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={() => setErrorMessage(null)} severity="error" sx={{ width: "100%" }}>
            {errorMessage}
          </Alert>
        </Snackbar>
      </Container>
    </LocalizationProvider>
  )
}

export default DoctorAppointmentPage