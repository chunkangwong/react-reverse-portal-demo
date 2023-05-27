import { configureStore } from "@reduxjs/toolkit";
import resultReducer from "./result.slice";
import widgetReducer from "./widget.slice";

const store = configureStore({
  reducer: {
    widget: widgetReducer,
    result: resultReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
