import { useContext } from "react";
import { useSelector } from "react-redux";
import { OutPortal } from "react-reverse-portal";
import portalNodesContext from "../context/portalNodesContext";
import { RootState } from "../store/store";

const ResultContainer = () => {
  const portalNodes = useContext(portalNodesContext);
  const currentResultId = useSelector(
    (state: RootState) => state.result.currentResultId
  );

  return (
    <div className="result-container">
      {currentResultId &&
      portalNodes &&
      portalNodes.resultPortalNodes[currentResultId] ? (
        <OutPortal node={portalNodes.resultPortalNodes[currentResultId]} />
      ) : null}
    </div>
  );
};

export default ResultContainer;
