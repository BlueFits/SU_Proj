import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import data from "../../../data/index";

export type program = {
  schoolName: string;
  programName: string,
  programLink: string,
  entranceGrade: string,
  tutionValue: string,
  length: string,
  location: string;
};

export interface CounterState {
  list: Array<program>;
  category: string;
}

const initialState: CounterState = {
  list: data,
  category: "Any",
}

export const programsSlice = createSlice({
  name: 'program',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setCategory } = programsSlice.actions;

export default programsSlice.reducer