import { CanvasCoords } from "../core/canvas/CanvasCoords";
import { CanvasElement } from "../core/canvas/CanvasElement";
import { NetzlerElement } from "./classes/NetzlerElement";
import { Globals } from "./globals";
import { CanvasLine } from "../core/canvas/CanvasLine";
import { NetzlerConnection } from "./netzlertypes";

export type NetzlerFunction = (mousecoords: CanvasCoords) => void;

let followElement: CanvasElement;

export const moveTool: NetzlerFunction = (mousecoords: CanvasCoords): void => {
  const elements: NetzlerElement[] = Globals.elements;
  if (followElement) {
    Globals.canvasElement.removeEventListener('mousemove', followMouse);
      
    followElement = undefined;
  } else {
    elements.forEach((nelement: NetzlerElement) => {
      const element: CanvasElement = nelement.getCanvasElement();
      if (element.isPointInElement(mousecoords)) {
        followElement = element;
        if (followElement) {
          Globals.canvasElement.addEventListener('mousemove', followMouse);
        } 
      }
    });
  }
};

export const selectionTool: NetzlerFunction = (mousecoords: CanvasCoords): void => {
  const elements: NetzlerElement[] = Globals.elements;
  elements.forEach((element: NetzlerElement) => {
    if (element.getCanvasElement().isPointInElement(mousecoords)) {
      element.selected = true;
    }
  });
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

function followMouse(ev: MouseEvent): void {
  const mousecoords: CanvasCoords = Globals.canvas.getCanvasMouseCoords(ev);
  followElement.getCoords().setX(mousecoords.getX() - (followElement.getWidth() / 2));
  followElement.getCoords().setY(mousecoords.getY() - (followElement.getHeight() / 2));
}