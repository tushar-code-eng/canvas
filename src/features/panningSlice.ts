import { createSlice } from "@reduxjs/toolkit";

interface PanningState {
  isPanning: boolean;
}

const initialState: PanningState = {
  isPanning: false,
};

const panningSlice = createSlice({
  name: "panning",
  initialState,
  reducers: {
    togglePanning: (state) => {
      state.isPanning = !state.isPanning;
    },
    enablePanning: (state) => {
      state.isPanning = true;
    },
    disablePanning: (state) => {
      state.isPanning = false;
    },
  },
});

export const { togglePanning, enablePanning, disablePanning } =
  panningSlice.actions;

export default panningSlice.reducer;
