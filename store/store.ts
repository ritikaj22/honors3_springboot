import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import authReducer from "./authSlice";
import themeReducer from "./themeSlice";

export const smsStore = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof smsStore.getState>;
export type AppDispatch = typeof smsStore.dispatch;
