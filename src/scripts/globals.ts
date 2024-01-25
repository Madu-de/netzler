import { Canvas } from "../core/canvas/Canvas";
import { NetzlerElement } from "./classes/NetzlerElement";
import { NetzlerLevel } from "./classes/NetzlerLevel";
import { NetzlerTool } from "./netzlertypes";

export class Globals {
  static selectedTool: NetzlerTool;
  static canvasElement: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
  static canvas: Canvas = new Canvas(this.canvasElement);
  static elements: NetzlerElement[] = [];

  static currentPopupNetzlerElement: NetzlerElement;
  static currentLevel: NetzlerLevel;

  static confettiCanvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('confetticanvas');
  static finished: boolean = false;
  static username: string = 'Max Mustermann';
  static cheated: boolean = false;
}