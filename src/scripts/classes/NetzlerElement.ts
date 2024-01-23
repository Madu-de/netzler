import { NetzlerPopup } from './NetzlerPopup';
import { CanvasElement } from "../../core/canvas/CanvasElement";
import { CanvasLine } from "../../core/canvas/CanvasLine";
import { Globals } from "../globals";
import { NetzlerConnection } from "../netzlertypes";
import { togglePopup } from '../NetzlerFunctions';

export class NetzlerElement {
  private canvasElement: CanvasElement;
  private connections: NetzlerConnection[];
  private netzlerPopup: NetzlerPopup;
  selected: boolean = false;
  settings: Map<string, string> = new Map<string, string>();

  constructor(canvasElement: CanvasElement, netzlerPopup: NetzlerPopup) {
    this.canvasElement = canvasElement;
    this.connections = [];
    this.netzlerPopup = netzlerPopup;
  }

  getCanvasElement(): CanvasElement {
    return this.canvasElement;
  }

  getConnectionsCopy(): NetzlerConnection[] {
    return [...this.connections];
  }

  popup(): void {
    togglePopup(this.netzlerPopup.getName(), this.netzlerPopup.getBody(), this);
  }

  createConnection(connection: NetzlerElement, line?: CanvasLine): void {
    if (this.connections.some((nconnection: NetzlerConnection) => nconnection.element.getCanvasElement().id === connection.getCanvasElement().id)) {
      throw new Error('Connection already exists');
    }
    if (this.canvasElement.id === connection.canvasElement.id) {
      throw new Error('Cannot connect to self');
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