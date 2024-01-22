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
    line = line || Globals.canvas.addLineBetweenElements(this.canvasElement, connection.getCanvasElement(), 5, 'yellow');
    this.connections.push({ element: connection, line });
    if (!line) connection.createConnection(this, line);
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