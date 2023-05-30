import { useMemo } from "react";
import { useSelector } from "react-redux";
import { createHtmlPortalNode } from "react-reverse-portal";
import "./App.css";
import AddWidgetButton from "./components/AddWidgetButton";
import ResultContainer from "./components/ResultContainer";
import ResultTabs from "./components/ResultTabs";
import WidgetButtons from "./components/WidgetButtons";
import WidgetContainer from "./components/WidgetContainer";
import WidgetTabs from "./components/WidgetTabs";
import Widgets from "./components/Widgets";
import portalNodesContext, { PortalNodes } from "./context/portalNodesContext";
import { selectResultIds } from "./store/result.slice";
import { selectWidgetIds } from "./store/widget.slice";

function App() {
  const widgetIds = useSelector(selectWidgetIds);
  const resultIds = useSelector(selectResultIds);

  const widgetPortalNodes = useMemo(() => {
    return widgetIds.reduce((acc, cur) => {
      const portalNode = createHtmlPortalNode();
      acc[cur] = portalNode;
      return acc;
    }, {} as PortalNodes);
  }, [widgetIds]);

  const resultPortalNodes = useMemo(() => {
    return resultIds.reduce((acc, cur) => {
      const portalNode = createHtmlPortalNode();
      acc[cur] = portalNode;
      return acc;
    }, {} as PortalNodes);
  }, [resultIds]);

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
