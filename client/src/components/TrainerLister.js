import React, { useEffect, useState } from "react"
import TrainerCard from './TrainerCard'
import { useSelector, useDispatch } from "react-redux";
import { fetchTrainers } from "../features/trainersSlice";
import { Link } from 'react-router-dom';
import EditTrainerForm from "./EditTrainerForm";
import { fetchGyms } from "../features/gymsSlice";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { current } from "@reduxjs/toolkit";

function TrainerLister() {
  const [editing, setEditing] = useState(false)
  const [selectedGym, setSelectedGym] = useState("")

  const trainersArray = useSelector((state) => state.trainers.entities)
  const currentUser = useSelector((state) => state.users.user) 
  console.log(currentUser)
  const getGyms = useSelector((state) => state.gyms.entities)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchGyms())
  }, [])

  useEffect(() => {
    dispatch(fetchTrainers())
  }, [dispatch])

  // Original all trainers array
  const trainerArray = trainersArray.map((trainer, index) => {
    return <TrainerCard key={index} trainerObj={trainer} />
  })

  // filtered trainers based on gym
  const filteredTrainers = trainerArray.filter((trainer) => {
    if (selectedGym == "" || selectedGym == "See all trainers") {
      return trainerArray
    } else {
      return trainer.props.trainerObj.gym.address
      == selectedGym.address
    }
   })

  //  Selecting gym for trainers
  const allGyms = getGyms.map((gym) => {
    return <MenuItem key={gym.address} value={gym}>{gym.address}</MenuItem>
  })

  function handleChange(e) {
    setSelectedGym(e.target.value)
  }

  if (editing) {
    return <EditTrainerForm />
  } else {
    return (
      <div>
        <Box padding={2}>
          {currentUser.role && currentUser.role.name === "Admin" ?
            <Link to="/trainers/new" style={{ textDecoration: 'none' }}>
              <Button variant="contained">Add new trainer</Button>
            </Link>
          : null}
        </Box>

        <Box 
          sx={{ 
            width: 250, 
            bgcolor: "white",
            ml: 48
          }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select your gym location</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedGym}
              label="Gym"
              onChange={handleChange}
            >
              <MenuItem value="See all trainers">See all trainers</MenuItem>
              {allGyms}
            </Select>
          </FormControl>
        </Box>
        
        <Container>
          <Grid container spacing={2} paddingY={1}>
            {filteredTrainers}
          </Grid>
        </Container>
        
      </div>
    )
  }
}

export default TrainerLister