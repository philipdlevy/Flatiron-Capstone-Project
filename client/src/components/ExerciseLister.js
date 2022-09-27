import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import ExerciseCard from './ExerciseCard'
import { useSelector, useDispatch } from "react-redux";
import { fetchExercises } from '../features/exercisesSlice';
import EditExerciseForm from "./EditExerciseForm"

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

function ExerciseLister() {
  const currentUser = useSelector((state) => state.users.user)
  const [editing, setEditing] = useState(false)

  const exercisesArray = useSelector((state) => state.exercises.entities)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchExercises())
  }, [dispatch])

  const displayedExercises = exercisesArray.map((exercise, index) => {
    return <ExerciseCard key={index} exerciseObj={exercise} />
  })

  if (editing) {
    return <EditExerciseForm />
  } else {
    return (
      <div>

        <Box padding={2}>
          {currentUser.role && currentUser.role.name === "admin" ?
            <Link to="exercises/new" style={{ textDecoration: 'none'}}>
              <Button variant="contained">Add New Exercise</Button>
            </Link>
          : null}
        </Box>

        <Container>
          <Grid container spacing={2} paddingY={1}>
            {displayedExercises}
          </Grid>
        </Container>
        
      </div>
    )
  }
}

export default ExerciseLister