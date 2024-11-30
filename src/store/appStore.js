import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/userSlice";
import feedReducer from "../store/feedSlice";
import connectionsReducer from "../store/connectionsSlice";
import requestReducer from "../store/requestsSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionsReducer,
    requests: requestReducer,
  },
});

export default appStore;
