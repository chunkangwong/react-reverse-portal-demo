import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export type Result = {
  widgetId: string;
  title: string;
  id: string;
};

const resultSlice = createSlice({
  name: "result",
  initialState: {
    results: [] as Result[],
    currentResultId: null as string | null,
  },
  reducers: {
    addResult: (
      state,
      action: PayloadAction<{
        widgetId: string;
        title: string;
      }>
    ) => {
      const { widgetId, title } = action.payload;
      const newResultId = `${widgetId}-${title}`;
      if (
        state.results.find(
          (result) => result.widgetId === widgetId && result.title === title
        )
      ) {
        return;
      }
      state.results.push({ ...action.payload, id: newResultId });
      state.currentResultId = newResultId;
    },
    setCurrentResultId: (state, action: PayloadAction<string>) => {
      state.currentResultId = action.payload;
    },
  },
});

export const { addResult, setCurrentResultId } = resultSlice.actions;

export default resultSlice.reducer;

const selectResults = (state: RootState) => state.result.results;

export const selectResultIds = createSelector(selectResults, (results) =>
  results.map((result) => result.id)
);
