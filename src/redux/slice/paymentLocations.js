import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: [],
};

export const paymentLocationSlice = createSlice({
  name: "paymentLocation",
  initialState,
  reducers: {
      updatePaymentLocation: (state, actions) => {
      state.location = actions.payload;
    },
  },
});

export const { updatePaymentLocation } = paymentLocationSlice.actions;
export const selectPaymentLocation = (state) => state.paymentLocation.location;

export default paymentLocationSlice.reducer;
