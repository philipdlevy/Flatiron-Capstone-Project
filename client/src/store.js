import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./features/usersSlice"
import gymsReducer from "./features/gymsSlice"
import exercisesReducer from "./features/exercisesSlice";
import trainersReducer from "./features/trainersSlice";

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';


const persistConfig = {
    key: 'root',
    storage,
  }
  
const persistedReducer = persistReducer(persistConfig, usersReducer)

const store = configureStore({
    reducer: {
        // users: usersReducer,
        users: persistedReducer,
        gyms: gymsReducer,  
        exercises: exercisesReducer,
        trainers: trainersReducer,

        persistedReducer,
        middleware: [thunk]
    }
})

export const persistor = persistStore(store)
export default store;