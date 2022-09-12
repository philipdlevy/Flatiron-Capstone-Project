import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTrainers = createAsyncThunk("trainers/fetchTrainers", () => {
    return fetch("/trainers")
        .then((response) => response.json())
        .then((data) => data);   
}) 

const trainersSlice = createSlice({
    name: "trainers",
    initialState: {
        entities: [],
    },
    reducers: {
        trainerAdded(state, action) {
            state.entities.push(action.payload)
            console.log(state, action)
        },
        trainerRemoved(state, action) {
            state.entities = state.entities.filter((trainer) => trainer.id !== action.payload);
        }
    },
    extraReducers: {
        [fetchTrainers.pending](state) {
            state.status = "Loading";
        },
        [fetchTrainers.fulfilled](state, action) {
            state.entities = action.payload;
            state.status = "idle"
        }
    }
})

export const { trainerAdded, trainerRemoved } = trainersSlice.actions;

export default trainersSlice.reducer;