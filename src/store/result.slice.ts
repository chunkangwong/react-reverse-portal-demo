import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Result = {
  widgetId: number;
  title: string;
};

const resultSlice = createSlice({
  name: "result",
  initialState: {
    results: [] as Result[],
    currentResultId: null as number | null,
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
    },
  },
});

export const { addResult } = resultSlice.actions;

export default resultSlice.reducer;
