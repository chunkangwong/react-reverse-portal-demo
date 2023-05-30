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
    resultTabValue: 0,
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
      state.resultTabValue = state.results.length - 1;
    },
    setResultTabValue: (state, action: PayloadAction<number>) => {
      state.resultTabValue = action.payload;
    },
  },
});

export const { addResult, setResultTabValue } = resultSlice.actions;

export default resultSlice.reducer;

const selectResults = (state: RootState) => state.result.results;

export const selectResultIds = createSelector(selectResults, (results) =>
  results.map((result) => result.id)
);

export const selectCurrentResultId = createSelector(
  [selectResults, (state: RootState) => state.result.resultTabValue],
  (results, resultTabValue) => results[resultTabValue]?.id
);
