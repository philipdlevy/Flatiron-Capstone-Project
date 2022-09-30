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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';


function AddTrainingAppointment() {
  const [trainingAppointments, setTrainingAppointments] = useState([])
  const [trainerData, setTrainerData] = useState("")
  const [dateData, setDateData] = useState(null);
  const [timeData, setTimeData] = useState(null)
  console.log(dateData)

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
  console.log(trainingAppointments)

  const trainerArray = trainersArray.map((trainer) => {
    return <MenuItem key={trainer.id} value={trainer}>{trainer.name}</MenuItem>
  })

  const handleChange = (event) => {
    setTrainerData(event.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault()

    const newTrainingAppointment = {
      trainer_id: trainerData.id,
      date: dateData,
      time: timeData,
      user_id: currentUser.id
    }
    console.log(newTrainingAppointment)
    console.log(trainingAppointments)

    fetch("/training_appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(newTrainingAppointment)
    })
    .then((resp) => resp.json())
    .then((appointmentData) => {
      console.log("appointmentData", appointmentData)
      setTrainingAppointments([...trainingAppointments, appointmentData])
      console.log(appointmentData)
      dispatch(userAddTrainingAppointments(appointmentData))
      setTrainerData("")
      setDateData("")
      setTimeData("")
      history.push("/trainers")
    })
    .catch((error) => alert(error))
  }  
  

  return (
    <Box>

      <Box
        paddingY={5}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >

        <Paper sx={{
          width: 250,
          height: 380
        }}
        >
          <form onSubmit={handleSubmit}>
            <Typography padding={1}>Select Trainer:</Typography>
            <Box sx={{ minWidth: 120 }}>
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

            <Typography padding={1}>Select Date:</Typography>
            <Box sx={{ minWidth: 120, marginLeft: 1 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date"
                  inputFormat="MM/DD/YYYY"
                  value={dateData}
                  onChange={(newDate) => {
                    setDateData(newDate);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>

            <Typography padding={1}>Select Time:</Typography>
            <Box sx={{ minWidth: 120, marginLeft: 1, }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Time"
                  // inputFormat='hh:mm tt'
                  value={timeData}
                  onChange={(newTime) => {
                    setTimeData(newTime);
                  }}
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
                {dateData === null || timeData === null ? null :
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