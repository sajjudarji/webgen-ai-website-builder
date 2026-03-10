import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import builderReducer from "./builderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    builder: builderReducer,
  },
});
