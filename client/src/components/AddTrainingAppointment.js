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

import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


function AddTrainingAppointment() {
  const [trainingAppointments, setTrainingAppointments] = useState([])
  const [trainerData, setTrainerData] = useState("")
  // const [dateData, setDateData] = useState(null);
  // const [timeData, setTimeData] = useState(null)
  // const [dateTime, setDateTime] = React.useState(dayjs('2014-08-18T21:11:54'));
  const [dateTimeData, setDateTimeData] = React.useState(null);

  const handleDateAndTimeChange = (newValue) => {
    setDateTimeData(newValue);
  };

  const trainersArray = useSelector((state) => state.trainers.entities)
  const currentUser = useSelector((state) => state.users.user) 
  console.log(currentUser)
  console.log(trainingAppointments)
  

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(fetchTrainers())
  }, [dispatch])

  useEffect(() => {
    fetch("/training_appointments")
    .then((resp) => resp.json())
    .then((appointments) => {
      appointments.forEach(appointment => {
        let date = new Date(appointment.time)
        appointment.time = date.toTimeString().slice(0, 5)
      })
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

    // const date = timeData
    // date.setMilliseconds(0)

    const newTrainingAppointment = {
      trainer_id: trainerData.id,
      date_time: dateTimeData,
      user_id: currentUser.id
    }
    console.log(newTrainingAppointment)
    // console.log(typeof newTrainingAppointment.time)

    fetch("/training_appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(newTrainingAppointment)
    })
    .then((resp) => resp.json())
    .then((appointmentData) => {
      // debugger
      console.log("appointmentData", appointmentData)

      if (appointmentData.errors) {
        return document.getElementById("error-alert2").hidden = false
      } else {
        setTrainingAppointments([...trainingAppointments, appointmentData])
        console.log(appointmentData)
        dispatch(userAddTrainingAppointments(appointmentData))
        setTrainerData("")
        setDateTimeData(null)
        document.getElementById("error-alert2").hidden = true
        return document.getElementById("success-alert").hidden = false
      }

      // const foundAppointment = trainingAppointments.find(appt => {
      //   return appt.date_time === appointmentData
      // })
      // console.log(foundAppointment)

      // const foundAppointment = trainingAppointments.find(appt => appt.date_time == appointmentData.date_time)
      // console.log(foundAppointment)

      // const foundAppointment = trainingAppointments.find((appt) => {
      //   return appt.date_time == appointmentData.date_time
      // })

      // if (foundAppointment) {
      //   return null
      // } else {
      //   setTrainingAppointments([...trainingAppointments, appointmentData])
      //   console.log(appointmentData)
      //   dispatch(userAddTrainingAppointments(appointmentData))
      //   setTrainerData("")
      // }
      // let date = new Date(appointmentData.time)
      // appointmentData.time = date.toTimeString().slice(0, 5)

      // dispatch and set go here
        // setTrainingAppointments([...trainingAppointments, appointmentData])
        // console.log(appointmentData)
        // dispatch(userAddTrainingAppointments(appointmentData))
        // setTrainerData("")
      
      // setDateData(null)
      // setTimeData(null)
      // history.push("/trainers")
    })
    .catch((error) => alert(error))
  }  

  // function duplicateAppointmentCheck() {
  //   // debugger
  //   if (!dateTimeData || !trainerData) {
  //     return null
  //   }
  //   const foundAppointment = trainingAppointments.find(appt => {
  //     // return appt.time === timeData.toTimeString().slice(0, 5) && appt.date === dateData.toISOString().slice(0, 10) && appt.trainer.name === trainerData.name
  //     return appt.dateTime === dateTimeData
  //   })
  //   console.log(foundAppointment)
  // }

    setTimeout(() => {
      const box = document.getElementById("success-alert").hidden = true;
    
      return box
      // 👇️ hides element (still takes up space on page)
      // box.style.visibility = 'hidden';
    }, 3000);

  return (
    <Box>
      {/* {duplicateAppointmentCheck() ? <Alert severity="error">Already has an appointment.</Alert> : null} */}
      <Box id="error-alert2" hidden>
        <Alert severity="error">That time and date are already picked. Please choose another date and time with your trainer.</Alert>
      </Box>
      <Box id="success-alert" hidden>
        <Alert severity="success">Training session booked!</Alert>
        {() => setTimeout()}
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

            {/* <Typography padding={1}>Select Date:</Typography>
            <Box sx={{ minWidth: 120, marginLeft: 1 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date"
                  inputFormat="MM/DD/YYYY"
                  value={dateData}
                  onChange={(newDate) => {
                    setDateData(newDate.$d);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box> */}

            
            <Box sx={{ minWidth: 120, marginLeft: 1, paddingY: 2}}>
            <Typography sx={{mb: 1}}>Select Date and Time:</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="DateAndTimePicker"
                  value={dateTimeData}
                  onChange={handleDateAndTimeChange}
                  // onChange={(newTime) => {
                  //   setTimeData(newTime.$d);
                  // }}
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