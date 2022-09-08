import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./features/usersSlice"
import gymsReducer from "./features/gymsSlice"

const store = configureStore({
    reducer: {
        users: usersReducer,
        gyms: gymsReducer
    }
})

console.log(store.getState())

export default store;