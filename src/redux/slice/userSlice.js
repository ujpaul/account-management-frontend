import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: {username: 'paul'},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, actions) => {
      state.userDetails = actions.payload;
    },
  },
});

export const { setUserDetails } = userSlice.actions;
export const selectUser = (state) => state

export default userSlice.reducer;
