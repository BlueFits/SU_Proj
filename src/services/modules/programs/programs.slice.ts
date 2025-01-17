import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import data from "../../../data/index";
import provinces from '../../../data/provinces';

export type gradeSort = "asc" | "desc" | null;

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
  category: Array<string>;
  selectedLocation: Array<string>;
  gradeSort: gradeSort;
  overallRankingSort: boolean;
}

const initialState: programSliceState = {
  list: data,
  category: [],
  selectedLocation: [],
  gradeSort: null,
  overallRankingSort: false,
}

export const programsSlice = createSlice({
  name: 'program',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<Array<string>>) => {
      state.category = action.payload;
    },
    setLocation: (state, action: PayloadAction<Array<string>>) => {
      state.selectedLocation = action.payload;
    },
    setGradeSort: (state, action: PayloadAction<gradeSort>) => {
      state.overallRankingSort = false;
      state.gradeSort = action.payload;
    },
    setOverallRankingSort(state, action: PayloadAction<boolean>) {
      state.gradeSort = null;
      state.overallRankingSort = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setCategory, setLocation, setGradeSort, setOverallRankingSort } = programsSlice.actions;

export default programsSlice.reducer