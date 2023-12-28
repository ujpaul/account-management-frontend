import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: [],
};

export const userLocationSlice = createSlice({
  name: "userLocation",
  initialState,
  reducers: {
    setLocation: (state, actions) => {
      const { secondTime } = actions.payload;
      const { data } = actions.payload;
      if (secondTime) {
        state.location = [...state.location, data];
      } else {
        state.location = actions.payload;
      }
    },
  },
});

export const { setLocation } = userLocationSlice.actions;
export const selectUserLocation = (state) => state.location.location;

export default userLocationSlice.reducer;
