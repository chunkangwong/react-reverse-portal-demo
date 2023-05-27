import { useContext } from "react";
import { useSelector } from "react-redux";
import { OutPortal } from "react-reverse-portal";
import portalNodesContext from "../context/portalNodesContext";
import { RootState } from "../store/store";

const WidgetContainer = () => {
  const portalNodes = useContext(portalNodesContext);
  const currentWidgetId = useSelector(
    (state: RootState) => state.widget.currentWidgetId
  );

  return (
    <div className="widget-container">
      {currentWidgetId &&
      portalNodes &&
      portalNodes.widgetPortalNodes[currentWidgetId] ? (
        <OutPortal node={portalNodes.widgetPortalNodes[currentWidgetId]} />
      ) : null}
    </div>
  );
};

export default WidgetContainer;
