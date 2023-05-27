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
import { RootState } from "./store/store";
import { selectWidgetIds } from "./store/widget.slice";

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

  const resultPortalNodes = useMemo(() => {
    return results.reduce((acc, cur) => {
      const resultId = `${cur.widgetId}-${cur.widgetId}`;
      const portalNode = createHtmlPortalNode();
      acc[resultId] = portalNode;
      return acc;
    }, {} as PortalNodes);
  }, [results]);

  return (
    <portalNodesContext.Provider
      value={{ widgetPortalNodes, resultPortalNodes }}
    >
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
