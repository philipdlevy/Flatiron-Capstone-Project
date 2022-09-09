import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchExercises = createAsyncThunk("exercises/fetchExercises", () => {
    return fetch("/exercises")
        .then((response) => response.json())
        .then((data) => data);   
}) 

const exercisesSlice = createSlice({
    name: "exercises",
    initialState: {
        entities: [],
    },
    reducers: {
        exerciseAdded(state, action) {
            state.entities.push(action.payload)
        },
        exerciseRemoved(state, action) {
            state.entities = state.entities.filter((exercise) => exercise.id !== action.payload);
        }
    },
    extraReducers: {
        [fetchExercises.pending](state) {
            state.status = "Loading";
        },
        [fetchExercises.fulfilled](state, action) {
            state.entities = action.payload;
            state.status = "idle"
        }
    }
})

export const { exerciseAdded, exerciseRemoved } = exercisesSlice.actions;

export default exercisesSlice.reducer;