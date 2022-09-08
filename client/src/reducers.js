import { combineReducers } from "redux";
import usersReducer from "./features/usersSlice"
import gymsReducer from "./features/gymsSlice"


const rootReducer = combineReducers({
    users: usersReducer,
    gyms: gymsReducer
})

export default rootReducer;