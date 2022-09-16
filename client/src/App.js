import React from "react"
import {Route, Switch} from 'react-router-dom'

import GymLister from "./components/GymLister";
import AddGym from "./components/AddGym"
import ExerciseLister from "./components/ExerciseLister"
import AddExercise from "./components/AddExercise";
import TrainerLister from "./components/TrainerLister"
import AddTrainer from "./components/AddTrainer";
import HomePage from "./components/HomePage"
import Navbar from "./components/Navbar.js";
import AddTrainingAppointment from "./components/AddTrainingAppointment";
import MembershipPage from "./components/MembershipPage";
import AddGymMembership from "./components/AddGymMembership";
import Login from "./components/Login";
import SignupForm from "./components/SignupForm";
import EditExerciseForm from "./components/EditExerciseForm";
import EditGymForm from "./components/EditGymForm";
import EditTrainerForm from "./components/EditTrainerForm";



function App() {

  return (
    <div >
      <Navbar />

      <Switch>

        <Route exact path="/">
          <HomePage />
        </Route>

        <Route exact path="/exercises">
          <ExerciseLister />
        </Route>

        <Route path="/exercises/new">
          <AddExercise />
        </Route>

        <Route path="/exercises/:id">
          <EditExerciseForm />
        </Route>

        <Route exact path="/gyms">
          <GymLister />
        </Route>

        <Route path="/gyms/new">
          <AddGym />
        </Route> 

        <Route path="/gyms/:id">
          <EditGymForm />
        </Route>

        <Route exact path="/trainers">
          <TrainerLister />
        </Route>

        <Route path="/trainers/new">
          <AddTrainer />
        </Route>

        <Route path="/trainers/:id">
          <EditTrainerForm />
        </Route>

        <Route  path="/trainingAppointment/new">
          <AddTrainingAppointment />
        </Route>

        <Route exact path="/memberships">
          <MembershipPage />
        </Route>

        <Route path="/memberships/new">
          <AddGymMembership />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/signup">
          <SignupForm />
        </Route>


      </Switch>
    </div>
  );
}

export default App;
