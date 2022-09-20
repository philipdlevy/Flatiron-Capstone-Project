import React from 'react'
import { useSelector, useDispatch  } from "react-redux";

import { Box } from '@mui/system'
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';

function MyTrainingAppointments() {

    // const currentUser = useSelector((state) => state.users.user) 
    // console.log(currentUser)

    const currentUser = useSelector((state) => {
        // debugger
        return state.users.user
    })
    console.log(currentUser) 

  return (
    <Box
        sx={{ m: 1}}
    >
        <Typography 
            sx={{ color: blue[800] }}
            variant="h5" 
            gutterBottom
        >
            My Training Appointments
        </Typography>
    
    </Box>
  )
}

export default MyTrainingAppointments