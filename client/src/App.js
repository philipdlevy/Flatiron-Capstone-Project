import React, {useState, useEffect} from "react"
import {Route, Switch} from 'react-router-dom'

import GymLister from "./components/GymLister";
import ExerciseLister from "./components/ExerciseLister"
import TrainerLister from "./components/TrainerLister"
import HomePage from "./components/HomePage"
import Navbar from "./components/Navbar.js";



function App() {
  const [exercises, setExercises] = useState([])
  console.log(exercises)

  useEffect(() => {
    fetch("/exercises")
    .then((resp) => resp.json())
    .then((exercises) => {
      setExercises(exercises)
    })
    .catch((error) => alert(error))
  },[])

  console.log(exercises)
  return (
    <div >
      <Navbar />

      <Switch>

        <Route exact path="/exercises">
          <ExerciseLister exercises={exercises}/>
        </Route>


      </Switch>
    </div>
  );
}

export default App;
