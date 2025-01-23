import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  selectedShape: null,
};

export const shapeSlice = createSlice({
  name: "shape",
  initialState,
  reducers: {
    setSelectedShape(state, action: PayloadAction<any>) {
      state.selectedShape = action.payload;
    },
    clearSelectedShape(state) {
      state.selectedShape = null;
    },
  },
});

export const { setSelectedShape, clearSelectedShape } = shapeSlice.actions;
export default shapeSlice.reducer;
