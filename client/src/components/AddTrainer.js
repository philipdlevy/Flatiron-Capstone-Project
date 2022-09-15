import React, { useState, useEffect } from 'react';
import {useHistory} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { trainerAdded } from '../features/trainersSlice';
import { fetchGyms } from '../features/gymsSlice';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function AddTrainer() {
  // const [newTrainerData, setNewTrainerData] = useState({
  //   name: "",
  //   bio: "",
  //   email: "",
  //   gym: ""
  // })
  const [nameData, setNameData] = useState("")
  const [bioData, setBioData] = useState("");
  const [emailData, setEmailData] = useState("")
  const [gymData, setGymData] = useState("")

  const gymArray = useSelector((state) => state.gyms.entities)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(fetchGyms())
  }, [dispatch])

  const gyms = gymArray.map((gym) => {
    return <MenuItem key={gym.id} value={gym}>{gym.address}</MenuItem>
  })

  // function handleChange(e) {
  //   setNewTrainerData({
  //     ...newTrainerData,
  //     [e.target.name]: e.target.value
  //   })
  // }

  const handleNameChange = (event) => {
    setNameData(event.target.value);
  };
  const handleBioChange = (event) => {
    setBioData(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmailData(event.target.value);
  };
  const handleGymChange = (event) => {
    setGymData(event.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault()

    const newTrainer = {
      name: nameData,
      bio: bioData,
      email: emailData,
      gym_id: gymData.id
    }

    fetch("/trainers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(newTrainer)
    })
    .then((resp) => {
      if (resp.ok) {
        dispatch(trainerAdded(newTrainer))
      }
      history.push("/trainers")
    })
    .catch((error) => alert(error))
  }

  return (
    <Box>
      <Paper sx={{
        width: 350,
        height: 500,
        ml: 3,
      }}
      >
        <Typography variant='h5' component="h2">Add New Trainer</Typography>
        <form onSubmit={handleSubmit}>
          <Typography padding={1}>Name:</Typography>
          <TextField
            required
            id="outlined-required"
            label="Required"
            placeholder='name'
            type="text"
            name="name"
            value={nameData}
            onChange={handleNameChange}
          />
          <Typography padding={1}>Bio:</Typography>
          <TextField
            required
            id="outlined-password-input"
            label="required"
            type="text"
            name="bio"
            value={bioData}
            onChange={handleBioChange}
          />
          <Typography padding={1}>Email:</Typography>
          <TextField
            required
            id="outlined-password-input"
            label="required"
            type="text"
            name="email"
            value={emailData}
            onChange={handleEmailChange}
          />

          <Box sx={{ minWidth: 120 }}>
            <Typography >Select Gym:</Typography>
            <FormControl sx={{ m: 1, width: 185 }}>
              <InputLabel id="select-label">Gym</InputLabel>
              <Select
                required
                labelId="select-label"
                id="demo-simple-select"
                value={gymData}
                label="gym"
                onChange={handleGymChange}
              >
                {gyms}
              </Select>
            </FormControl>
          </Box>

          <Box paddingY={2}>
            <Button
              variant="contained"
              type="submit"
            >
              Submit New Trainer
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  )
}

export default AddTrainer




