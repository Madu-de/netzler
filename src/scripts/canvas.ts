import { Globals } from './globals';
import { CanvasCoords } from './../core/canvas/CanvasCoords';
import { CanvasElement } from "../core/canvas/CanvasElement";
import { NetzlerElement } from "./classes/NetzlerElement";
import { NetzlerTool } from './netzlertypes';
import { selectionTool, moveTool, deleteTool, cableTool, togglePopup, switchTool } from './NetzlerFunctions';
import { NetzlerPopup } from './classes/NetzlerPopup';
import pcTemplate from '../popup-templates/pc-template.html';

// Canvas example
const pcCanvasElement: CanvasElement = new CanvasElement(100, 100, <HTMLImageElement>document.getElementById('pcpng'), 100, 100);
const pc: NetzlerElement = new NetzlerElement(pcCanvasElement, new NetzlerPopup('PC', pcTemplate));
const pcCanvasElement2: CanvasElement = new CanvasElement(200, 200, <HTMLImageElement>document.getElementById('laptoppng'), 80, 80);
const pc2: NetzlerElement = new NetzlerElement(pcCanvasElement2, new NetzlerPopup('Laptop', 'test123'));
const pcCanvasElement3: CanvasElement = new CanvasElement(500, 250, <HTMLImageElement>document.getElementById('switchpng'), 120, 120);
const pc3: NetzlerElement = new NetzlerElement(pcCanvasElement3, new NetzlerPopup('Switch', 'test123'));
Globals.canvas.addElement(pc.getCanvasElement());
Globals.canvas.addElement(pc2.getCanvasElement());
Globals.canvas.addElement(pc3.getCanvasElement());
Globals.elements = [pc, pc2, pc3];
Globals.canvas.render();
switchTool('selection');

document.querySelectorAll('.toolbar-item').forEach((item: HTMLElement) => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.toolbar-item').forEach((item: HTMLElement) => item.classList.remove('selected'));
    item.classList.add('selected');
    switchTool(<NetzlerTool>item.id);
  });
});

document.querySelectorAll('.popup-close-element').forEach((item: HTMLElement) => {
  item.addEventListener('click', () => {
    togglePopup();
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