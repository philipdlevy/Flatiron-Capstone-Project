import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrainers } from '../features/trainersSlice';
import {useHistory} from "react-router-dom"

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';

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

  function handleSubmit(e) {
    e.preventDefault()

    const newTrainingAppointment = {
      trainer_id: trainerData.id,
      date: dateData,
      time: timeData,
      user_id: currentUser.id
    }
    console.log(newTrainingAppointment)

    fetch("/training_appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(newTrainingAppointment)
    })
    .then((resp) => {
      if (resp.ok) {
        setTrainingAppointments([...trainingAppointments, newTrainingAppointment])
        console.log(newTrainingAppointment)
        setTrainerData("")
        setDateData("")
        setTimeData("")
        history.push("/trainers")
      }
    })
    .catch((error) => alert(error))
  }

  return (
    <Box>
      <Paper sx={{
        width: 350,
        height: 450,
        ml: 3,
      }}
      >
        <form onSubmit={handleSubmit}>
          <Box sx={{ minWidth: 120 }}>
            <Typography padding={1}>Select Trainer:</Typography>
            <FormControl sx={{ m: 1, width: 230 }}>
              <InputLabel id="select-label">Trainer</InputLabel>
              <Select
                labelId="select-label"
                id="demo-simple-select"
                value={trainerData}
                label="Trainer"
                // onChange={(e) => setTrainer(e.target.value)}
                onChange={handleChange}
              >
                {/* <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem> */}
                {trainerArray}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ minWidth: 120, marginLeft: 1 }}>
            <Typography padding={1}>Select Date:</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ m: 1, width: 250 }}>
              <DatePicker
                label="Date"
                value={dateData}
                onChange={(newDate) => {
                  setDateData(newDate);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>

          <Box sx={{ minWidth: 120, marginLeft: 1 }}>
            <Typography padding={1}>Select Time:</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ m: 1, width: 250 }}>
              <TimePicker
                label="Time"
                // inputFormat='h:mm AM/PM'
                value={timeData}
                onChange={(newTime) => {
                  setTimeData(newTime);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

            <Box paddingY={3}>
              <Button
                variant="contained"
                type="submit"
              >
                Add Appointment
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  )
}

export default AddTrainingAppointment