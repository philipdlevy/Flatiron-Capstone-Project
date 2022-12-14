import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchGyms = createAsyncThunk("gyms/fetchGyms", () => {
    return fetch("/gyms")
        .then((response) => response.json())
        .then((data) => data);   
}) 

const gymsSlice = createSlice({
    name: "gyms",
    initialState: {
        gym: {},
        entities: [],
    },
    reducers: {
        gymAdded(state, action) {
            state.entities.push(action.payload)
        },
        gymRemoved(state, action) {
            state.entities = state.entities.filter((gym) => gym.id !== action.payload);
        },
        gymUpdated(state, action) {
            state.gym = state.entities.find((gym) => gym.id === action.payload.id)
        }
    },
    extraReducers: {
        [fetchGyms.pending](state) {
            state.status = "Loading";
        },
        [fetchGyms.fulfilled](state, action) {
            state.entities = action.payload;
            state.status = "idle"
        }
    }
})

export const { gymAdded, gymRemoved, gymUpdated } = gymsSlice.actions;

export default gymsSlice.reducer;