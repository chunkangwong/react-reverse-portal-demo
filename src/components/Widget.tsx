import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { InPortal } from "react-reverse-portal";
import portalNodesContext from "../context/portalNodesContext";
import { addResult } from "../store/result.slice";
import { AppDispatch } from "../store/store";

interface WidgetProps {
  widgetId: string;
}

const Widget = ({ widgetId }: WidgetProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const portalNodes = useContext(portalNodesContext);
  const [count, setCount] = useState(0);

  const handleSearch = () => {
    setCount(count + 1);
    dispatch(
      addResult({
        widgetId,
        title: `Result from widget ${widgetId}`,
      })
    );
  };

  return (
    <div>
      <h3>Widget {widgetId}</h3>
      <button onClick={handleSearch}>Search</button>
      {portalNodes &&
      portalNodes.resultPortalNodes[
        `${widgetId}-Result from widget ${widgetId}`
      ] ? (
        <InPortal
          node={
            portalNodes.resultPortalNodes[
              `${widgetId}-Result from widget ${widgetId}`
            ]
          }
        >
          <div>
            <h1>Widget {widgetId}</h1>
            <p>Count: {count}</p>
          </div>
        </InPortal>
      ) : null}
    </div>
  );
};

export default Widget;
