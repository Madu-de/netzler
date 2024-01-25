import { CanvasElement } from "../../core/canvas/CanvasElement";
import { NetzlerElement } from "../classes/NetzlerElement";
import { NetzlerPopup } from '../classes/NetzlerPopup';
import { NetzlerLevel } from '../classes/NetzlerLevel';
import { Globals } from "../globals";
import { level2 } from "./level2";

const pcCanvasElement: CanvasElement = new CanvasElement(100, 50, <HTMLImageElement>document.getElementById('pcpng'), 100, 100);
const pc: NetzlerElement = new NetzlerElement(pcCanvasElement, new NetzlerPopup('PC', 'Keine Konfiguration in diesem Level notwendig!'));
pc.setMaxConnections(1);
const pcCanvasElement2: CanvasElement = new CanvasElement(100, 250, <HTMLImageElement>document.getElementById('laptoppng'), 80, 80);
const pc2: NetzlerElement = new NetzlerElement(pcCanvasElement2, new NetzlerPopup('Laptop', 'Keine Konfiguration in diesem Level notwendig!'));
pc2.setMaxConnections(1);
const switchCanvasElement: CanvasElement = new CanvasElement(500, 150, <HTMLImageElement>document.getElementById('switchpng'), 120, 120);
const switchEl: NetzlerElement = new NetzlerElement(switchCanvasElement, new NetzlerPopup('Switch', 'Keine Konfiguration in diesem Level notwendig!'));

const pcSolution: NetzlerElement = new NetzlerElement(pcCanvasElement, new NetzlerPopup('PC', 'Keine Konfiguration in diesem Level notwendig!'), pcCanvasElement.id);
const pc2Solution: NetzlerElement = new NetzlerElement(pcCanvasElement2, new NetzlerPopup('Laptop', 'Keine Konfiguration in diesem Level notwendig!'), pcCanvasElement2.id);
const switchElSolution: NetzlerElement = new NetzlerElement(switchCanvasElement, new NetzlerPopup('Switch', 'Keine Konfiguration in diesem Level notwendig!'), switchCanvasElement.id);

pcSolution.createConnection(switchElSolution, undefined, false);
pc2Solution.createConnection(switchElSolution, undefined, false);

Globals.currentLevel = new NetzlerLevel([{
  message: 'Hallo *Quak*! Willkommen bei Netzler, ich bin Wilmar vom Großunternehmen IT-Service Marvin und werde dir, unserem Praktikanten, helfen verschiedene Netze aufzubauen!'
}, {
  message: ' ',
  action: (): void => {
    let name: string = '';
    do {
      name = prompt('Bevor wir beginnen, habe ich noch 2 Anliegen. Vorerst sag mir bitte deinen Namen:', '');
    } while (name === '' || name.length > 15);
    Globals.username = name;
    Globals.currentLevel.triggerNewAction();
  }
}, {
  message: `Schöner Name! Zudem möchte ich dir noch mitteilen, dass bei jedem "*Quak*" ein Speicherpunkt gesetzt wird. Hast du also etwas verpasst, kannst du mit dem <b>Zurücksetzen Werkzeug</b> zum letzten "*Quak*" zurückkehren! Solltest du gerade deinen Namen falsch eingegeben haben, kannst du es direkt mal ausprobieren! Jetzt aber viel Spaß!`
}, { 
  message: 'Lass uns doch als erstes zwei PCs über einen Switch miteinander verbinden. Um Objekte miteinander zu verbinden brauchst du das <b>Kabel Werkzeug</b> aus der Toolbar. Mit dem <b>Löschen Werkzeug</b> kannst du Kabel entfernen und mit dem <b>Bewegen Werkzeug</b> kannst du Objekte … bewegen.', 
  action: (): void => { 
    Globals.currentLevel.renderElements();
  }
}], [
  pc, 
  pc2, 
  switchEl
], [
  pcSolution, 
  pc2Solution,
  switchElSolution
], level2);
Globals.currentLevel.init();