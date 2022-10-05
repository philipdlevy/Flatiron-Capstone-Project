import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import usersReducer from "./features/usersSlice"
import gymsReducer from "./features/gymsSlice"
import exercisesReducer from "./features/exercisesSlice";
import trainersReducer from "./features/trainersSlice";
import membershipsReducer from "./features/membershipsSlice";

import sessionStorage from 'redux-persist/lib/storage/session';
// changes here
import { 
    persistReducer, 
    persistStore,
} from 'redux-persist';

import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage: sessionStorage
}
  
const persistedReducer = persistReducer(persistConfig, usersReducer)

const store = configureStore({
    reducer: {
        // users: usersReducer,
        users: persistedReducer,
        gyms: gymsReducer,  
        exercises: exercisesReducer,
        trainers: trainersReducer,
        memberships: membershipsReducer,

        // Added the reducer part
        reducer: persistedReducer,

        // old middleware, may need again
        // middleware: [thunk]
    },
    
    //new middleware to get rid of errors
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
            middleware: [thunk]
        }),
})

export const persistor = persistStore(store)
export default store;