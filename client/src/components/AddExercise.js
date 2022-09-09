import React, { useState } from 'react'
import {useHistory} from "react-router-dom"
import { useDispatch } from 'react-redux';
import { exerciseAdded } from '../features/exercisesSlice';

function AddExercise() {
  const [newExerciseData, setNewExerciseData] = useState({
    name: "",
    info: "", 
    image_url: ""
  })

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
    <div>
      <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", width:"500px", margin:"auto"}}>
        <label><strong>name</strong></label>
        <input 
        value={newExerciseData.name}
        type="text" 
        name="name"
        onChange={handleChange}
        /><br/>
        <label><strong>image</strong></label>
        <input 
        value={newExerciseData.image_url}
        type="text" 
        name="image_url"
        onChange={handleChange}
        /><br/>
        <label><strong>info</strong></label>
        <textarea 
        value={newExerciseData.info}
        type="text" 
        name="info"
        onChange={handleChange}
        /><br/>
        <input type="submit"></input>
      </form>
    </div>
  );
}

export default AddExercise