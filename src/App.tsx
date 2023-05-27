import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  HtmlPortalNode,
  InPortal,
  OutPortal,
  createHtmlPortalNode,
} from "react-reverse-portal";
import "./App.css";
import Widget from "./Widget";
import { AppDispatch, RootState } from "./store/store";
import {
  addWidget,
  selectActiveWidgets,
  selectWidgetIds,
  selectWidgets,
  setCurrentWidgetId,
  toggleWidget,
} from "./store/widget.slice";

function App() {
  const currentWidgetId = useSelector(
    (state: RootState) => state.widget.currentWidgetId
  );
  const widgets = useSelector(selectWidgets);
  const activeWidgets = useSelector(selectActiveWidgets);
  const widgetIds = useSelector(selectWidgetIds);

  const dispatch = useDispatch<AppDispatch>();
  const portalNodes = useMemo(() => {
    return widgetIds.reduce((acc, cur) => {
      const portalNode = createHtmlPortalNode();
      acc[cur] = portalNode;
      return acc;
    }, {} as Record<number, HtmlPortalNode>);
  }, [widgetIds]);

  const handleAddWidget = () => {
    dispatch(addWidget());
  };

  const handleWidgetBtnClick = (id: number) => () => {
    dispatch(toggleWidget(id));
  };

  const handleWidgetTabClick = (id: number) => () => {
    dispatch(setCurrentWidgetId(id));
  };

  return (
    <>
      <button onClick={handleAddWidget}>Add Widget</button>
      <div className="widget-button-list">
        {widgets.map((widget) => {
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
        {activeWidgets.map((widget) => (
          <button
            key={`widget-tab-${widget.id}`}
            onClick={handleWidgetTabClick(widget.id)}
            style={{
              backgroundColor: currentWidgetId === widget.id ? "green" : "red",
            }}
          >
            Widget {widget.id}
          </button>
        ))}
      </div>
      <div className="widget-container">
        {currentWidgetId && portalNodes[currentWidgetId] ? (
          <OutPortal node={portalNodes[currentWidgetId]} />
        ) : null}
      </div>
      {activeWidgets.map((widget) => (
        <InPortal key={`portal-${widget.id}`} node={portalNodes[widget.id]}>
          <Widget widgetId={widget.id} />
        </InPortal>
      ))}
    </>
  );
}

export default App;
