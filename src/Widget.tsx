import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/store";
import { addResult } from "./store/result.slice";

interface WidgetProps {
  widgetId: string;
}

const Widget = ({ widgetId }: WidgetProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleSearch = () => {
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
    </div>
  );
};

export default Widget;
