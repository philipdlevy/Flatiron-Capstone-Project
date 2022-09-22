import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk("user/login", () => {
    return fetch("/users")
        .then((response) => response.json())
        .then((data) => data);   
}) 

const usersSlice = createSlice({
    name: "users",
    initialState: {
        user: {},
        entities: [],
    },
    reducers: {
        userAdded(state, action) {
            state.entities.push(action.payload)
        },
        loginUser(state, action) {
            state.user = action.payload
        },
        logoutUser(state, action) {
            state.user = {}
        }, 
        userAddMembership(state, action) {
            state.entities.find((user) => user.id == state.user.id)
            state.user.gym_membership = action.payload
        },
        userAddTrainingAppointments(state, action) {
            // debugger
            state.entities.find((user) => user.id == state.user.id)
            state.user.training_appointments = action.payload
        }
    }
})

export const { userAdded, loginUser, logoutUser, userAddMembership, userAddTrainingAppointments } = usersSlice.actions;

export default usersSlice.reducer;