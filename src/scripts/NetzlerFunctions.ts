import { CanvasCoords } from "../core/canvas/CanvasCoords";

export type NetzlerFunction = (mousecoords: CanvasCoords) => void;

export const moveTool: NetzlerFunction = (mousecoords: CanvasCoords): void => {
  console.log(mousecoords, 'moveTool');
};

export const selectionTool: NetzlerFunction = (mousecoords: CanvasCoords): void => {
  console.log(mousecoords, 'selectionTool');
};

export const deleteTool: NetzlerFunction = (mousecoords: CanvasCoords): void => {
  console.log(mousecoords, 'deleteTool');
};

export const cableTool: NetzlerFunction = (mousecoords: CanvasCoords): void => {
  console.log(mousecoords, 'cableTool');
};