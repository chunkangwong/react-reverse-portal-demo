import { useContext } from "react";
import { useSelector } from "react-redux";
import { InPortal } from "react-reverse-portal";
import Widget from "./Widget";
import portalNodesContext from "./portalNodesContext";
import { selectActiveWidgets } from "./store/widget.slice";

const Widgets = () => {
  const activeWidgets = useSelector(selectActiveWidgets);
  const portalNodes = useContext(portalNodesContext);

  return (
    <>
      {portalNodes &&
        activeWidgets.map((widget) => (
          <InPortal
            key={`portal-${widget.id}`}
            node={portalNodes.widgetPortalNodes[widget.id]}
          >
            <Widget widgetId={widget.id} />
          </InPortal>
        ))}
    </>
  );
};

export default Widgets;
