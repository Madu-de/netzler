import { CanvasElement } from '../../core/canvas/CanvasElement';
import { NetzlerElement } from '../classes/NetzlerElement';
import { NetzlerLevel } from '../classes/NetzlerLevel';
import { Globals } from "../globals";
import switchTemplate from "../../popup-templates/switch-interface.html";
import { NetzlerPopup } from '../classes/NetzlerPopup';

const pcCanvasElement: CanvasElement = new CanvasElement(100, 50, <HTMLImageElement>document.getElementById('pcpng'), 100, 100);
const pc: NetzlerElement = new NetzlerElement(pcCanvasElement, new NetzlerPopup('PC', 'Keine Konfiguration in diesem Level notwendig!'));
pc.setMaxConnections(1);
const pcCanvasElement2: CanvasElement = new CanvasElement(100, 250, <HTMLImageElement>document.getElementById('laptoppng'), 80, 80);
const pc2: NetzlerElement = new NetzlerElement(pcCanvasElement2, new NetzlerPopup('Laptop', 'Keine Konfiguration in diesem Level notwendig!'));
pc2.setMaxConnections(1);
const switchCanvasElement: CanvasElement = new CanvasElement(500, 150, <HTMLImageElement>document.getElementById('switchpng'), 120, 120);
const switchEl: NetzlerElement = new NetzlerElement(switchCanvasElement, new NetzlerPopup('Switch', switchTemplate));

const pcSolution: NetzlerElement = new NetzlerElement(pcCanvasElement, new NetzlerPopup('PC', 'Keine Konfiguration in diesem Level notwendig!'), pcCanvasElement.id);
const pc2Solution: NetzlerElement = new NetzlerElement(pcCanvasElement2, new NetzlerPopup('Laptop', 'Keine Konfiguration in diesem Level notwendig!'), pcCanvasElement2.id);
const switchElSolution: NetzlerElement = new NetzlerElement(switchCanvasElement, new NetzlerPopup('Switch', switchTemplate), switchCanvasElement.id);

pcSolution.createConnection(switchElSolution, undefined, false);
pc2Solution.createConnection(switchElSolution, undefined, false);

switchElSolution.settings.set('enable', '1');
switchElSolution.settings.set('configure', '2');
switchElSolution.settings.set('interface1', '3');
switchElSolution.settings.set('switchport1', '4');
switchElSolution.settings.set('interface2', '5');
switchElSolution.settings.set('switchport2', '6');

export const level4: NetzlerLevel = new NetzlerLevel([{
  message: 'Grandios *Quark*! Es gibt jetzt auf dem Switch ein Netz für die Minecraft Spieler und ein Netz für die Couterstrike Spieler. Damit diese nicht auf das Netz des Anderen zugreifen können.'
}, {
  message: 'Aber woher weiß der Switch denn jetzt welcher PC zu welchem Netz gehört?',
},{
  message: 'Das teilst du dem Switch mit indem du die Ports den jeweiligen VLANS zuweist.',
},{
  message: `Dafür klickst du wieder den Switch an. Die Befehlsreihenfolge zum zuweisen der Ports zu den VLANs ist:<br>
  enable<br>
  configure terminal<br>
  interface <b><i>interface</b></i><br>
  switchport mode access<br>
  switchport access vlan <b><i>nummer des vlans</b></i>`,
}, {
  message: `Der erste PC, den du mit dem Switch verbindest, wird an dem Interface/Port <b>f0/1</b> eingesteckt und soll dem VLAN <b>Minecraft</b> zugeordnet werden. Der zweite PC, den du mit dem Switch verbindest, wird an dem Interface/Port <b>f0/2</b> eingesteckt und soll dem VLAN <b>Counter-Stricke</b> zugeordnet werden.<br>
  Zur Erinnerung, die Befehle müssen in dieser Reihenfolge eingegeben werden:<br>
  enable<br>
  configure terminal<br>
  interface <b><i>interface</b></i><br>
  switchport mode access<br>
  switchport access vlan <b><i>nummer des vlans</b></i>`,
  action: (): void => { 
    Globals.currentLevel.renderElements();
  }
}], [
  pc,
  pc2,
  switchEl
], [
  switchElSolution
]);