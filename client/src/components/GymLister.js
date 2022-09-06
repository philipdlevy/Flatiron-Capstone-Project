import React from 'react'
import GymCard from './GymCard'
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function GymLister({ gyms }) {

  const gymArray = gyms.map((gym) => {
    return <GymCard key={gym.id} gymObj={gym}/>
  })

  return (   
      <Box paddingY={2}>
        <Link to="/gyms/new">
          <Button variant="contained">Add new gym</Button>
        </Link>
        {gymArray}
      </Box>
  )
}

export default GymLister