import React from 'react'

import ExerciseCard from './ExerciseCard'

function ExerciseLister({ exercises }) {
  console.log(exercises)

  const exercisesArray = exercises.map((exercise) => {
    return <ExerciseCard key={exercise.id} exerciseObj={exercise} />
  })

  return (
    <div>
      {exercisesArray}
    </div>
  )
}

export default ExerciseLister