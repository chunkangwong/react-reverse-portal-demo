import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const WIDGET_IDS = [1, 2, 3];

const initialState = {
  currentWidgetId: null as number | null,
  widgets: WIDGET_IDS.reduce(
    (acc, id) => ({
      ...acc,
      [id]: {
        id: id,
        active: false,
      },
    }),
    {} as Record<
      number,
      {
        id: number;
        active: boolean;
      }
    >
  ),
};

const widgetSlice = createSlice({
  name: "widget",
  initialState: initialState,
  reducers: {
    addWidget: (state) => {
      const maxWidgetId = Math.max(...Object.keys(state.widgets).map(Number));
      const newWidgetId = maxWidgetId + 1;
      state.widgets[newWidgetId] = {
        id: newWidgetId,
        active: true,
      };
      state.currentWidgetId = newWidgetId;
    },
    toggleWidget: (state, action) => {
      const widget = state.widgets[action.payload];
      widget.active = !widget.active;
      // If the widget is being activated, set it as the current widget
      if (widget.active) {
        state.currentWidgetId = widget.id;
      } else {
        // If the widget is being deactivated
        // Skip if the widget is not the current widget
        if (state.currentWidgetId !== widget.id) {
          return;
        }
        // Set the current widget to the first active widget
        for (const widget of Object.values(state.widgets)) {
          if (widget.active) {
            state.currentWidgetId = widget.id;
            return;
          }
        }
        // If there are no active widgets, set the current widget to null
        state.currentWidgetId = null;
      }
    },
    setCurrentWidgetId: (state, action) => {
      state.currentWidgetId = action.payload;
    },
  },
});

export const { addWidget, toggleWidget, setCurrentWidgetId } =
  widgetSlice.actions;

export default widgetSlice.reducer;

const _selectWidgets = (state: RootState) => state.widget.widgets;

export const selectWidgets = createSelector([_selectWidgets], (widgets) =>
  Object.values(widgets)
);

export const selectActiveWidgets = createSelector([selectWidgets], (widgets) =>
  widgets.filter((widget) => widget.active)
);

export const selectWidgetIds = createSelector([_selectWidgets], (widgets) =>
  Object.keys(widgets).map(Number)
);
