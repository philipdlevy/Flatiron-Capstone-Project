import React, {useEffect} from "react"
import TrainerCard from './TrainerCard'
import { useSelector, useDispatch } from "react-redux";
import { fetchTrainers } from "../features/trainersSlice";
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


function TrainerLister() {

  const trainersArray = useSelector((state) => state.trainers.entities)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTrainers())
  }, [dispatch])

  const trainerArray = trainersArray.map((trainer, index) => {
    return <TrainerCard key={index} trainerObj={trainer} />
  })

  return (
    <Box paddingY={2}>
      <Link to="/trainers/new">
        <Button variant="contained">Add new trainer</Button>
      </Link>
      {trainerArray}
    </Box>
  )
}

export default TrainerLister