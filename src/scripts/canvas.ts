import { Globals } from './globals';
import { CanvasCoords } from './../core/canvas/CanvasCoords';
import { NetzlerTool } from './netzlertypes';
import { selectionTool, moveTool, deleteTool, cableTool, togglePopup, switchTool } from './NetzlerFunctions';

// Canvas example
import './levels/level1';
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
  item.addEventListener('click', () => togglePopup());
});

document.querySelector('.button-success').addEventListener('click', () => {
  const popup: HTMLElement = <HTMLElement>document.getElementById('popup');
  Globals.currentPopupNetzlerElement.settings.clear();
  popup.querySelector('.popup-body').querySelectorAll('.netzler-popup-item').forEach((item: HTMLElement) => {
    Globals.currentPopupNetzlerElement.settings.set(item.getAttribute('name'), item['value'] || item.getAttribute('value'));
  });
  Globals.currentPopupNetzlerElement = undefined;
  togglePopup();
});

document.querySelector('#character-message-box').addEventListener('click', () => {
  Globals.currentLevel.triggerNewAction();
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