import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { userAdded, loginUser } from '../features/usersSlice';
import { useHistory } from 'react-router-dom';
import { fetchUser } from '../features/usersSlice';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';


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

  const usersArray = useSelector((state) => state.users.entities)
  console.log(usersArray)

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
      if (!user.gym_membership) {
        user.gym_membership = {
          gym: {}
        }
      }
      dispatch(userAdded(user))
      console.log(user)
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

  const duplicateUsernameError = usersArray.filter(user => {
    return user.username === newUserData.username
  })
  console.log(duplicateUsernameError)
  
  
  return (
    <Box>
      {duplicateUsernameError && duplicateUsernameError != "" ? <Alert severity="error">That username already exists, please choose another. </Alert> : null}

      <Box
        paddingY={5}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >

        <Paper sx={{
          width: 400,
          height: 600
        }}
        >
          <Typography 
            variant='h3' 
            component="h2"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            Create Account
          </Typography>
          <form onSubmit={handleSubmit}>

            <Typography padding={1}>Username:</Typography>
            <Box sx={{ ml: 1 }}>
              <TextField
                sx={{width: 383 }}
                required
                id="required_outline"
                label="Required"
                placeholder='Username'
                type="text"
                name="username"
                value={newUserData.username}
                onChange={handleChange}
              />
            </Box>

            <Typography padding={1}>Password:</Typography>
            <Box sx={{ ml: 1 }}>
              <TextField
                sx={{width: 383 }}
                required
                id="outlined-password-input"
                label="Password"
                type="password"
                placeholder='Password'
                name="password"
                value={newUserData.password}
                onChange={handleChange}
              />
            </Box>

            <Typography padding={1}>Age:</Typography>
            <Box sx={{ ml: 1 }}>
              <TextField
                sx={{width: 383 }}
                required
                id="outlined-require"
                label="Required"
                placeholder='Age'
                type="number"
                name="age"
                value={newUserData.age}
                onChange={handleChange}
              />
            </Box>

            <Typography padding={1}>Email:</Typography>
            <Box sx={{ ml: 1 }}>
              <TextField
                sx={{width: 383 }}
                required
                id="outlined"
                label="Required"
                placeholder='Email'
                type="text"
                name="email"
                value={newUserData.email}
                onChange={handleChange}
              />
            </Box>

            <Typography padding={1}>Address:</Typography>
            <Box sx={{ ml: 1 }}>
              <TextField
                sx={{width: 383 }}
                required
                id="required"
                label="Required"
                placeholder='Address'
                type="text"
                name="address"
                value={newUserData.address}
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
                  Create account
                </Button>
              </Box>
          </form>
        </Paper>
      </Box>
    </Box>
  )
}

export default SignupForm