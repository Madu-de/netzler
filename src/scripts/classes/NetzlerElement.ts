import { CanvasElement } from "../../core/canvas/CanvasElement";
import { CanvasLine } from "../../core/canvas/CanvasLine";
import { Globals } from "../globals";
import { NetzlerConnection } from "../netzlertypes";

export class NetzlerElement {
  private canvasElement: CanvasElement;
  private connections: NetzlerConnection[];
  selected: boolean = false;

  constructor(canvasElement: CanvasElement) {
    this.canvasElement = canvasElement;
    this.connections = [];
  }

  getCanvasElement(): CanvasElement {
    return this.canvasElement;
  }

  getConnectionsCopy(): NetzlerConnection[] {
    return [...this.connections];
  }

  createConnection(connection: NetzlerElement, line?: CanvasLine): void {
    if (this.connections.some((nconnection: NetzlerConnection) => nconnection.element.getCanvasElement().id === connection.getCanvasElement().id)) {
      throw new Error('Connection already exists');
    }
    const drawedLine: CanvasLine = line || Globals.canvas.addLineBetweenElements(this.canvasElement, connection.getCanvasElement(), 7, 'black');
    this.connections.push({ element: connection, line: drawedLine });
    if (!line) connection.createConnection(this, drawedLine);
  }

  removeConnection(connection: NetzlerElement, internal?: boolean): void {
    const removedLine: CanvasLine = this.connections.find((c: NetzlerConnection) => c.element === connection).line;
    this.connections = this.connections.filter((c: NetzlerConnection) => c.element !== connection);
    if (!internal) {
      Globals.canvas.removeLine(removedLine);
      connection.removeConnection(this, true);
    }
  }
}