import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import {useHistory, useParams} from "react-router-dom"
import { gymUpdated, fetchGyms } from '../features/gymsSlice';


function EditGymForm() {
    const [pickedObj, setPickedObj] = useState({
        address: "",
        phone_number: ""
    })

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
        .then((resp) => {
          if (resp.ok) {
            dispatch(gymUpdated(updatedGymObj))
            setPickedObj({
                address: "",
                phone_number: ""
            })
            history.push("/gyms")
          }
        })
        .catch((error) => alert(error))
      }

  return (
    <div>
        <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", width:"500px", margin:"auto"}}>
            <label><strong>Address</strong></label>
            <input 
            value={pickedObj.address}
            type="text" 
            name="address"
            onChange={handleChange}
            /><br/>
            <label><strong>Phone Number</strong></label>
            <input 
            value={pickedObj.phone_number}
            type="text" 
            name="phone_number"
            onChange={handleChange}
            /><br/>
            <input type="submit"></input>
        </form>
      </div>
  )
}

export default EditGymForm