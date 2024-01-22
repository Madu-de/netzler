import { CanvasElement } from "../../core/canvas/CanvasElement";
import { CanvasLine } from "../../core/canvas/CanvasLine";
import { Globals } from "../globals";

export class NetzlerElement {
  private canvasElement: CanvasElement;
  private connections: {element: NetzlerElement, line: CanvasLine}[];

  constructor(canvasElement: CanvasElement) {
    this.canvasElement = canvasElement;
    this.connections = [];
  }

  getCanvasElement(): CanvasElement {
    return this.canvasElement;
  }

  createConnection(connection: NetzlerElement): void {
    const line: CanvasLine = Globals.canvas.addLineBetweenElements(this.canvasElement, connection.getCanvasElement());
    this.connections.push({ element: connection, line });
  }
}