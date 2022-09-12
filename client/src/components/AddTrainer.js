import React, { useState } from 'react';
import {useHistory} from "react-router-dom"
import { useDispatch } from 'react-redux';
import { trainerAdded } from '../features/trainersSlice';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';

function AddTrainer() {
  const [newTrainerData, setNewTrainerData] = useState({
    name: "",
    bio: "",
    email: "",
    gym_id: 7
  })

  const dispatch = useDispatch()
  const history = useHistory()

  function handleChange(e) {
    setNewTrainerData({
      ...newTrainerData,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()

    fetch("/trainers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(newTrainerData)
    })
    .then((resp) => {
      if (resp.ok) {
        dispatch(trainerAdded(newTrainerData))
        setNewTrainerData({
          name: "",
          bio: "",
          email: ""
        })
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
            value={newTrainerData.name}
            onChange={handleChange}
          />
          <Typography padding={1}>Bio:</Typography>
          <TextField
            required
            id="outlined-password-input"
            label="required"
            type="text"
            name="bio"
            value={newTrainerData.bio}
            onChange={handleChange}
          />
          <Typography padding={1}>Email:</Typography>
          <TextField
            required
            id="outlined-password-input"
            label="required"
            type="text"
            name="email"
            value={newTrainerData.email}
            onChange={handleChange}
          />
          <Box paddingY={1}>
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