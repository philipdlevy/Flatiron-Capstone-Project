import React from 'react'
import { gymRemoved } from "../features/gymsSlice";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


function GymCard({ gymObj }) {
  const {id, address, phone_number} = gymObj

  const dispatch = useDispatch()

  function handleDelete(id) {
    console.log(id)
    fetch(`/gyms/${id}`, {
      method: "DELETE"
    })
    .then(() => {
      dispatch(gymRemoved(gymObj.id))
    })
    .catch((error) => alert(error))
  }

  return (
    <Box padding={1}>
      <Card sx={{ minWidth: 275, borderBottom: 1}}>
        <CardContent>
          <Typography variant="h5" component="div">
            Levy's LiftHouse
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Phone number: {phone_number}
          </Typography>
          <Typography variant="body2">
              Address: {address}
          </Typography>
        </CardContent>
        <Button 
          variant='contained' 
          size='small'
          onClick={() => handleDelete(gymObj.id)}
        > 
          Delete Gym
        </Button>
        <Link to={`/gyms/${id}`} style={{ textDecoration: 'none'}}>
          <Button variant='contained' size='small'> Edit Gym</Button>
        </Link>
      </Card>
    </Box>
  );
}

export default GymCard