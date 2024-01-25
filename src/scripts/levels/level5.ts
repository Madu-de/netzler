import { CanvasElement } from '../../core/canvas/CanvasElement';
import { NetzlerElement } from '../classes/NetzlerElement';
import { NetzlerLevel } from '../classes/NetzlerLevel';
import { Globals } from "../globals";
import switchTemplate from "../../popup-templates/switch-trunk.html";
import switchTemplate2 from "../../popup-templates/switch-trunk2.html";
import { NetzlerPopup } from '../classes/NetzlerPopup';
import { level6 } from './level6';

const pcCanvasElement: CanvasElement = new CanvasElement(100, 300, <HTMLImageElement>document.getElementById('pcpng'), 100, 100);
const pc: NetzlerElement = new NetzlerElement(pcCanvasElement, new NetzlerPopup('PC', 'Keine Konfiguration in diesem Level notwendig!'));
pc.setMaxConnections(1);

const pcCanvasElement2: CanvasElement = new CanvasElement(600, 300, <HTMLImageElement>document.getElementById('pcpng'), 100, 100);
const pc2: NetzlerElement = new NetzlerElement(pcCanvasElement2, new NetzlerPopup('PC2', 'Keine Konfiguration in diesem Level notwendig!'));
pc2.setMaxConnections(1);

const laptopCanvasElement: CanvasElement = new CanvasElement(100, 50, <HTMLImageElement>document.getElementById('laptoppng'), 80, 80);
const laptop: NetzlerElement = new NetzlerElement(laptopCanvasElement, new NetzlerPopup('Laptop', 'Keine Konfiguration in diesem Level notwendig!'));
laptop.setMaxConnections(1);

const laptopCanvasElement2: CanvasElement = new CanvasElement(600, 50, <HTMLImageElement>document.getElementById('laptoppng'), 80, 80);
const laptop2: NetzlerElement = new NetzlerElement(laptopCanvasElement2, new NetzlerPopup('Laptop2', 'Keine Konfiguration in diesem Level notwendig!'));
laptop2.setMaxConnections(1);

const switchCanvasElement: CanvasElement = new CanvasElement(350, 300, <HTMLImageElement>document.getElementById('switchpng'), 120, 120);
const switchEl: NetzlerElement = new NetzlerElement(switchCanvasElement, new NetzlerPopup('Switch', switchTemplate));
switchEl.setMaxConnections(3);

const switch2CanvasElement: CanvasElement = new CanvasElement(350, 50, <HTMLImageElement>document.getElementById('switchpng'), 120, 120);
const switch2El: NetzlerElement = new NetzlerElement(switch2CanvasElement, new NetzlerPopup('Switch2', switchTemplate2));
switch2El.setMaxConnections(3);

const pcSolution: NetzlerElement = new NetzlerElement(pcCanvasElement, new NetzlerPopup('PC', 'Keine Konfiguration in diesem Level notwendig!'), pcCanvasElement.id);
const pc2Solution: NetzlerElement = new NetzlerElement(pcCanvasElement2, new NetzlerPopup('PC', 'Keine Konfiguration in diesem Level notwendig!'), pcCanvasElement2.id);
const laptopSolution: NetzlerElement = new NetzlerElement(laptopCanvasElement, new NetzlerPopup('Laptop', 'Keine Konfiguration in diesem Level notwendig!'), laptopCanvasElement.id);
const laptop2Solution: NetzlerElement = new NetzlerElement(laptopCanvasElement2, new NetzlerPopup('Laptop', 'Keine Konfiguration in diesem Level notwendig!'), laptopCanvasElement2.id);
const switchElSolution: NetzlerElement = new NetzlerElement(switchCanvasElement, new NetzlerPopup('Switch', switchTemplate), switchCanvasElement.id);
const switch2ElSolution: NetzlerElement = new NetzlerElement(switch2CanvasElement, new NetzlerPopup('Switch', switchTemplate2), switch2CanvasElement.id);

pcSolution.createConnection(switchElSolution, undefined, false);
pc2Solution.createConnection(switchElSolution, undefined, false);
laptopSolution.createConnection(switch2ElSolution, undefined, false);
laptop2Solution.createConnection(switch2ElSolution, undefined, false);
switchElSolution.createConnection(switch2ElSolution, undefined, false);

switchElSolution.settings.set('enable', '1');
switchElSolution.settings.set('configure', '2');
switchElSolution.settings.set('interface', '3');
switchElSolution.settings.set('switchport1', '4');
switchElSolution.settings.set('switchport2', '5');

switch2ElSolution.settings.set('enable', '1');
switch2ElSolution.settings.set('configure', '2');
switch2ElSolution.settings.set('interface', '3');
switch2ElSolution.settings.set('switchport1', '4');
switch2ElSolution.settings.set('switchport2', '5');

export const level5: NetzlerLevel = new NetzlerLevel([{
  message: 'Das läuft ja, wie am Schnürchen *Quak*! Hast du schonmal von Trunks gehört? Nein? Lass es mich dir erklären!'
}, {
  message: 'Wir haben gerade in einem Switch verschiedene VLANs konfiguriert, damit wir ohne zusätzlicher Hardware mehrere Netze erstellen können, die ohne Router nicht miteinander kommunizieren können. Doch wie weiß jetzt ein neuer Switch oder ein Router davon, dass die Anfrage von einem bestimmten VLAN kommt um damit richtig zu interagieren? ...',
}, {
  message: 'Genau! Über den VLAN-Tag, den wir mitsenden. In diesem ist die VLAN-ID/VLAN-Nummer gespeichert. Um diesen jedoch zu verschicken, brauchen wir ein Interface, welches mehrere VLANs akzeptiert und somit über das gleiche Kabel verschickt.',
}, {
  message: 'Bis jetzt kennst du wahrscheinlich nur ein "Access"-Interface, welches nur eine VLAN-ID zulässt. Dieses haben wir vorhin eingerichtet. Wenn eine Anfrage aus diesem kommt, wird dieses auch nur über "Access"-Interfaces verschickt, welche die gleiche VLAN-ID besitzen oder über "Trunk"-Interfaces, die diese VLAN-ID erlauben.',
}, {
  message: '"Trunk"-Interfaces sind nämlich dazu da, Anfragen mit verschiedenen VLAN-IDs zu verschicken. Damit der Empfänger, der an diesem "Trunk"-Interface angeschlossen ist, weiß, von welchem VLAN diese Anfrage kommt, wird hier das vorhin genannte VLAN-Tag mitgegeben.',
}, {
  message: `Lass uns testweise einmal Trunks einrichten! Die Befehle sind ähnlich zu den Access-Interface Befehlen:<br>
    enable<br>
    configure terminal<br>
    interface <b><i>interface</b></i><br>
    switchport mode trunk<br>
    switchport trunk allowed vlan <b><i>vlanid1,vlanid2,vlanid3,...</b></i><br><br>
    Ich kümmere mich um die access Ports! Verbinde bitte die 2 Laptops mit dem oberen Switch und die 2 PCs mit dem unteren Switch. Verbinde dann die Switches miteinander und konfiguriere bei beiden Switches die Trunks. Bei beiden ist hierfür das Interface <b>g0/1</b> vorgesehen.
  `,
  action: (): void => { 
    Globals.currentLevel.renderElements();
  }
}], [
  pc,
  pc2,
  laptop,
  laptop2,
  switchEl,
  switch2El
], [
  pcSolution,
  pc2Solution,
  laptopSolution,
  laptop2Solution,
  switchElSolution,
  switch2ElSolution
], level6);