import React from 'react'

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

function GymCard({ gymObj }) {

    return (
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Levy's LiftHouse
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Phone number: {gymObj.phone_number}
            </Typography>
            <Typography variant="body2">
                Address: {gymObj.address}
            </Typography>
          </CardContent>
        </Card>
      );
}

export default GymCard