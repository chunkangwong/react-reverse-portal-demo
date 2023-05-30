import { DataGrid } from "@mui/x-data-grid";
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
            <DataGrid
              rows={new Array(count).fill(0).map((_, i) => ({
                id: i,
                col1: `col1-${i}`,
                col2: `col2-${i}`,
                col3: `col3-${i}`,
              }))}
              columns={[
                { field: "col1", headerName: "Column 1", width: 150 },
                { field: "col2", headerName: "Column 2", width: 150 },
                { field: "col3", headerName: "Column 3", width: 150 },
              ]}
            />
          </div>
        </InPortal>
      ) : null}
    </div>
  );
};

export default Widget;
