import React, { useState } from 'react'
import {useHistory} from "react-router-dom"
import { useDispatch } from 'react-redux';
import { exerciseAdded } from '../features/exercisesSlice';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  displays: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
});

function AddExercise() {
  const [newExerciseData, setNewExerciseData] = useState({
    name: "",
    info: "", 
    image_url: ""
  })
  const classes = useStyles()

  const history = useHistory()
  const dispatch = useDispatch()

  function handleChange(e) {
    setNewExerciseData({
      ...newExerciseData,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("/exercises", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify(newExerciseData), 
    })
    .then((resp) => {
      if (resp.ok) {
        dispatch(exerciseAdded(newExerciseData))
        setNewExerciseData({
          name: "",
          info: "",
          image_url: ""
        })
        history.push("/exercises")
      }
    })
    .catch((error) => alert(error));
  }
  
  return (
    <Box
      paddingY={5}
      className={classes.displays}
    >

      <Paper sx={{
        width: 350,
        height: 500
      }}
      >

        <Typography 
          sx={{ paddingY: 1}}
          variant='h5' 
          component="h2"
          className={classes.displays}
        >            
          Add New Exercise
        </Typography>

        <form onSubmit={handleSubmit}>
          <Typography padding={1}>Exercise Name:</Typography>
          <TextField
            sx={{ ml: 1, width: 333}}
            required
            id="outlined-required"
            label="Required"
            placeholder='name'
            type="text"
            name="name"
            value={newExerciseData.name}
            onChange={handleChange}
          />
          <Typography padding={1}>Image URL:</Typography>
          <TextField
            sx={{ ml: 1, width: 333}}
            required
            id="outlined-password-input"
            label="required"
            type="text"
            name="image_url"
            value={newExerciseData.image_url}
            onChange={handleChange}
          />
          <Typography padding={1}>How To Perform:</Typography>
          {/* <TextField
            sx={{ ml: 1, width: 333}}
            required
            id="outlined-password-input"
            label="required"
            type="text"
            name="info"
            value={newExerciseData.info}
            onChange={handleChange}
          /> */}
          <Box
            sx={{ ml: 1}}
          >
            <TextareaAutosize
              // sx={{ ml: 1, width: 333}}
              required
              id="outlined-password-input"
              label="required"
              type="text"
              name="info"
              minRows={8}
              value={newExerciseData.info}
              onChange={handleChange}
              style={{ width: 328 }}
            />
          </Box>


          <Box 
            paddingY={4}
            className={classes.displays} 
          >
            <Button
              sx={{ width: 300}}
              variant="contained"
              type="submit"
            >
              Submit Exercise
            </Button>
          </Box>
        </form>

      </Paper>
    </Box>
  );
}

export default AddExercise