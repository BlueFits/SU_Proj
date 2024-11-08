import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export const simGetReq: any = createAsyncThunk("message/simGetReq", async () => {
    try {
        return await Promise.race([
            new Promise((resolve) =>
                setTimeout(() => resolve(false), 2000)
            )
        ]);
    } catch (err) {
        throw err;
    }
});

export interface UiState {
    isResultsLoading: boolean;
}

const initialState: UiState = {
    isResultsLoading: false,
}

export const uiStatesSlice = createSlice({
    name: 'uiStates',
    initialState,
    reducers: {
        setIsResultsLoading: (state, action: PayloadAction<boolean>) => {
            state.isResultsLoading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(simGetReq.pending, (state) => {
            state.isResultsLoading = true;
        });
        builder.addCase(simGetReq.fulfilled, (state, action: { payload: boolean }) => {
            state.isResultsLoading = action.payload;
        });
    }
})

// Action creators are generated for each case reducer function
export const { setIsResultsLoading } = uiStatesSlice.actions;

export default uiStatesSlice.reducer