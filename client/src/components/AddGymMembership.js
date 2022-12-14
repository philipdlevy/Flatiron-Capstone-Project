import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from "react-router-dom"
import { fetchGyms } from '../features/gymsSlice';
import { fetchUser } from '../features/usersSlice';
import { userAddMembership } from '../features/usersSlice';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const memberships = ["Monthly Membership", "Yearly Membership"]

function AddGymMembership() {
  const [allMemberships, setAllMemberships] = useState("")
  const [membershipTypeData, setMembershipTypeData] = useState("")
  const [priceData, setPriceData] = useState("")
  const [gymData, setGymData] = useState("")

  const dispatch = useDispatch()
  const history = useHistory()

  const gymArray = useSelector((state) => state.gyms.entities)
  const currentUser = useSelector((state) => state.users.user)
  

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchGyms())
  }, [dispatch])

  useEffect(() => {
    fetch("/gym_memberships")
    .then((resp) => resp.json())
    .then((memberships) => {
      setAllMemberships(memberships)
    })
    .catch((error) => alert(error))
  }, [])

  const gymsList = gymArray.map((gym, index) => {
    return <MenuItem key={index} value={gym}>{gym.address}</MenuItem>
  })

  const membershipMenuList = memberships.map((membership) => {
    return <MenuItem key={membership} value={membership}>{membership}</MenuItem>
  })

  
  const handleMembershipChange = (event) => {
    setMembershipTypeData(event.target.value);
  };

  useEffect(() => {
    if (membershipTypeData === "Monthly Membership") {
      setPriceData(39.99)
    } else if (membershipTypeData === "Yearly Membership") {
      setPriceData(400.00)
    } else {
      setPriceData("")
    }
  }, [membershipTypeData, priceData])
  
  const handleGymChange = (event) => {
    setGymData(event.target.value);
  };


  function handleSubmit(e) {
    e.preventDefault()

    const newMembership = {
      membershipType: membershipTypeData,
      price: priceData,
      user_id: currentUser.id,
      gym_id: gymData.id
    }

    fetch("/gym_memberships", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(newMembership)
    })
    .then((resp) => resp.json())
    .then((membershipData) => {
      setAllMemberships([...allMemberships, membershipData])
      dispatch(userAddMembership(membershipData))
      setGymData("")
      setMembershipTypeData("")
      setPriceData("")
      history.push("/")
    })
    .catch((error) => alert(error))
  }

  return (
    <Box>
      
      <Box
        paddingY={5}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        
        <Paper sx={{
          width: 340,
          height: 410
        }}
        > 
          <form onSubmit={handleSubmit}>
          <Box sx={{ minWidth: 120 }}>
              <Typography padding={1}>Select Membership:</Typography>
              <FormControl sx={{ m: 1, width: 323 }}>
                <InputLabel id="select-labels"
                >Membership</InputLabel>
                <Select
                  required
                  id="outlined-required"
                  label="Required"
                  labelId="select-labels"
                  onChange={handleMembershipChange}
                  value={membershipTypeData}
                >
                  {membershipMenuList}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ minWidth: 120 }}>
              <Typography padding={1}>Price:</Typography>
              <FormControl sx={{ m: 1, width: 323 }}>
                <InputLabel id="select-label"></InputLabel>
                <TextField
                  id="outlined-read-only-input"
                  label="Price"
                  value={priceData}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </FormControl>
            </Box>

            <Box sx={{ minWidth: 120 }}>
              <Typography padding={1}>Select Gym:</Typography>
              <FormControl sx={{ m: 1, width: 323 }}>
                <InputLabel id="select-label">Gym</InputLabel>
                <Select
                  required
                  id="outlined-required"
                  label="Required"
                  labelId="select-label"
                  value={gymData}
                  // label="Gym"
                  onChange={handleGymChange}
                >
                  {gymsList}
                </Select>
              </FormControl>
            </Box>

            <Box paddingY={3}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
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
    </Box>
  )
}

export default AddGymMembership