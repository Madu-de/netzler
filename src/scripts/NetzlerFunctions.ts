import { CanvasCoords } from "../core/canvas/CanvasCoords";
import { CanvasElement } from "../core/canvas/CanvasElement";
import { Globals } from "./globals";

export type NetzlerFunction = (mousecoords: CanvasCoords) => void;

export const moveTool: NetzlerFunction = (mousecoords: CanvasCoords): void => {
  let elements: CanvasElement[] =  Globals.canvas.getElementsCopy();
  elements.forEach(() =>{
    
  });
};

export const selectionTool: NetzlerFunction = (mousecoords: CanvasCoords): void => {
  console.log(mousecoords, 'selectionTool');
};

export const deleteTool: NetzlerFunction = (mousecoords: CanvasCoords): void => {
  console.log(mousecoords, 'deleteTool');
};

export const cableTool: NetzlerFunction = (mousecoords: CanvasCoords): void => {
  
};