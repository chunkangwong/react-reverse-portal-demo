import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { selectWidgets, toggleWidget } from "../store/widget.slice";

const WidgetButtons = () => {
  const dispatch = useDispatch<AppDispatch>();
  const widgets = useSelector(selectWidgets);

  const handleWidgetBtnClick = (id: string) => () => {
    dispatch(toggleWidget(id));
  };

  return (
    <List className="widget-buttons">
      {widgets.map((widget) => {
        return (
          <ListItemButton
            key={`widget-btn-${widget.id}`}
            onClick={handleWidgetBtnClick(widget.id)}
            selected={widget.active}
          >
            <ListItemText primary={`Widget ${widget.id}`} />
          </ListItemButton>
        );
      })}
    </List>
  );
};

export default WidgetButtons;
