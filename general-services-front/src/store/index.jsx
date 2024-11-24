// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { combineReducers } from 'redux';
import requestsReducer from './slices/requestsSlice';

// Configuración de persistencia
const persistConfig = {
    key: 'root', // key para el almacenamiento
    storage, // el tipo de storage que usaremos
    whitelist: ['requests'], // reducers que queremos persistir
    // blacklist: [], // reducers que NO queremos persistir
};

// Combinar reducers
const rootReducer = combineReducers({
    requests: requestsReducer,
});

// Crear el reducer persistente
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configurar store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignorar acciones de redux-persist en el serializable check
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER'],
            },
        }),
});

// Crear persistor
export const persistor = persistStore(store);