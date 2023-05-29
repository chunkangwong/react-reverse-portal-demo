import { useMemo } from "react";
import { useSelector } from "react-redux";
import { createHtmlPortalNode } from "react-reverse-portal";
import "./App.css";
import AddWidgetButton from "./components/AddWidgetButton";
import WidgetButtons from "./components/WidgetButtons";
import WidgetContainer from "./components/WidgetContainer";
import WidgetTabs from "./components/WidgetTabs";
import Widgets from "./components/Widgets";
import portalNodesContext, { PortalNodes } from "./context/portalNodesContext";
import { RootState } from "./store/store";
import { selectWidgetIds } from "./store/widget.slice";
import ResultTabs from "./components/ResultTabs";
import ResultContainer from "./components/ResultContainer";

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
      const resultId = `${cur.widgetId}-${cur.title}`;
      const portalNode = createHtmlPortalNode();
      acc[resultId] = portalNode;
      return acc;
    }, {} as PortalNodes);
  }, [results]);

  return (
    <portalNodesContext.Provider
      value={{ widgetPortalNodes, resultPortalNodes }}
    >
      <div className="app">
        <AddWidgetButton />
        <WidgetButtons />
        <WidgetTabs />
        <WidgetContainer />
        <Widgets />
        <ResultTabs />
        <ResultContainer />
      </div>
    </portalNodesContext.Provider>
  );
}

export default App;
