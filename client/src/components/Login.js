import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { loginUser } from '../features/usersSlice';

import Box from '@mui/material/Box';
// import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';

// const color = grey[800]

function Login() {
  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  })
  
  const dispatch = useDispatch()
  const history = useHistory()


  function handleChange(e) {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()

    fetch("/login", {
      method: "POST", 
      headers: {
          "Content-Type": "application/json", 
      }, 
      body: JSON.stringify(loginData)
    })
    .then((resp) => resp.json())
    .then((user) => {
      console.log(user)
      dispatch(loginUser(user))
      setLoginData({
        username: "",
        password: ""
      })
      history.push("/")
    })
    .catch((error) => alert(error))
  }

  return (
    <Box
      paddingY={5}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Paper sx={{
        width: 350,
        height: 320
      }}
    >
        <Typography 
          variant='h3' 
          component="h2"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          Sign In
        </Typography>

        <form onSubmit={handleSubmit}>
          <Typography padding={1}>Username:</Typography>
          <Box sx={{ ml: 1 }}>
            <TextField
              sx={{width: 333 }}
              required
              id="outlined-required"
              label="Required"
              placeholder='Username'
              name="username"
              value={loginData.username}
              onChange={handleChange}
            />
          </Box>

          <Typography padding={1}>Password:</Typography>
          <Box sx={{ ml: 1 }}>
            <TextField
              sx={{width: 333 }}
              required
              id="outlined-password-input"
              label="Password"
              placeholder='Password'
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
            />
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Button 
              sx={{
                mt: 2, 
                width: "300px"
              }}
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