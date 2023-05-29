import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentResultId } from "../store/result.slice";
import { AppDispatch, RootState } from "../store/store";

const ResultTabs = () => {
  const results = useSelector((state: RootState) => state.result.results);
  const dispatch = useDispatch<AppDispatch>();

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (
    _: React.SyntheticEvent<Element, Event>,
    newValue: number
  ) => {
    setTabValue(newValue);
    dispatch(setCurrentResultId(results[newValue].id));
  };

  return (
    <Tabs className="result-tabs" value={tabValue} onChange={handleTabChange}>
      {results.map((result) => {
        const { widgetId, title } = result;
        return <Tab key={`result-${widgetId}`} label={title} />;
      })}
    </Tabs>
  );
};

export default ResultTabs;
