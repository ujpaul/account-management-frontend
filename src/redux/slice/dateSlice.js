import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  date: '',
};

export const dateSlice = createSlice({
  name: "reportDate",
  initialState,
  reducers: {
    changeReportDate: (state, actions) => {
      state.date = actions.payload;
    },
  },
});

export const { changeReportDate } = dateSlice.actions;
export const selectdate = (state) => state.date.date;

export default dateSlice.reducer;
