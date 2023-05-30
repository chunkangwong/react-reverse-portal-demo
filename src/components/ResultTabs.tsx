import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { setResultTabValue } from "../store/result.slice";
import { AppDispatch, RootState } from "../store/store";

const ResultTabs = () => {
  const { results, resultTabValue } = useSelector(
    (state: RootState) => state.result
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleTabChange = (
    _: React.SyntheticEvent<Element, Event>,
    newValue: number
  ) => {
    dispatch(setResultTabValue(newValue));
  };

  return (
    <Tabs
      className="result-tabs"
      value={resultTabValue}
      onChange={handleTabChange}
    >
      {results.map((result) => {
        const { widgetId, title } = result;
        return <Tab key={`result-${widgetId}`} label={title} />;
      })}
    </Tabs>
  );
};

export default ResultTabs;
