import React, {useState, useEffect} from "react"
import GymCard from './GymCard'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { fetchGyms } from "../features/gymsSlice";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function GymLister() {

  const gymsArray = useSelector((state) => state.gyms.entities)
  console.log(gymsArray)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchGyms())
  }, [dispatch])


  const gymArray = gymsArray.map((gym, index) => {
    return <GymCard key={index} gymObj={gym} />
  })

  return (   
      <Box paddingY={2}>
        <Link to="/gyms/new">
          <Button variant="contained">Add new gym</Button>
        </Link>
        {gymArray}
      </Box>
  )
}

export default GymLister