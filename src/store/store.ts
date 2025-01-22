import { configureStore } from '@reduxjs/toolkit';
import canvasReducer from '../features/canvasSlice';
import { allowNonSerializableMiddleware } from '../store/middleware';

export const store = configureStore({
    reducer: {
        canvas: canvasReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(allowNonSerializableMiddleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
