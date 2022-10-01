import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import {useHistory, useParams} from "react-router-dom"
import { gymUpdated, fetchGyms } from '../features/gymsSlice';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  displays: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
});

function EditGymForm() {
  const [pickedObj, setPickedObj] = useState({
      address: "",
      phone_number: ""
  })
  const classes = useStyles()

  let {id} = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const gymArray = useSelector((state) => state.gyms.entities)

  useEffect(() => {
    if (!gymArray.length) {
      dispatch(fetchGyms())
    } else {
      const pickedGym = gymArray.find((gym) => gym.id == id)
      setPickedObj(pickedGym)
    }
  }, [id, gymArray, dispatch])

  function handleChange(e) {
      setPickedObj({
          ...pickedObj,
          [e.target.name]: e.target.value
      })
  }

  function handleSubmit(e) {
      e.preventDefault()

      const updatedGymObj = {
          address: pickedObj.address,
          phone_number: pickedObj.phone_number
      }
  
      fetch(`/gyms/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(updatedGymObj)
      })
      .then((resp) => resp.json())
      .then((gym) => {
        dispatch(gymUpdated(gym))
        setPickedObj({
          address: "",
          phone_number: ""
        })
        history.push("/gyms")
      })
      .catch((error) => alert(error))
    }

  return (
    <Box
      paddingY={5}
      className={classes.displays}
    >

      <Paper sx={{
        width: 350,
        height: 400
      }}
      >
        <Typography 
          sx={{paddingY: 1 }}
          className={classes.displays}
          variant='h5' 
          component="h2"         
        >
          Edit Gym
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box paddingY={1}>
            <Typography padding={1}>Gym Address:</Typography>
            <TextField
              sx={{ ml: 1, width: 333}}
              required
              id="outlined-required"
              label="Required"
              placeholder='Gym Address'
              type="text"
              name="address"
              value={pickedObj.address}
              onChange={handleChange}
            />
          </Box>

          <Box paddingY={1}>
            <Typography padding={1}>Gym Phone Nmber:</Typography>
            <TextField
              sx={{ ml: 1, width: 333}}
              required
              id="outlined-password-input"
              label="required"
              type="integer"
              name="phone_number"
              value={pickedObj.phone_number}
              onChange={handleChange}
            />
          </Box>

          <Box 
            paddingY={8}
            className={classes.displays}
          >
            <Button
              variant="contained"
              type="submit"
            >
              Submit Edited gym
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  )
}

export default EditGymForm