import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk("user/login", () => {
    return fetch("/users")
        .then((response) => response.json())
        .then((data) => console.log(data));   
}) 


const usersSlice = createSlice({
    name: "users",
    initialState: {
        entities: [],
    },
    reducers: {
        userAdded(state, action) {
            state.entities.push({
                text: action.payload
            })
        }
    }
})

export const { userAdded } = usersSlice.actions;

export default usersSlice.reducer;