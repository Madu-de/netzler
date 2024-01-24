import { CanvasElement } from "../../core/canvas/CanvasElement";
import { NetzlerElement } from "../classes/NetzlerElement";
import { NetzlerPopup } from '../classes/NetzlerPopup';
import pcTemplate from '../../popup-templates/pc-template.html';
import { NetzlerLevel } from '../classes/NetzlerLevel';
import { Globals } from "../globals";

const pcCanvasElement: CanvasElement = new CanvasElement(100, 100, <HTMLImageElement>document.getElementById('pcpng'), 100, 100);
const pc: NetzlerElement = new NetzlerElement(pcCanvasElement, new NetzlerPopup('PC', pcTemplate));
pc.setMaxConnections(1);
const pcCanvasElement2: CanvasElement = new CanvasElement(200, 200, <HTMLImageElement>document.getElementById('laptoppng'), 80, 80);
const pc2: NetzlerElement = new NetzlerElement(pcCanvasElement2, new NetzlerPopup('Laptop', 'test123'));
pc2.setMaxConnections(1);
const pcCanvasElement3: CanvasElement = new CanvasElement(500, 250, <HTMLImageElement>document.getElementById('switchpng'), 120, 120);
const pc3: NetzlerElement = new NetzlerElement(pcCanvasElement3, new NetzlerPopup('Switch', 'test123'));

const pcSolution: NetzlerElement = new NetzlerElement(pcCanvasElement, new NetzlerPopup('PC', pcTemplate), pcCanvasElement.id);
const pc2Solution: NetzlerElement = new NetzlerElement(pcCanvasElement2, new NetzlerPopup('Laptop', 'test123'), pcCanvasElement2.id);
const pc3Solution: NetzlerElement = new NetzlerElement(pcCanvasElement3, new NetzlerPopup('Switch', 'test123'), pcCanvasElement3.id);

pcSolution.createConnection(pc3Solution, undefined, false);
pc3Solution.createConnection(pc2Solution, undefined, false);

Globals.currentLevel = new NetzlerLevel([{
  message: 'Moin! Ich bin die Ente!'
}, { 
  message: 'Jetzt zeige ich dir die Elemente', 
  action: (): void => { 
    Globals.currentLevel.renderElements(); 
  } 
}, {
  message: 'Hier könnte Ihre Werbung stehen',
  action: (): void => {
    console.log(Globals.currentLevel.isLevelFinished());
  }
}], [
  pc, 
  pc2, 
  pc3
], [
  pcSolution, 
  pc2Solution,
  pc3Solution
]);
Globals.currentLevel.init();