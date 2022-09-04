import React, {useState, useEffect} from "react"
import {Route, Switch} from 'react-router-dom'

import GymLister from "./components/GymLister";
import ExerciseLister from "./components/ExerciseLister"
import TrainerLister from "./components/TrainerLister"
import HomePage from "./components/HomePage"
import Navbar from "./components/Navbar.js";



function App() {
  const [exercises, setExercises] = useState([])
  const [gyms, setGyms] = useState([])
  const [trainers, setTrainers] = useState([])


  useEffect(() => {
    fetch("/exercises")
    .then((resp) => resp.json())
    .then((exercises) => {
      setExercises(exercises)
    })
    .catch((error) => alert(error))
  },[])

  useEffect(() => {
    fetch("/gyms")
    .then((resp) => resp.json())
    .then((gyms) => {
      setGyms(gyms)
    })
    .catch((error) => alert(error))
  },[])

  useEffect(() => {
    fetch("/trainers")
    .then((resp) => resp.json())
    .then((trainers) => {
      setTrainers(trainers)
    })
    .catch((error) => alert(error))
  },[])


  return (
    <div >
      <Navbar />

      <Switch>

        <Route exact path="/exercises">
          <ExerciseLister exercises={exercises}/>
        </Route>

        <Route exact path="/gyms">
          <GymLister gyms={gyms}/>
        </Route>

        <Route exact path="/trainers">
          <TrainerLister trainers={trainers}/>
        </Route>


      </Switch>
    </div>
  );
}

export default App;
