import React, { useState } from 'react'


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


function AddTrainingAppointment() {
  const [trainer, setTrainer] = useState("")
  const [value, setValue] = useState(null);
  const [time, setTime] = useState("")



  // const [trainingAppointmentData, setTrainingAppointmentData] = useState({
  //   date: "",
  //   time: ""
  // })

  // const handleChange = (e) => {
  //   setTrainingAppointmentData({
  //     ...trainingAppointmentData,
  //     [e.target.name]: e.target.value
  //   });
  // };

  return (
    <Box>
      <Paper sx={{
        width: 350,
        height: 450,
        ml: 3,
      }}
      >
        <Box sx={{ minWidth: 120 }}>
          <Typography paddingX={1}>Select Trainer:</Typography>
          <FormControl sx={{ m: 1, width: 230 }}>
            <InputLabel id="select-label">Trainer</InputLabel>
            <Select
              labelId="select-label"
              id="demo-simple-select"
              value={trainer}
              label="Trainer"
              onChange={(e) => setTrainer(e.target.value)}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ minWidth: 120, marginLeft: 1 }}>
          <Typography paddingX={1}>Select Date:</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ m: 1, width: 250 }}>
            <DatePicker
              label="Date"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>

        <Box sx={{ minWidth: 120 }}>
          <Typography paddingX={1}>Select Time:</Typography>
          <FormControl sx={{ m: 1, width: 230 }}>
            <InputLabel id="select-label">Time</InputLabel>
            <Select
              labelId="select-label"
              id="demo-simple-select"
              value={time}
              label="Time"
              onChange={(e) => setTime(e.target.value)}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            type="submit"
          >
            Add Appointment
          </Button>
        </Box>

      </Paper>
    </Box>
  )
}

export default AddTrainingAppointment