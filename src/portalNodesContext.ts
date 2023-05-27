import { createContext } from "react";
import { HtmlPortalNode } from "react-reverse-portal";

export type PortalNodes = Record<number, HtmlPortalNode>;

const portalNodesContext = createContext<PortalNodes | null>(null);

export default portalNodesContext;
