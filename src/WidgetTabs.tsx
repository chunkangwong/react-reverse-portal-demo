import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import { selectActiveWidgets, setCurrentWidgetId } from "./store/widget.slice";

const WidgetTabs = () => {
  const activeWidgets = useSelector(selectActiveWidgets);
  const currentWidgetId = useSelector(
    (state: RootState) => state.widget.currentWidgetId
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleWidgetTabClick = (id: string) => () => {
    dispatch(setCurrentWidgetId(id));
  };

  return (
    <div className="widget.tab-list">
      {activeWidgets.map((widget) => (
        <button
          key={`widget-tab-${widget.id}`}
          onClick={handleWidgetTabClick(widget.id)}
          style={{
            backgroundColor: currentWidgetId === widget.id ? "green" : "red",
          }}
        >
          Widget {widget.id}
        </button>
      ))}
    </div>
  );
};

export default WidgetTabs;
