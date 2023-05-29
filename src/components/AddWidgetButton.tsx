import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { addWidget } from "../store/widget.slice";

const AddWidgetButton = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddWidget = () => {
    dispatch(addWidget());
  };
  return (
    <button className="add-widget-btn" onClick={handleAddWidget}>
      Add Widget
    </button>
  );
};

export default AddWidgetButton;
