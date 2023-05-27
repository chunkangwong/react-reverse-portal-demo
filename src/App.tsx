import { Component, useState } from "react";
import {
  HtmlPortalNode,
  InPortal,
  OutPortal,
  createHtmlPortalNode,
} from "react-reverse-portal";
import "./App.css";
import Widget from "./Widget";

const WIDGET_IDS = [1, 2, 3];

function App() {
  const [currentWidgetId, setCurrentWidgetId] = useState<number | null>(null);
  const [widgets, setWidgets] = useState<
    Record<
      number,
      {
        id: number;
        active: boolean;
        portalNode: HtmlPortalNode<Component>;
      }
    >
  >(
    WIDGET_IDS.reduce(
      (acc, id) => ({
        ...acc,
        [id]: {
          id: id,
          active: false,
          portalNode: createHtmlPortalNode(),
        },
      }),
      {}
    )
  );

  const handleWidgetBtnClick = (id: number) => () => {
    const newWidgets = { ...widgets };
    newWidgets[id].active = !newWidgets[id].active;
    setWidgets(newWidgets);
  };

  const handleWidgetTabClick = (id: number) => () => {
    setCurrentWidgetId(id);
  };

  return (
    <>
      <div className="widget-button-list">
        {Object.values(widgets).map((widget) => {
          return (
            <button
              key={`widget-btn-${widget.id}`}
              onClick={handleWidgetBtnClick(widget.id)}
              style={{
                backgroundColor: widget.active ? "green" : "red",
              }}
            >
              Widget {widget.id}
            </button>
          );
        })}
      </div>
      <div className="widget.tab-list">
        {Object.values(widgets)
          .filter((widget) => widget.active)
          .map((widget) => (
            <button
              key={`widget-tab-${widget.id}`}
              onClick={handleWidgetTabClick(widget.id)}
              style={{
                backgroundColor:
                  currentWidgetId === widget.id ? "green" : "red",
              }}
            >
              Widget {widget.id}
            </button>
          ))}
      </div>
      <div className="widget-container">
        {currentWidgetId ? (
          <OutPortal node={widgets[currentWidgetId]?.portalNode} />
        ) : null}
      </div>
      {Object.values(widgets)
        .filter((widget) => widget.active)
        .map((widget) => (
          <InPortal key={`widget-${widget.id}`} node={widget.portalNode}>
            <Widget widgetId={widget.id} />
          </InPortal>
        ))}
    </>
  );
}

export default App;
