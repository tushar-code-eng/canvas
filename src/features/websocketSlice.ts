import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state of the WebSocket
interface WebSocketState {
  ws: WebSocket | null;
}

const initialState: WebSocketState = {
  ws: null,
};

// Create a slice for managing the WebSocket
const webSocketSlice = createSlice({
  name: "webSocket",
  initialState,
  reducers: {
    setWebSocket: (state, action: PayloadAction<WebSocket | null>) => {
      state.ws = action.payload;
    },
    closeWebSocket: (state) => {
      if (state.ws) {
        state.ws.close();
        state.ws = null;
      }
    },
  },
});

export const { setWebSocket, closeWebSocket } = webSocketSlice.actions;
export default webSocketSlice.reducer;
