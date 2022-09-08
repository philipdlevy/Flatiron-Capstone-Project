import React, { useState } from 'react';
import {useHistory} from "react-router-dom"
import { useDispatch } from 'react-redux';
import { gymAdded } from '../features/gymsSlice';


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';

function AddGym() {
  const [newGymData, setNewGymData] = useState({
    address: "",
    phone_number: ""
  })

  const dispatch = useDispatch()

  const history = useHistory()

  function handleChange(e) {
    setNewGymData({
      ...newGymData,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()

    fetch("/gyms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(newGymData)
    })
    .then((resp) => {
      if (resp.ok) {
        dispatch(gymAdded(newGymData))
        setNewGymData({
          address: "",
          phone_number: ""
        })
        history.push("/gyms")
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
        <Typography variant='h5' component="h2">Add New Gym</Typography>
        <form onSubmit={handleSubmit}>
          <Typography padding={1}>Gym Address:</Typography>
          <TextField
            required
            id="outlined-required"
            label="Required"
            placeholder='Gym Address'
            type="text"
            name="address"
            value={newGymData.address}
            onChange={handleChange}
          />
          <Typography padding={1}>Gym Phone Nmber:</Typography>
          <TextField
            required
            id="outlined-password-input"
            label="required"
            type="integer"
            name="phone_number"
            value={newGymData.phone_number}
            onChange={handleChange}
          />
          <Box paddingY={1}>
            <Button
              variant="contained"
              type="submit"
            >
              Submit New gym
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  )
}

export default AddGym