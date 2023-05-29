import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { SyntheticEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { selectActiveWidgets, setCurrentWidgetId } from "../store/widget.slice";

const WidgetTabs = () => {
  const activeWidgets = useSelector(selectActiveWidgets);
  const dispatch = useDispatch<AppDispatch>();

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (
    _: SyntheticEvent<Element, Event>,
    newValue: number
  ) => {
    setTabValue(newValue);
    dispatch(setCurrentWidgetId(activeWidgets[newValue].id));
  };

  return (
    <Tabs className="widget-tabs" value={tabValue} onChange={handleTabChange}>
      {activeWidgets.map((widget) => (
        <Tab key={`widget-tab-${widget.id}`} label={`Widget ${widget.id}`} />
      ))}
    </Tabs>
  );
};

export default WidgetTabs;
