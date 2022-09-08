import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";


import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  
  const dispatch = useDispatch()
  const history = useHistory()

  const color = grey[800]

  // function handleSubmit(e) {
  //   e.preventDefault()

  //   fetch("/login", {
  //     method: "POST", 
  //     headers: {
  //         "Content-Type": "application/json", 
  //     }, 
  //     body: JSON.stringify({username, password})
  //   })
  //   .then((resp) => resp.json())
  //   .then(())
  //   .catch((error) => alert(error))
  // }

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
          {/* <input type="submit"/> */}
          <Box>
            <Button 
              variant="contained"
              type="submit"
              >
                Sign in
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  )
}

export default Login