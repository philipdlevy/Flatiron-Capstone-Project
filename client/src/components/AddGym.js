import React, { useState } from 'react';
import {useHistory} from "react-router-dom"
import { useDispatch } from 'react-redux';
import { gymAdded } from '../features/gymsSlice';


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  displays: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
});

function AddGym() {
  const [newGymData, setNewGymData] = useState({
    address: "",
    phone_number: ""
  })
  const classes = useStyles()

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
    .then((resp) => resp.json())
    .then((gym) => {
      dispatch(gymAdded(gym))
      setNewGymData({
        address: "",
        phone_number: ""
      })
      history.push("/gyms")
    })
    .catch((error) => alert(error))
  }

  return (
    <Box
      paddingY={5}
      className={classes.displays}
    >

      <Paper sx={{
        width: 350,
        height: 400
      }}
      >
        <Typography 
          sx={{paddingY: 1 }}
          className={classes.displays}
          variant='h5' 
          component="h2"         
        >
          Add New Gym
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box paddingY={1}>
            <Typography padding={1}>Gym Address:</Typography>
            <TextField
              sx={{ ml: 1, width: 333}}
              required
              id="outlined-required"
              label="Required"
              placeholder='Gym Address'
              type="text"
              name="address"
              value={newGymData.address}
              onChange={handleChange}
            />
          </Box>

          <Box paddingY={1}>
            <Typography padding={1}>Gym Phone Nmber:</Typography>
            <TextField
              sx={{ ml: 1, width: 333}}
              required
              id="outlined-password-input"
              label="required"
              type="integer"
              name="phone_number"
              value={newGymData.phone_number}
              onChange={handleChange}
            />
          </Box>

          <Box 
            paddingY={8}
            className={classes.displays}
          >
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