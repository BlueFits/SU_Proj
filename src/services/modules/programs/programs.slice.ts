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

export interface programSliceState {
  list: Array<program>;
  category: string;
  selectedLocation: string;
}

const initialState: programSliceState = {
  list: data,
  category: "Any",
  selectedLocation: "All"
}

export const programsSlice = createSlice({
  name: 'program',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setLocation: (state, action: PayloadAction<string>) => {
      state.selectedLocation = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setCategory, setLocation } = programsSlice.actions;

export default programsSlice.reducer