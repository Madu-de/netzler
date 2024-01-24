import { CanvasLine } from "../core/canvas/CanvasLine";
import { NetzlerElement } from "./classes/NetzlerElement";

export type NetzlerTool = 'selection' | 'move' | 'delete' | 'cable';
export type NetzlerConnection = { element: NetzlerElement, line: CanvasLine };
export type NetzlerLevelAction = { message: string, action?: Function };