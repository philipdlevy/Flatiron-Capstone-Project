import React, { useState } from 'react';
import {useHistory} from "react-router-dom"


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';

function AddGym({ gyms, setGyms }) {
  const[ gymAddressData, setGymAddressData] = useState("")
  const[ gymPhoneNmber, setGymPhoneNmber] = useState("")

  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault()

    const newGymObj = {
      address: gymAddressData,
      phone_number: gymPhoneNmber
    }

    fetch("/gyms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newGymObj),
    })
    .then((resp) => resp.json())
    .then((gymData) => {
      setGyms([...gyms, gymData])
      setGymAddressData("")
      setGymPhoneNmber("")
      history.push("/gyms")
    })
    .catch((error) => alert(error));
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
            value={gymAddressData}
            onChange={(e) => setGymAddressData(e.target.value)}
          />
          <Typography padding={1}>Gym Phone Nmber:</Typography>
          <TextField
            required
            id="outlined-password-input"
            label="required"
            type="integer"
            name="phone_number"
            value={gymPhoneNmber}
            onChange={(e) => setGymPhoneNmber(e.target.value)}
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