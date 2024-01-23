import { Canvas } from "../core/canvas/Canvas";
import { NetzlerElement } from "./classes/NetzlerElement";
import { NetzlerTool } from "./netzlertypes";

export class Globals {
  static selectedTool: NetzlerTool;
  static canvasElement: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
  static canvas: Canvas = new Canvas(this.canvasElement);
  static elements: NetzlerElement[] = [];
}