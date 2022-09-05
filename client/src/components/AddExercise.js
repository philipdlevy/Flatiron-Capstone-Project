import React, { useState } from 'react'
import {useHistory} from "react-router-dom"

function AddExercise({ exercises, setExercises }) {
  const [nameData, setNameData] = useState("")
  const [image_urlData, setImage_urlData] = useState("")
  const [infoData, setInfoData] = useState("")

  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault();

    const newExerciseObj = {
      name: nameData,
      image_url: image_urlData,
      info: infoData
    }

    fetch("/exercises", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify(newExerciseObj), 
    })
    .then((resp) => resp.json())
    .then((exerciseData) => {
      setExercises([...exercises, exerciseData])
      history.push("/exercises")
      setNameData("")
      setImage_urlData("")
      setInfoData("")
    })
    .catch((error) => alert(error));
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", width:"500px", margin:"auto"}}>
        <label><strong>name</strong></label>
        <input 
        value={nameData}
        type="text" 
        name="title"
        onChange={(e) => setNameData(e.target.value)}
        /><br/>
        <label><strong>image</strong></label>
        <input 
        value={image_urlData}
        type="text" 
        name="image_url"
        onChange={(e) => setImage_urlData(e.target.value)}
        /><br/>
        <label><strong>info</strong></label>
        <textarea 
        value={infoData}
        type="text" 
        name="info"
        onChange={(e) => setInfoData(e.target.value)}
        /><br/>
        <input type="submit"></input>
      </form>
    </div>
  );
}

export default AddExercise