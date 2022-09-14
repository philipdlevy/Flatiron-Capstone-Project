import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import {useHistory, useParams} from "react-router-dom"
import { exerciseUpdated, fetchExercises } from '../features/exercisesSlice';

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
      <div>
        <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", width:"500px", margin:"auto"}}>
            <label><strong>name</strong></label>
            <input 
            value={pickedObj.name}
            type="text" 
            name="name"
            onChange={handleChange}
            /><br/>
            <label><strong>image</strong></label>
            <input 
            value={pickedObj.image_url}
            type="text" 
            name="image_url"
            onChange={handleChange}
            /><br/>
            <label><strong>info</strong></label>
            <textarea 
            value={pickedObj.info}
            type="text" 
            name="info"
            onChange={handleChange}
            /><br/>
            <input type="submit"></input>
        </form>
      </div>
    );
  }

export default EditExerciseForm
