import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { combineReducers } from 'redux';
import requestsReducer from './slices/requestsSlice'; // Tu reducer de requests
import type { RequestsState } from './slices/requestsSlice'; // Importar el tipo de estado de requests

// Configuración de persistencia
const persistConfig = {
    key: 'root', // key para el almacenamiento
    storage, // el tipo de storage que usaremos
    whitelist: ['requests'], // reducers que queremos persistir
};

// Combinar reducers
const rootReducer = combineReducers({
    requests: requestsReducer, // El reducer de requests se combina
});

// Crear el reducer persistente
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configurar el store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER'],
            },
        }),
});

// Crear persistor
export const persistor = persistStore(store);



// Tipo del dispatch
export type AppDispatch = typeof store.dispatch;
