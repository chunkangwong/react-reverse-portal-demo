import { createContext } from "react";
import { HtmlPortalNode } from "react-reverse-portal";

export type PortalNodes = Record<string, HtmlPortalNode>;

const portalNodesContext = createContext<{
  widgetPortalNodes: PortalNodes;
  resultPortalNodes: PortalNodes;
} | null>(null);

export default portalNodesContext;
