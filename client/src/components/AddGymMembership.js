import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchMemberships } from '../features/membershipsSlice';
import {useHistory} from "react-router-dom"
import { fetchGyms } from '../features/gymsSlice';

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


const memberships = ["Monthly Membership", "Yearly Membership"]

function AddGymMembership() {
  const [membershipData, setMembershipData] = useState("")
  const [priceData, setPriceData] = useState("")
  const [gymData, setGymData] = useState("")

  const dispatch = useDispatch()

  const gymArray = useSelector((state) => state.gyms.entities)

  useEffect(() => {
    dispatch(fetchGyms())
  }, [dispatch])

  const gymsList = gymArray.map((gym, index) => {
    return <MenuItem key={index} value={gym}>{gym.address}</MenuItem>
  })

  const membershipMenuList = memberships.map((membership) => {
    return <MenuItem key={membership} value={membership}>{membership}</MenuItem>
  })

  
  const handleMembershipChange = (event) => {
    setMembershipData(event.target.value);
    console.log(membershipData)
    if (membershipData == "Monthly Membership") {
      setPriceData(39.99)
    } else if (membershipData == "Yearly Membership") {
      setPriceData(400.00)
    } else {
      setPriceData("")
    }
  };

  const handlePriceChange = (event) => {
    setPriceData(event.target.value);
  };
  const handleGymChange = (event) => {
    setGymData(event.target.value);
  };

  return (
    <Box>
      <Paper sx={{
        width: 350,
        height: 450,
        ml: 3,
      }}
      > 
        <form >
        <Box sx={{ minWidth: 120 }}>
            <Typography padding={1}>Select Membership:</Typography>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="select-labels">Membership</InputLabel>
              <Select
                labelId="select-labels"
                id="simple-select"
                label="Membership"
                onChange={handleMembershipChange}
                value={membershipData}
              >
                {membershipMenuList}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ minWidth: 120 }}>
            <Typography padding={1}>Price:</Typography>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="select-label"></InputLabel>
              <TextField
                id="outlined-read-only-input"
                label="Read Only"
                value={priceData}
                InputProps={{
                  readOnly: true,
                }}
              />
            </FormControl>
          </Box>

          <Box sx={{ minWidth: 120 }}>
            <Typography padding={1}>Select Gym:</Typography>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="select-label">Gym</InputLabel>
              <Select
                labelId="select-label"
                id="simple-select"
                value={gymData}
                label="Gym"
                onChange={handleGymChange}
              >
                {gymsList}
              </Select>
            </FormControl>
          </Box>

          <Box paddingY={3}>
            <Button
              variant="contained"
              type="submit"
            >
              Purchase Membership
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  )
}

export default AddGymMembership