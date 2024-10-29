import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import * as data from "../../../data/result.json";

type program = {
    schoolName: string;
    programName: string,
    programLink: string,
    entranceGrade: string,
    tutionValue: string,
    length: string,
};

export interface CounterState {
    list: Array<program>;
}

const initialState: CounterState = {
    list: data,
}

export const programsSlice = createSlice({
  name: 'program',
  initialState,
  reducers: {
    increment: (state) => {
    //   state.programs
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment } = programsSlice.actions;

export default programsSlice.reducer