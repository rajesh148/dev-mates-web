import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequest: (state, action) => {
      return action.payload;
    },
    removeRequest: (state, action) => {
      const newArray = state.filter((r) => r._id !== action.payload);
      return newArray;
    },
    clearRequests: (state, action) => {
      return null;
    },
  },
});

export const { addRequest, removeRequest, clearRequests } =
  requestSlice.actions;
export default requestSlice.reducer;
