import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import ExerciseCard from './ExerciseCard'
import { useSelector, useDispatch } from "react-redux";
import { fetchExercises } from '../features/exercisesSlice';

import Button from '@mui/material/Button';

function ExerciseLister() {

  const exercisesArray = useSelector((state) => state.exercises.entities)
  console.log(exercisesArray)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchExercises())
  }, [dispatch])

  const displayedExercises = exercisesArray.map((exercise, index) => {
    return <ExerciseCard key={index} exerciseObj={exercise} />
  })

  return (
    <div>
      <Link to="exercises/new">
        <Button variant="contained">Add New Exercise</Button>
      </Link>
      {displayedExercises}
    </div>
  )
}

export default ExerciseLister