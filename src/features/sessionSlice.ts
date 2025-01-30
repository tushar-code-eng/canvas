import { createSlice } from "@reduxjs/toolkit";

const sessionSlice = createSlice({
    name: "session",
    initialState: {
        sessionUrl: "",
    },
    reducers: {
        setSessionUrl: (state, action) => {
            state.sessionUrl = action.payload;
        },
    },
});

export const { setSessionUrl } = sessionSlice.actions;
export default sessionSlice.reducer;
