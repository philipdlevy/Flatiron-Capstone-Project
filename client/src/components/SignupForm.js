import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { userAdded, fetchUsers } from '../features/usersSlice';


import Box from '@mui/material/Box';
import { blue, grey } from '@mui/material/colors';
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
            body: JSON.stringify(
                newUserData
            )
        }).then((resp) => {
            if (resp.ok) {
                dispatch(userAdded(newUserData))
                setNewUserData({
                    username: "",
                    password: "",
                    age: "",
                    email: "",
                    address: ""
                })
            }
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
                id="outlined-required"
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
                id="outlined-required"
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
                id="outlined-required"
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
                id="outlined-required"
                label="Required"
                placeholder='Address'
                type="text"
                name="address"
                value={newUserData.address}
                onChange={handleChange}
              />
            <Button 
                variant="contained"
                type="submit"
                // onSubmit={(e) => handleSubmit(e)}
                >
                Create account
            </Button>
            {/* <input type="submit" /> */}
          </form>
        </Paper>
      </Box>
    )
}

export default SignupForm