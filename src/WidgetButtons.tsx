import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "./store/store";
import { selectWidgets, toggleWidget } from "./store/widget.slice";

const WidgetButtons = () => {
  const dispatch = useDispatch<AppDispatch>();
  const widgets = useSelector(selectWidgets);

  const handleWidgetBtnClick = (id: number) => () => {
    dispatch(toggleWidget(id));
  };

  return (
    <div className="widget-button-list">
      {widgets.map((widget) => {
        return (
          <button
            key={`widget-btn-${widget.id}`}
            onClick={handleWidgetBtnClick(widget.id)}
            style={{
              backgroundColor: widget.active ? "green" : "red",
            }}
          >
            Widget {widget.id}
          </button>
        );
      })}
    </div>
  );
};

export default WidgetButtons;
