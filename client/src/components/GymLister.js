import React, {useState, useEffect} from "react"
import GymCard from './GymCard'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { fetchGyms } from "../features/gymsSlice";
import EditGymForm from "./EditGymForm";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function GymLister() {
  const currentUser = useSelector((state) => state.users.user) 
  const [editing, setEditing] = useState(false)

  const gymsArray = useSelector((state) => state.gyms.entities)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchGyms())
  }, [dispatch])


  const gymArray = gymsArray.map((gym, index) => {
    return <GymCard key={index} gymObj={gym} />
  })

  if (editing) {
    return <EditGymForm />
  } else {
    return (   
      <Box paddingY={2}>
        {currentUser.role.name === "admin" ?
          <Link to="/gyms/new" style={{ textDecoration: 'none'}}>
            <Button variant="contained">Add new gym</Button>
          </Link>
        : null}
        {gymArray}
      </Box>
    )
  }
}

export default GymLister