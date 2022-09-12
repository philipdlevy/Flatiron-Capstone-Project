import { combineReducers } from "redux";
import usersReducer from "./features/usersSlice"
import gymsReducer from "./features/gymsSlice"
import exercisesReducer from "./features/exercisesSlice"
import trainersReducer from "./features/trainersSlice"


const rootReducer = combineReducers({
    users: usersReducer,
    gyms: gymsReducer,
    exercises: exercisesReducer,
    trainers: trainersReducer
})

export default rootReducer;