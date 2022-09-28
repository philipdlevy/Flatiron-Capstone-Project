import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import {useHistory, useParams} from "react-router-dom"
import { trainerUpdated } from '../features/trainersSlice';
import { fetchTrainers } from "../features/trainersSlice"

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function EditTrainerForm() {
    const [pickedObj, setPickedObj] = useState({
        name: "",
        bio: "",
        email: "",
        gym_id: ""
    })

    let {id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();


    const trainerArray = useSelector((state) => state.trainers.entities)

    useEffect(() => {
        if (!trainerArray.length) {
            dispatch(fetchTrainers())
        } else {
            const pickedTrainer = trainerArray.find((trainer) => trainer.id == id)
            setPickedObj(pickedTrainer)
            console.log(pickedTrainer)
        }
    }, [id, trainerArray, dispatch])

    function handleChange(e) {
        setPickedObj({
            ...pickedObj,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()

        const updatedTrainerObj = {
            name: pickedObj.name,
            bio: pickedObj.bio,
            email: pickedObj.email,
            gym_id: pickedObj.gym.id
        }
    
        fetch(`/trainers/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json", 
          },
          body: JSON.stringify(updatedTrainerObj)
        })
        .then((resp) => {
          if (resp.ok) {
            dispatch(trainerUpdated(updatedTrainerObj))
            setPickedObj({
                name: "",
                bio: "",
                email: "",
                gym_id: ""
            })
            history.push("/trainers")
          }
        })
        .catch((error) => alert(error))
      }

  return (
    // <div>
    //     <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", width:"500px", margin:"auto"}}>
    //         <label><strong>Name</strong></label>
    //         <input 
    //         value={pickedObj.name}
    //         type="text" 
    //         name="name"
    //         onChange={handleChange}
    //         /><br/>
    //         <label><strong>Bio</strong></label>
    //         <input 
    //         value={pickedObj.bio}
    //         type="text" 
    //         name="bio"
    //         onChange={handleChange}
    //         /><br/>
    //         <label><strong>Email</strong></label>
    //         <input 
    //         value={pickedObj.email}
    //         type="text" 
    //         name="email"
    //         onChange={handleChange}
    //         /><br/>
    //         <input type="submit"></input>
    //     </form>
    // </div>

    <Box 
      paddingY={5}
      display="flex"
      alignItems="center"
      justifyContent="center"
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
          display="flex"
          alignItems="center"
          justifyContent="center"
        >            
          Edit Trainer
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
            value={pickedObj.name}
            onChange={handleChange}
          />
          <Typography padding={1}>Bio:</Typography>
          <TextField
            sx={{ ml: 1, width: 333}}
            required
            id="outlined-password-input"
            label="required"
            type="text"
            name="bio"
            value={pickedObj.bio}
            onChange={handleChange}
          />
          <Typography padding={1}>Email:</Typography>
          <TextField
            sx={{ ml: 1, width: 333}}
            required
            id="outlined-password-input"
            label="required"
            type="text"
            name="email"
            value={pickedObj.email}
            onChange={handleChange}
          />
          <Box 
            paddingY={12}
            display="flex"
            alignItems="center"
            justifyContent="center"  
          >
            <Button
              sx={{ width: 300}}
              variant="contained"
              type="submit"
            >
              Submit Edited Trainer
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  )
}

export default EditTrainerForm