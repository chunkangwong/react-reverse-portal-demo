import { configureStore } from "@reduxjs/toolkit";
import widgetReducer from "./widget.slice";

const store = configureStore({
  reducer: {
    widget: widgetReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
