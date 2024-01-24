import { NetzlerPopup } from './NetzlerPopup';
import { CanvasElement } from "../../core/canvas/CanvasElement";
import { CanvasLine } from "../../core/canvas/CanvasLine";
import { Globals } from "../globals";
import { NetzlerConnection } from "../netzlertypes";
import { togglePopup } from '../NetzlerFunctions';

export class NetzlerElement {
  private canvasElement: CanvasElement;
  private connections: NetzlerConnection[];
  private maxConnections: number;
  private netzlerPopup: NetzlerPopup;
  selected: boolean = false;
  settings: Map<string, string> = new Map<string, string>();


  constructor(canvasElement: CanvasElement, netzlerPopup: NetzlerPopup, id?: number) {
    this.canvasElement = canvasElement;
    this.connections = [];
    this.netzlerPopup = netzlerPopup;
    this.canvasElement.id = id || this.canvasElement.id;
  }

  getCanvasElement(): CanvasElement {
    return this.canvasElement;
  }

  setMaxConnections(maxConnections: number): void {
    this.maxConnections = maxConnections;
  }

  getMaxConnections(): number {
    return this.maxConnections;
  }

  getConnectionsCopy(): NetzlerConnection[] {
    return [...this.connections];
  }

  clearConnections(): void {
    this.connections = [];
  }

  popup(): void {
    togglePopup(this.netzlerPopup.getName(), this.netzlerPopup.getBody(), this);
  }

  createConnection(connection: NetzlerElement, line?: CanvasLine, draw: boolean = true, secoundIntern: boolean = false): void {
    if (this.connections.some((nconnection: NetzlerConnection) => nconnection.element.getCanvasElement().id === connection.getCanvasElement().id)) {
      throw new Error('Diese Verbindung existiert bereits!');
    }
    if (this.canvasElement.id === connection.canvasElement.id) {
      throw new Error('Elemente können nicht mit sich selbst verbunden werden!');
    }
    if (!line && (this.getConnectionsCopy().length === this.getMaxConnections() || connection.getConnectionsCopy().length === connection.getMaxConnections())) {
      throw new Error('Keine Ports mehr verfügbar!');
    }
    const drawedLine: CanvasLine = line || (draw && !secoundIntern ? Globals.canvas.addLineBetweenElements(this.canvasElement, connection.getCanvasElement(), 7, 'black') : undefined);
    this.connections.push({ element: connection, line: drawedLine });
    if (!line && !secoundIntern) connection.createConnection(this, drawedLine, !draw, true);
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