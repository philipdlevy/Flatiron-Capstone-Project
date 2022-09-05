import React from 'react'
import { Link } from 'react-router-dom';
import ExerciseCard from './ExerciseCard'

import Button from '@mui/material/Button';

function ExerciseLister({ exercises }) {


  const exercisesArray = exercises.map((exercise) => {
    return <ExerciseCard key={exercise.id} exerciseObj={exercise} />
  })

  return (
    <div>
      <Link to="exercises/new">
        <Button variant="contained">Add New Exercise</Button>
      </Link>
      {exercisesArray}
    </div>
  )
}

export default ExerciseLister