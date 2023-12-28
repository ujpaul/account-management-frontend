import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchUrl: []
}
export const searchedData = createSlice({
    name: 'search url',
    initialState,
    reducers: {
        updateSearchedData: (state, actions) => {
            state.searchUrl = actions.payload;
        }
    }
})
export const { updateSearchedData } = searchedData.actions;
export const selectSearchedData = state => state.searchUrl.searchUrl
export default searchedData.reducer