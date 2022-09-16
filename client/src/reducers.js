import { combineReducers } from "redux";
import usersReducer from "./features/usersSlice"
import gymsReducer from "./features/gymsSlice"
import exercisesReducer from "./features/exercisesSlice"
import trainersReducer from "./features/trainersSlice"
import membershipsReducer from "./features/membershipsSlice";


const rootReducer = combineReducers({
    users: usersReducer,
    gyms: gymsReducer,
    exercises: exercisesReducer,
    trainers: trainersReducer,
    memberships: membershipsReducer
})

export default rootReducer;