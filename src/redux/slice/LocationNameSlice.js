import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locationName: ''
};

export const locationName = createSlice({
  name: "locationName",
  initialState,
  reducers: {
    updateLocationName: (state, actions) => {
      state.locationName = actions.payload;
    },
  },
});

export const { updateLocationName } = locationName.actions;
export const selectLocationName = (state) =>
  state.locationName.locationName;

export default locationName.reducer;
