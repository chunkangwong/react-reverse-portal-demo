import { createSlice } from "@reduxjs/toolkit";
import { Component } from "react";
import { HtmlPortalNode, createHtmlPortalNode } from "react-reverse-portal";

const WIDGET_IDS = [1, 2, 3];

const initialState = {
  currentWidgetId: null as number | null,
  widgets: WIDGET_IDS.reduce(
    (acc, id) => ({
      ...acc,
      [id]: {
        id: id,
        active: false,
        portalNode: createHtmlPortalNode(),
      },
    }),
    {} as Record<
      number,
      {
        id: number;
        active: boolean;
        portalNode: HtmlPortalNode<Component>;
      }
    >
  ),
};

const widgetSlice = createSlice({
  name: "widget",
  initialState: initialState,
  reducers: {
    activateWidget: (state, action) => {
      const widget = state.widgets[action.payload];
      widget.active = true;
    },
    deactivateWidget: (state, action) => {
      const widget = state.widgets[action.payload];
      widget.active = false;
    },
    setCurrentWidgetId: (state, action) => {
      state.currentWidgetId = action.payload;
    },
  },
});

export const { activateWidget, deactivateWidget, setCurrentWidgetId } =
  widgetSlice.actions;

export default widgetSlice.reducer;
