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

function App() {
  const widgetIds = useSelector(selectWidgetIds);

  const portalNodes = useMemo(() => {
    return widgetIds.reduce((acc, cur) => {
      const portalNode = createHtmlPortalNode();
      acc[cur] = portalNode;
      return acc;
    }, {} as PortalNodes);
  }, [widgetIds]);

  return (
    <portalNodesContext.Provider value={portalNodes}>
      <AddWidgetButton />
      <WidgetButtons />
      <WidgetTabs />
      <WidgetContainer />
      <Widgets />
    </portalNodesContext.Provider>
  );
}

export default App;
