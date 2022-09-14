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
            console.log(state, action)
            state.user = action.payload
            console.log(state.user)
        },
        logoutUser(state, action) {
            state.user = {}
        }
    }
})

export const { userAdded, loginUser, logoutUser } = usersSlice.actions;

export default usersSlice.reducer;