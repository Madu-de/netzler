import { Globals } from './globals';
import { CanvasCoords } from './../core/canvas/CanvasCoords';
import { CanvasElement } from "../core/canvas/CanvasElement";
import { NetzlerElement } from "./classes/NetzlerElement";
import { NetzlerTool } from './netzlertypes';
import { selectionTool, moveTool, deleteTool, cableTool } from './NetzlerFunctions';


// Canvas example
const pcCanvasElement: CanvasElement = new CanvasElement(100, 100, <HTMLImageElement>document.getElementById('pcpng'), 50, 50);
const pc: NetzlerElement = new NetzlerElement(pcCanvasElement);
const pcCanvasElement2: CanvasElement = new CanvasElement(200, 200, <HTMLImageElement>document.getElementById('pcpng'), 50, 50);
const pc2: NetzlerElement = new NetzlerElement(pcCanvasElement2);
Globals.canvas.addElement(pc.getCanvasElement());
Globals.canvas.addElement(pc2.getCanvasElement());
Globals.elements = [pc, pc2];
Globals.canvas.render();

function switchTool(tool: NetzlerTool): void {
  Globals.selectedTool = tool;
} 

document.querySelectorAll('.toolbar-item').forEach((item: HTMLElement) => {
  item.addEventListener('click', () => {
    switchTool(<NetzlerTool>item.id);
  });
});

Globals.canvasElement.addEventListener('click', (ev: MouseEvent) => {
  const mousecoords: CanvasCoords = Globals.canvas.getCanvasMouseCoords(ev);
  const toolMethods: Map<NetzlerTool, Function> = new Map<NetzlerTool, Function>([
    ['selection', selectionTool],
    ['move', moveTool],
    ['delete', deleteTool],
    ['cable', cableTool],
  ]);
  toolMethods.get(Globals.selectedTool)(mousecoords);
});