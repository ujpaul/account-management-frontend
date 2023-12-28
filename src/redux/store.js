import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import dateReducer from "./slice/dateSlice";
import locationReducer from "./slice/userLocationSlice";
import paymentLocationReducer from "./slice/paymentLocations";
import locationNameReducer from "./slice/LocationNameSlice";
import searchDataReducer from "./slice/searchData";
export const store = configureStore({
  reducer: {
    user: userReducer,
    date: dateReducer,
    location: locationReducer,
    paymentLocation: paymentLocationReducer,
    locationName: locationNameReducer,
    searchUrl: searchDataReducer,
  },
});
