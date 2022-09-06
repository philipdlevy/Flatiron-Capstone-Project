import { createSlice } from "@reduxjs/toolkit";

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