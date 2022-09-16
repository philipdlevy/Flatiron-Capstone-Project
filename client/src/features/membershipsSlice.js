import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchMemberships = createAsyncThunk("gym_memberships/fetchMemberships", () => {
    return fetch("/gym_memberships")
        .then((response) => response.json())
        .then((data) => data);   
}) 

const membershipsSlice = createSlice({
    name: "memberships",
    initialState: {
        entities: [],
    },
    reducers: {
        membershipAdded(state, action) {
            state.entities.push(action.payload)
        }
    },
    extraReducers: {
        [fetchMemberships.pending](state) {
            state.status = "Loading";
        },
        [fetchMemberships.fulfilled](state, action) {
            state.entities = action.payload;
            state.status = "idle"
        }
    }
})

export const { membershipAdded } = membershipsSlice.actions;

export default membershipsSlice.reducer;