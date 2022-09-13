import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import {useHistory, useParams} from "react-router-dom"
import { trainerUpdated } from '../features/trainersSlice';

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
        const pickedTrainer = trainerArray.find((trainer) => trainer.id == id)
        setPickedObj(pickedTrainer)
        console.log(pickedTrainer)
    }, [id, trainerArray])

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
    <div>
        <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", width:"500px", margin:"auto"}}>
            <label><strong>Name</strong></label>
            <input 
            value={pickedObj.name}
            type="text" 
            name="name"
            onChange={handleChange}
            /><br/>
            <label><strong>Bio</strong></label>
            <input 
            value={pickedObj.bio}
            type="text" 
            name="bio"
            onChange={handleChange}
            /><br/>
            <label><strong>Email</strong></label>
            <input 
            value={pickedObj.email}
            type="text" 
            name="email"
            onChange={handleChange}
            /><br/>
            <input type="submit"></input>
        </form>
    </div>
  )
}

export default EditTrainerForm