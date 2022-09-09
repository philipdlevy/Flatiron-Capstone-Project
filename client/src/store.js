import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./features/usersSlice"
import gymsReducer from "./features/gymsSlice"
import exercisesSlice from "./features/exercisesSlice";

const store = configureStore({
    reducer: {
        users: usersReducer,
        gyms: gymsReducer,
        exercises: exercisesSlice
    }
})


export default store;