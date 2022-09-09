import React, {useState, useEffect} from "react"
import {Route, Switch} from 'react-router-dom'

import GymLister from "./components/GymLister";
import AddGym from "./components/AddGym"
import ExerciseLister from "./components/ExerciseLister"
import TrainerLister from "./components/TrainerLister"
import HomePage from "./components/HomePage"
import Navbar from "./components/Navbar.js";
import BackgroundImg from "./components/BackgroundImg";
import AddExercise from "./components/AddExercise";
import AddTrainingAppointment from "./components/AddTrainingAppointment";
import MembershipPage from "./components/MembershipPage";
import Login from "./components/Login";
import SignupForm from "./components/SignupForm";


function App() {
  // const [exercises, setExercises] = useState([])
  const [trainers, setTrainers] = useState([])


  // useEffect(() => {
  //   fetch("/exercises")
  //   .then((resp) => resp.json())
  //   .then((exercises) => {
  //     setExercises(exercises)
  //   })
  //   .catch((error) => alert(error))
  // },[])

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
          <ExerciseLister />
        </Route>

        <Route exact path="/gyms">
          <GymLister />
        </Route>

        <Route exact path="/trainers">
          <TrainerLister trainers={trainers}/>
        </Route>

        <Route path="/exercises/new">
          <AddExercise />
        </Route>

        <Route  path="/trainingAppointment/new">
          <AddTrainingAppointment />
        </Route>

        <Route path="/memberships">
          <MembershipPage />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/signup">
          <SignupForm />
        </Route>

        <Route path="/gyms/new">
          <AddGym />
        </Route>

      </Switch>
    </div>
  );
}

export default App;
