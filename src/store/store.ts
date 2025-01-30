import { configureStore } from '@reduxjs/toolkit';
import canvasReducer from '../features/canvasSlice';
import shapeReducer from '@/features/selectedObjectSlice';
import panningReducer from '@/features/panningSlice'
import refreshKeyReducer from '@/features/refreshSlice'
import canvasBgReducer from '@/features/canvasBgSlice'
import webSocketReducer from "@/features/websocketSlice";
import sessionReducer from '@/features/sessionSlice'

import { allowNonSerializableMiddleware } from '../store/middleware';

export const store = configureStore({
    reducer: {
        canvas: canvasReducer,
        shape: shapeReducer,
        panning: panningReducer,
        refresh: refreshKeyReducer,
        canvasBg: canvasBgReducer,
        webSocket: webSocketReducer,
        session:sessionReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(allowNonSerializableMiddleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
