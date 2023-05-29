import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { setCurrentResultId } from "../store/result.slice";

const ResultTabs = () => {
  const { results, currentResultId } = useSelector(
    (state: RootState) => state.result
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleResultTabClick = (id: string) => () => {
    dispatch(setCurrentResultId(id));
  };

  return (
    <div className="result-tabs">
      {results.map((result) => {
        const { widgetId, title, id } = result;
        return (
          <button
            key={`result-${widgetId}`}
            style={{
              backgroundColor: currentResultId === id ? "green" : "red",
            }}
            onClick={handleResultTabClick(id)}
          >
            {title}
          </button>
        );
      })}
    </div>
  );
};

export default ResultTabs;
