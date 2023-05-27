import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Result = {
  widgetId: string;
  title: string;
};

const resultSlice = createSlice({
  name: "result",
  initialState: {
    results: [] as Result[],
    currentResult: null as Result | null,
  },
  reducers: {
    addResult: (state, action: PayloadAction<Result>) => {
      const { widgetId, title } = action.payload;
      if (
        state.results.find(
          (result) => result.widgetId === widgetId && result.title === title
        )
      ) {
        return;
      }
      state.results.push(action.payload);
      state.currentResult = action.payload;
    },
  },
});

export const { addResult } = resultSlice.actions;

export default resultSlice.reducer;
