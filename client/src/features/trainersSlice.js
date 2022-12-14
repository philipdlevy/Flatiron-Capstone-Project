import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTrainers = createAsyncThunk("trainers/fetchTrainers", () => {
    return fetch("/trainers")
        .then((response) => response.json())
        .then((data) => data);   
}) 

const trainersSlice = createSlice({
    name: "trainers",
    initialState: {
        trainer: {
            gym: {},
            training_appointments: []
        },
        entities: [],   
    },
    reducers: {
        trainerAdded(state, action) {
            state.entities.push(action.payload)
        },
        trainerRemoved(state, action) {
            state.entities = state.entities.filter((trainer) => trainer.id !== action.payload);
        },
        trainerUpdated(state, action) {
            state.trainer = state.entities.find((trainer) => trainer.id === action.payload.id)
        },
        trainersAppointmentDeleted(state, action) {
            state.trainer.training_appointments = state.trainer.training_appointments.filter(appt => appt.id !== action.payload.id)          
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

export const { trainerAdded, trainerRemoved, trainerUpdated, trainersAppointmentDeleted } = trainersSlice.actions;

export default trainersSlice.reducer;

