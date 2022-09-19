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
          <Link to="/trainers/new">
            <Button variant="contained">Add new trainer</Button>
          </Link>
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