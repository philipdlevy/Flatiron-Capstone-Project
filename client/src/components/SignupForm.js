import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { userAdded, loginUser } from '../features/usersSlice';
import { useHistory } from 'react-router-dom';

import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';

const color = grey[800]

function SignupForm() {
  const [newUserData, setNewUserData] = useState({
    username: "",
    password: "",
    age: "",
    email: "",
    address: "",
    role_id: 3
  })

  const dispatch = useDispatch();
  const history = useHistory()

  function handleChange(e) {
    setNewUserData({
      ...newUserData,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()

    fetch("/users", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json", 
      }, 
      body: JSON.stringify(newUserData)
    })
    .then((resp) => resp.json())
    .then((user) => {
      dispatch(userAdded(user))
      dispatch(loginUser(user))
      console.log(user)
      setNewUserData({
        username: "",
        password: "",
        age: "",
        email: "",
        address: ""
      })
      history.push("/memberships/new")
    })
    .catch((error) => alert(error))  
  }

  return (
    <Box
      sx={{
        width: 400,
        height: 600,
        backgroundColor: color,
        padding: 1
      }}
    >
      <Paper sx={{
        width: 350,
        height: 600,
        ml: 3,
      }}
    >
        <Typography variant='h3' component="h2">Create Account</Typography>
        <form onSubmit={handleSubmit}>
          <Typography padding={1}>Username:</Typography>
          <TextField
              required
              id="required_outline"
              label="Required"
              placeholder='Username'
              type="text"
              name="username"
              value={newUserData.username}
              onChange={handleChange}
            />
          <Typography padding={1}>Password:</Typography>
          <TextField
              required
              id="outlined-password-input"
              label="Password"
              type="password"
              placeholder='Password'
              name="password"
              value={newUserData.password}
              onChange={handleChange}
            />
          <Typography padding={1}>Age:</Typography>
          <TextField
              required
              id="outlined-require"
              label="Required"
              placeholder='Age'
              type="number"
              name="age"
              value={newUserData.age}
              onChange={handleChange}
            />
          <Typography padding={1}>Email:</Typography>
          <TextField
              required
              id="outlined"
              label="Required"
              placeholder='Email'
              type="text"
              name="email"
              value={newUserData.email}
              onChange={handleChange}
            />
          <Typography padding={1}>Address:</Typography>
          <TextField
              required
              id="required"
              label="Required"
              placeholder='Address'
              type="text"
              name="address"
              value={newUserData.address}
              onChange={handleChange}
            />
            <Button 
              sx={{
                mt: 2
              }}
              variant="contained"
              type="submit"
            >
              Create account
            </Button>
        </form>
      </Paper>
    </Box>
  )
}

export default SignupForm