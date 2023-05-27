import { useMemo } from "react";
import { useSelector } from "react-redux";
import { createHtmlPortalNode } from "react-reverse-portal";
import AddWidgetButton from "./AddWidgetButton";
import "./App.css";
import WidgetButtons from "./WidgetButtons";
import WidgetContainer from "./WidgetContainer";
import WidgetTabs from "./WidgetTabs";
import Widgets from "./Widgets";
import portalNodesContext, { PortalNodes } from "./portalNodesContext";
import { selectWidgetIds } from "./store/widget.slice";
import { RootState } from "./store/store";

function App() {
  const widgetIds = useSelector(selectWidgetIds);
  const results = useSelector((state: RootState) => state.result.results);

  const widgetPortalNodes = useMemo(() => {
    return widgetIds.reduce((acc, cur) => {
      const portalNode = createHtmlPortalNode();
      acc[cur] = portalNode;
      return acc;
    }, {} as PortalNodes);
  }, [widgetIds]);

  return (
    <portalNodesContext.Provider value={widgetPortalNodes}>
      <AddWidgetButton />
      <WidgetButtons />
      <WidgetTabs />
      <WidgetContainer />
      <Widgets />
      {results.map((result) => {
        const { widgetId, title } = result;
        return <button key={`result-${widgetId}`}>{title}</button>;
      })}
    </portalNodesContext.Provider>
  );
}

export default App;
