import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface initialStateInterface {
    value: number;
}

const initialState: initialStateInterface = {
    value: 0
}

const refreshKeySlice = createSlice({
    name: 'refresh',
    initialState,
    reducers: {
        setRefreshKey: (state) => {
            state.value += 1;
        }
    }
})

export const { setRefreshKey } = refreshKeySlice.actions

export default refreshKeySlice.reducer