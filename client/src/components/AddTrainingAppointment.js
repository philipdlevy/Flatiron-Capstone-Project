import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrainers } from '../features/trainersSlice';
import {useHistory} from "react-router-dom"
import { userAddTrainingAppointments } from '../features/usersSlice';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


function AddTrainingAppointment() {
  const [trainingAppointments, setTrainingAppointments] = useState([])
  const [trainerData, setTrainerData] = useState("")
  const [dateTimeData, setDateTimeData] = React.useState(null);

  const handleDateAndTimeChange = (newValue) => {
    setDateTimeData(newValue);
  };

  const trainersArray = useSelector((state) => state.trainers.entities)
  const currentUser = useSelector((state) => state.users.user) 
  

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(fetchTrainers())
  }, [dispatch])

  useEffect(() => {
    fetch("/training_appointments")
    .then((resp) => resp.json())
    .then((appointments) => {
      setTrainingAppointments(appointments)
    })
    .catch((error) => alert(error))
  }, [])

  const trainerArray = trainersArray.map((trainer) => {
    return <MenuItem key={trainer.id} value={trainer}>{trainer.name}</MenuItem>
  })

  const handleChange = (event) => {
    setTrainerData(event.target.value);
  };

  // sets success alert off after 4 seconds
  function alertTimer() {
    const box = document.getElementById("success-alert").hidden = true;
    return box
  }
  function successAlertOff() {
    const turnOffAlert = setTimeout(alertTimer, 4000)
  }

  function handleSubmit(e) {
    e.preventDefault()

    const newTrainingAppointment = {
      trainer_id: trainerData.id,
      date_time: dateTimeData,
      user_id: currentUser.id
    }

    fetch("/training_appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(newTrainingAppointment)
    })
    .then((resp) => resp.json())
    .then((appointmentData) => {

      if (appointmentData.errors) {
        return document.getElementById("error-alert2").hidden = false
      } else {
        setTrainingAppointments([...trainingAppointments, appointmentData])
        dispatch(userAddTrainingAppointments(appointmentData))
        setTrainerData("")
        setDateTimeData(null)
        document.getElementById("error-alert2").hidden = true
        document.getElementById("success-alert").hidden = false
        successAlertOff()
      }
      // history.push("/trainers")
    })
    .catch((error) => alert(error))
  }  

  return (
    <Box>
      <Box id="error-alert2" hidden>
        <Alert severity="error">That time and date are already picked. Please choose another date and time with your trainer.</Alert>
      </Box>
      <Box id="success-alert" hidden>
        <Alert severity="success">Training session booked!</Alert>
      </Box>

      <Box
        paddingY={5}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >

        <Paper sx={{
          width: 250,
          height: 330
        }}
        >
          <form onSubmit={handleSubmit}>           
            <Box sx={{ minWidth: 120, mt: 2 }}>
            <Typography padding={1}>Select Trainer:</Typography>
              <FormControl sx={{ ml: 1, width: 230 }}>
                <InputLabel id="select-label">Trainer</InputLabel>
                <Select
                  required
                  id="outlined-required"
                  label="Required"
                  labelId="select-label"
                  // id="demo-simple-select"
                  value={trainerData}
                  // label="Trainer"
                  onChange={handleChange}
                >
                  {trainerArray}
                </Select>
              </FormControl>
            </Box>
            
            <Box sx={{ minWidth: 120, marginLeft: 1, paddingY: 2}}>
            <Typography sx={{mb: 1}}>Select Date and Time:</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="DateAndTimePicker"
                  value={dateTimeData}
                  onChange={handleDateAndTimeChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>

              <Box 
                paddingY={3}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {dateTimeData === null ? null :
                <Button
                  variant="contained"
                  type="submit"
                >
                  Add Appointment
                </Button>
                }
              </Box>
          </form>
        </Paper>
      </Box>
    </Box>
  )
}

export default AddTrainingAppointment