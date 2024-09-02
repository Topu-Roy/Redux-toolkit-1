import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./slices/todoSlice";

export const store = configureStore({
  reducer: {
    todo: todoSlice,
  },
});

export type StoreType = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;
