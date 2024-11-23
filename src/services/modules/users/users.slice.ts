import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  grade: number | null;
}

const initialState: CounterState = {
  grade: null,
}

export const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setGrade: (state, action: PayloadAction<number>) => {
      state.grade = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setGrade } = usersSlice.actions;

export default usersSlice.reducer