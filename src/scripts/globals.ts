import { Canvas } from "../core/canvas/Canvas";
import { NetzlerTool } from "./netzlertypes";

export class Globals {
  static selectedTool: NetzlerTool = 'selection';
  static canvasElement: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
  static canvas: Canvas = new Canvas(this.canvasElement);
}