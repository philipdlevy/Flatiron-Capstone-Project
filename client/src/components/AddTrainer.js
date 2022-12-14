import React, { useState, useEffect } from 'react';
import {useHistory} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { trainerAdded } from '../features/trainersSlice';
import { fetchGyms } from '../features/gymsSlice';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { makeStyles } from '@mui/styles';
import Alert from '@mui/material/Alert';

const useStyles = makeStyles({
  displays: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
});

function AddTrainer() {
  const [nameData, setNameData] = useState("")
  const [bioData, setBioData] = useState("");
  const [emailData, setEmailData] = useState("")
  const [gymData, setGymData] = useState("")
  const [imageData, setImageData] = useState("")
  const classes = useStyles()

  const gymArray = useSelector((state) => state.gyms.entities)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(fetchGyms())
  }, [dispatch])

  const gyms = gymArray.map((gym) => {
    return <MenuItem key={gym.id} value={gym}>{gym.address}</MenuItem>
  })

  const handleNameChange = (event) => {
    setNameData(event.target.value);
  };
  const handleBioChange = (event) => {
    setBioData(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmailData(event.target.value);
  };
  const handleGymChange = (event) => {
    setGymData(event.target.value);
  };
  const handleImageChange = (event) => {
    setImageData(event.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault()

    const newTrainer = {
      name: nameData,
      bio: bioData,
      email: emailData,
      image_url: imageData,
      gym_id: gymData.id
    }

    fetch("/trainers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(newTrainer)
    })
    .then((resp) => resp.json())
    .then((trainer) => {
      if (trainer.error) {
        return document.getElementById("error-alert2").hidden = false
      }
      dispatch(trainerAdded(newTrainer))
      setNameData("")
      setBioData("")
      setEmailData("")
      setGymData("")
      setImageData("")
      history.push("/trainers")
    })
    .catch((error) => alert(error))
  }

  return (
    <Box>
      <Box id="error-alert2" hidden>
        <Alert severity="error">Email already exists, please use another.</Alert>
      </Box>

      <Box 
        paddingY={5}
        className={classes.displays}
      >
        <Paper sx={{
          width: 350,
          height: 600
        }}
        >
          <Typography 
            sx={{ paddingY: 1}}
            variant='h5' 
            component="h2"
            className={classes.displays}
          >            
            Add New Trainer
          </Typography>

          <form onSubmit={handleSubmit}>
            <Typography padding={1}>Name:</Typography>
            <TextField
              sx={{ ml: 1, width: 333}}
              required
              id="outlined-required"
              label="Required"
              placeholder='name'
              type="text"
              name="name"
              value={nameData}
              onChange={handleNameChange}
            />
            <Typography padding={1}>Bio: 100-250 characters</Typography>
            <TextField
              inputProps={{ minLength: 100, maxLength: 250 }}
              sx={{ ml: 1, width: 333}}
              required
              id="outlined-password-input"
              label="required"
              type="text"
              name="bio"
              value={bioData}
              onChange={handleBioChange}
            />
            <Typography padding={1}>Email:</Typography>
            <TextField
              sx={{ ml: 1, width: 333}}
              required
              id="outlined-password-input"
              label="required"
              type="text"
              name="email"
              value={emailData}
              onChange={handleEmailChange}
            />

            <Typography padding={1}>Image_url:</Typography>
            <TextField
              sx={{ ml: 1, width: 333}}
              required
              id="image_url"
              label="required"
              type="text"
              name="image_url"
              value={imageData}
              onChange={handleImageChange}
            />

            <Typography sx={{ padding: 1}}>Select Gym:</Typography>
            <Box sx={{ minWidth: 120 }}>
              <FormControl sx={{ ml: 1, width: 333 }}>
                <InputLabel id="select-label">Gym</InputLabel>
                <Select
                  required
                  labelId="select-label"
                  id="demo-simple-select"
                  value={gymData}
                  label="gym"
                  onChange={handleGymChange}
                >
                  {gyms}
                </Select>
              </FormControl>
            </Box>

            <Box 
              paddingY={2}
              className={classes.displays}  
            >
              <Button
                sx={{ width: 300}}
                variant="contained"
                type="submit"
              >
                Submit New Trainer
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Box>
  )
}

export default AddTrainer




