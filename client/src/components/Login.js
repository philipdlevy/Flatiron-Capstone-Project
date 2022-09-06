import React from 'react'

// import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { blue, grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';

function Login() {
  // const color = blue[900]
  const color = grey[800]

  return (
    <Box
      sx={{
        width: 400,
        height: 450,
        backgroundColor: color,
        padding: 1
      }}
    >
      <Paper sx={{
        width: 350,
        height: 450,
        ml: 3,
      }}
    >
        <Typography variant='h3' component="h2">Sign In</Typography>
        <form>
          <Typography padding={1}>Username:</Typography>
          <TextField
              required
              id="outlined-required"
              label="Required"
              placeholder='Username'
            />
          <Typography padding={1}>Password:</Typography>
          <TextField
              required
              id="outlined-password-input"
              label="Password"
              type="password"
            />
          <input type="submit"/>
        </form>
      </Paper>
    </Box>
  )
}

export default Login