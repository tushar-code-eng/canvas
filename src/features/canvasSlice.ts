import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Canvas } from 'fabric';

interface CanvasState {
  value: Canvas | null;
}

const initialState: CanvasState = {
  value: null,
};

export const counterSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    setCanvas: (state,action:any) => {
      state.value = action.payload
    }
  },
});

export const { setCanvas } = counterSlice.actions;
export default counterSlice.reducer;
