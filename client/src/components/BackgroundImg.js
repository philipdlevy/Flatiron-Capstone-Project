import React from 'react'

import Box from '@mui/joy/Box';
// import Card from '@mui/joy/Card';
// import CardCover from '@mui/joy/CardCover';
// import CardContent from '@mui/joy/CardContent';
// import Typography from '@mui/joy/Typography';

function BackgroundImg() {
  return (
    <Box 
    class="candles"
    style={{
    backgroundImage: `url(https://image.shutterstock.com/image-photo/within-gym-modern-fitness-equipment-600w-1471750145.jpg)`,
    backgroundSize: "cover",
    height: "100vh",
    color: "#f5f5f5"
    }}/>
  );
}

export default BackgroundImg