import React, { useEffect, useState } from "react"
import TrainerCard from './TrainerCard'
import { useSelector, useDispatch } from "react-redux";
import { fetchTrainers } from "../features/trainersSlice";
import { Link } from 'react-router-dom';
import EditTrainerForm from "./EditTrainerForm";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

function TrainerLister() {
  const [editing, setEditing] = useState(false)
  
  const trainersArray = useSelector((state) => state.trainers.entities)
  const currentUser = useSelector((state) => state.users.user) 
  console.log(currentUser)


  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTrainers())
  }, [dispatch])

  const trainerArray = trainersArray.map((trainer, index) => {
    return <TrainerCard key={index} trainerObj={trainer} />
  })

  if (editing) {
    return <EditTrainerForm />
  } else {
    return (
      <div>

        <Box paddingY={2}>
          {currentUser.role.name === "admin" ?
            <Link to="/trainers/new" style={{ textDecoration: 'none'}}>
              <Button variant="contained">Add new trainer</Button>
            </Link>
          : null}
        </Box>
        
        <Container>
          <Grid container spacing={2} paddingY={1}>
            {trainerArray}
          </Grid>
        </Container>
        
      </div>
    )
  }
}

export default TrainerLister