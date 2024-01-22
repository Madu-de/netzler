import { Globals } from './globals';
import { CanvasCoords } from './../core/canvas/CanvasCoords';
import { CanvasElement } from "../core/canvas/CanvasElement";
import { NetzlerElement } from "./classes/NetzlerElement";
import { NetzlerTool } from './netzlertypes';
import { selectionTool, moveTool, deleteTool, cableTool } from './NetzlerFunctions';


// Canvas example
const pcCanvasElement: CanvasElement = new CanvasElement(100, 100, <HTMLImageElement>document.getElementById('pcpng'), 100, 100);
const pc: NetzlerElement = new NetzlerElement(pcCanvasElement);
const pcCanvasElement2: CanvasElement = new CanvasElement(200, 200, <HTMLImageElement>document.getElementById('laptoppng'), 80, 80);
const pc2: NetzlerElement = new NetzlerElement(pcCanvasElement2);
const pcCanvasElement3: CanvasElement = new CanvasElement(500, 250, <HTMLImageElement>document.getElementById('switchpng'), 120, 120);
const pc3: NetzlerElement = new NetzlerElement(pcCanvasElement3);
Globals.canvas.addElement(pc.getCanvasElement());
Globals.canvas.addElement(pc2.getCanvasElement());
Globals.canvas.addElement(pc3.getCanvasElement());
Globals.elements = [pc, pc2, pc3];
Globals.canvas.render();

function switchTool(tool: NetzlerTool): void {
  Globals.selectedTool = tool;
  const toolCursorImages: Map<NetzlerTool, HTMLImageElement> = new Map<NetzlerTool, HTMLImageElement>([
    ['selection', <HTMLImageElement>document.getElementById('selection-image')],
    ['move', <HTMLImageElement>document.getElementById('move-image')],
    ['delete', <HTMLImageElement>document.getElementById('delete-image')],
    ['cable', <HTMLImageElement>document.getElementById('cable-image')],
  ]);
  Globals.canvasElement.style.cursor = `url('${toolCursorImages.get(tool).src}') 25 15, auto`;
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