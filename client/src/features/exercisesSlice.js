import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchExercises = createAsyncThunk("exercises/fetchExercises", () => {
    return fetch("/exercises")
        .then((response) => response.json())
        .then((data) => data);   
}) 

const exercisesSlice = createSlice({
    name: "exercises",
    initialState: {
        exercise: {},
        entities: [],
    },
    reducers: {
        exerciseAdded(state, action) {
            state.entities.push(action.payload)
        },
        exerciseRemoved(state, action) {
            state.entities = state.entities.filter((exercise) => exercise.id !== action.payload);
        },
        exerciseUpdated(state, action) {
            // debugger
            state.exercise = state.entities.find((exercise) => exercise.id === action.payload.id)
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

export const { exerciseAdded, exerciseRemoved, exerciseUpdated } = exercisesSlice.actions;

export default exercisesSlice.reducer;