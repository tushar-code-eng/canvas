import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PanningState {
  canvasBgValue: string;
}

const initialState: PanningState = {
    canvasBgValue: "bg-dot-black/[0.25]",
};

const panningSlice = createSlice({
  name: "canvasBg",
  initialState,
  reducers: {
    setCanvasBg : (state,action:PayloadAction<string>)=>{
        state.canvasBgValue = action.payload
    }
  },
});

export const { setCanvasBg } =
  panningSlice.actions;

export default panningSlice.reducer;
