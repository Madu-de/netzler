import { CanvasCoords } from "../core/canvas/CanvasCoords";
import { CanvasElement } from "../core/canvas/CanvasElement";
import { NetzlerElement } from "./classes/NetzlerElement";
import { Globals } from "./globals";
import { CanvasLine } from "../core/canvas/CanvasLine";
import { NetzlerConnection, NetzlerTool } from "./netzlertypes";

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

export function togglePopup(): void {
  const popup: HTMLElement = <HTMLElement>document.getElementById('popup');
  const blur: HTMLElement = <HTMLElement>document.getElementById('pop-up-blur');
  popup.classList.toggle('hidden');
  blur.classList.toggle('hidden');
}

export const selectionTool: NetzlerFunction = (mousecoords: CanvasCoords): void => {
  const elements: NetzlerElement[] = Globals.elements;
  elements.forEach((element: NetzlerElement) => {
    if (element.getCanvasElement().isPointInElement(mousecoords)) {
      togglePopup();
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
        try {
          selectedElement.createConnection(element);
        } catch (error) {
          console.error(error.message, '- Selected element will be removed');
        } finally {
          selectedElement = undefined;
        }
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

export function switchTool(tool: NetzlerTool): void {
  Globals.selectedTool = tool;
  const toolCursorImages: Map<NetzlerTool, HTMLImageElement> = new Map<NetzlerTool, HTMLImageElement>([
    ['selection', <HTMLImageElement>document.getElementById('selection-image')],
    ['move', <HTMLImageElement>document.getElementById('move-image')],
    ['delete', <HTMLImageElement>document.getElementById('delete-image')],
    ['cable', <HTMLImageElement>document.getElementById('cable-image')],
  ]);
  Globals.canvasElement.style.cursor = `url('${toolCursorImages.get(tool).src}') 15 15, auto`;
}