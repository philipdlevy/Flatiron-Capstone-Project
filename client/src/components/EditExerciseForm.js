import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import {useHistory, useParams} from "react-router-dom"
import { exerciseUpdated, fetchExercises } from '../features/exercisesSlice';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import TextareaAutosize from '@mui/material/TextareaAutosize';

function EditExerciseForm() {
    const [pickedObj, setPickedObj] = useState({
        name: "",
        info: "",
        image_url: ""
    })

    let {id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const exercisesArray = useSelector((state) => state.exercises.entities)

    useEffect(() => {
      if (!exercisesArray.length) {
        dispatch(fetchExercises())
      } else {
        const pickedExercise = exercisesArray.find((exercise) => exercise.id == id)
        setPickedObj(pickedExercise)
      }
    }, [id, exercisesArray, dispatch])
    

    function handleChange(e) {
        setPickedObj({
            ...pickedObj,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()

        const updatedExerciseObj = {
            name: pickedObj.name,
            info: pickedObj.info,
            image_url: pickedObj.image_url
        }
    
        fetch(`/exercises/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json", 
          },
          body: JSON.stringify(updatedExerciseObj)
        })
        .then((resp) => {
          if (resp.ok) {
            dispatch(exerciseUpdated(updatedExerciseObj))
            setPickedObj({
                name: "",
                info: "",
                image_url: ""
            })
            history.push("/exercises")
          }
        })
        .catch((error) => alert(error))
      }
    
    return (
      // <div>
      //   <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", width:"500px", margin:"auto"}}>
      //       <label><strong>name</strong></label>
      //       <input 
      //       value={pickedObj.name}
      //       type="text" 
      //       name="name"
      //       onChange={handleChange}
      //       /><br/>
      //       <label><strong>image</strong></label>
      //       <input 
      //       value={pickedObj.image_url}
      //       type="text" 
      //       name="image_url"
      //       onChange={handleChange}
      //       /><br/>
      //       <label><strong>info</strong></label>
      //       <textarea 
      //       value={pickedObj.info}
      //       type="text" 
      //       name="info"
      //       onChange={handleChange}
      //       /><br/>
      //       <input type="submit"></input>
      //   </form>
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
            Edit Exercise
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
              value={pickedObj.name}
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
              value={pickedObj.image_url}
              onChange={handleChange}
            />
            <Typography padding={1}>How To Perform:</Typography>
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
                value={pickedObj.info}
                onChange={handleChange}
                style={{ width: 328 }}
              />
            </Box>


            <Box 
              paddingY={4}
              display="flex"
              alignItems="center"
              justifyContent="center"  
            >
              <Button
                sx={{ width: 300}}
                variant="contained"
                type="submit"
              >
                Submit Edited Exercise
              </Button>
            </Box>
          </form>

        </Paper>
      </Box>
    );
  }

export default EditExerciseForm
