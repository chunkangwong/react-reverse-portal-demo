import { useContext } from "react";
import { useSelector } from "react-redux";
import { OutPortal } from "react-reverse-portal";
import portalNodesContext from "../context/portalNodesContext";
import { selectCurrentResultId } from "../store/result.slice";

const ResultContainer = () => {
  const portalNodes = useContext(portalNodesContext);
  const currentResultId = useSelector(selectCurrentResultId);

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
