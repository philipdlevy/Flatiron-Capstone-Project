import React from 'react'

import GymCard from './GymCard'

function GymLister({ gyms }) {

  const gymArray = gyms.map((gym) => {
    return <GymCard key={gym.id} gymObj={gym}/>
  })

  return (
    <div>
      {gymArray}
    </div>
  )
}

export default GymLister