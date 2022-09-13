import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import ExerciseCard from './ExerciseCard'
import { useSelector, useDispatch } from "react-redux";
import { fetchExercises } from '../features/exercisesSlice';
import EditExerciseForm from "./EditExerciseForm"

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function ExerciseLister() {
  const [editing, setEditing] = useState(false)

  const exercisesArray = useSelector((state) => state.exercises.entities)
  console.log(exercisesArray)

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
      <Box paddingY={2}>
        <Link to="exercises/new">
          <Button variant="contained">Add New Exercise</Button>
        </Link>
        {displayedExercises}
      </Box>
    )
  }
}

export default ExerciseLister