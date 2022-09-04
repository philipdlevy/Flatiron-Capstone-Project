import React from 'react'
import TrainerCard from './TrainerCard'




function TrainerLister({ trainers }) {

  const trainerArray = trainers.map((trainer) => {
    return <TrainerCard key={trainer.id} trainerObj={trainer} />
  })

  return (
    <div>
      {trainerArray}
    </div>
  )
}

export default TrainerLister