import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrainers } from '../features/trainersSlice';

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
  const [trainer, setTrainer] = useState("")
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null)

  const trainersArray = useSelector((state) => state.trainers.entities)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTrainers())
  }, [dispatch])

  const trainerArray = trainersArray.map((trainer) => {
    return <MenuItem key={trainer.id} value={trainer.name}>{trainer.name}</MenuItem>
  })

  const handleChange = (event) => {
    console.log(event.target.value)
    setTrainer(event.target.value);
    console.log(event.target.value)
    console.log(trainer)
  };

  return (
    <Box>
      <Paper sx={{
        width: 350,
        height: 450,
        ml: 3,
      }}
      >
        <Box sx={{ minWidth: 120 }}>
          <Typography padding={1}>Select Trainer:</Typography>
          <FormControl sx={{ m: 1, width: 230 }}>
            <InputLabel id="select-label">Trainer</InputLabel>
            <Select
              labelId="select-label"
              id="demo-simple-select"
              value={trainer}
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
              value={date}
              onChange={(newDate) => {
                setDate(newDate);
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
              value={time}
              onChange={(newTime) => {
                setTime(newTime);
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
      </Paper>
    </Box>
  )
}

export default AddTrainingAppointment