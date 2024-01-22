import { CanvasCoords } from "../core/canvas/CanvasCoords";
import { CanvasElement } from "../core/canvas/CanvasElement";
import { CanvasLine } from "../core/canvas/CanvasLine";
import { NetzlerElement } from "./classes/NetzlerElement";
import { Globals } from "./globals";
import { NetzlerConnection } from "./netzlertypes";

export type NetzlerFunction = (mousecoords: CanvasCoords) => void;

export const moveTool: NetzlerFunction = (mousecoords: CanvasCoords): void => {
  console.log(mousecoords, 'moveTool');
};

export const selectionTool: NetzlerFunction = (mousecoords: CanvasCoords): void => {
  console.log(mousecoords, 'selectionTool');
};

export const deleteTool: NetzlerFunction = (mousecoords: CanvasCoords): void => {
  const lines: CanvasLine[] = Globals.canvas.getLinesCopy();
  lines.forEach((line: CanvasLine) => {
    if (line.isPointInLine(mousecoords)) {
      const elements: NetzlerElement[] = Globals.elements;
      elements.forEach((element: NetzlerElement) => {
        element.getConnectionsCopy().forEach((connection: NetzlerConnection) => {
          if (connection.line === line) {
            element.removeConnection(connection.element);
          }
        });
      });
    }
  });
};

let selectedElement: NetzlerElement | undefined;

export const cableTool: NetzlerFunction = (mousecoords: CanvasCoords): void => {
  const elements: NetzlerElement[] = Globals.elements;
  elements.forEach((element: NetzlerElement) => {
    const canvasElement: CanvasElement = element.getCanvasElement();
    if (canvasElement.isPointInElement(mousecoords)) {
      if (selectedElement) {
        selectedElement.createConnection(element);
        selectedElement = undefined;
        return;
      }
      selectedElement = element;
    }
  });
};