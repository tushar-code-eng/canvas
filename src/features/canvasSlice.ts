import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Canvas } from 'fabric';

interface CanvasState {
  value: Canvas | null;
  height: number;
  width: number;
}

const initialState: CanvasState = {
  value: null,
  height: 500,
  width: 500
};

export const counterSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    setCanvas: (state, action: any) => {
      state.value = action.payload
    },
    setHeight: (state, action: PayloadAction<number>) => {
      // state.setHeight(action.payload)
      // state.value?.setDimensions({ height: action.payload })
    },
    setWidth: (state, action: PayloadAction<number>) => {
      // state.setWidth(action.payload)
      // state.value?.setDimensions({ width: action.payload })
    }
  },
});

export const { setCanvas, setHeight, setWidth } = counterSlice.actions;
export default counterSlice.reducer;
