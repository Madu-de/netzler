import { CanvasElement } from '../../core/canvas/CanvasElement';
import { NetzlerElement } from '../classes/NetzlerElement';
import { NetzlerLevel } from '../classes/NetzlerLevel';
import { Globals } from "../globals";
import switchTemplate1 from "../../popup-templates/switch-6-1.html";
import switchTemplate2 from "../../popup-templates/switch-6-2.html";
import switchTemplate3 from "../../popup-templates/switch-6-3.html";
import routerTemplate1 from "../../popup-templates/router-6-1.html";
import { NetzlerPopup } from '../classes/NetzlerPopup';
import { level7 } from './level7';

const pcCanvasElement: CanvasElement = new CanvasElement(100, 300, <HTMLImageElement>document.getElementById('pcpng'), 100, 100);
const pc: NetzlerElement = new NetzlerElement(pcCanvasElement, new NetzlerPopup('PC', 'Keine Konfiguration in diesem Level notwendig!'));
pc.setMaxConnections(1);

const pcCanvasElement2: CanvasElement = new CanvasElement(600, 300, <HTMLImageElement>document.getElementById('pcpng'), 100, 100);
const pc2: NetzlerElement = new NetzlerElement(pcCanvasElement2, new NetzlerPopup('PC2', 'Keine Konfiguration in diesem Level notwendig!'));
pc2.setMaxConnections(1);

const laptopCanvasElement: CanvasElement = new CanvasElement(100, 30, <HTMLImageElement>document.getElementById('laptoppng'), 80, 80);
const laptop: NetzlerElement = new NetzlerElement(laptopCanvasElement, new NetzlerPopup('Laptop', 'Keine Konfiguration in diesem Level notwendig!'));
laptop.setMaxConnections(1);

const laptopCanvasElement2: CanvasElement = new CanvasElement(600, 30, <HTMLImageElement>document.getElementById('laptoppng'), 80, 80);
const laptop2: NetzlerElement = new NetzlerElement(laptopCanvasElement2, new NetzlerPopup('Laptop2', 'Keine Konfiguration in diesem Level notwendig!'));
laptop2.setMaxConnections(1);

const switchCanvasElement: CanvasElement = new CanvasElement(350, 30, <HTMLImageElement>document.getElementById('switchpng'), 120, 120);
const switchEl: NetzlerElement = new NetzlerElement(switchCanvasElement, new NetzlerPopup('Switch', switchTemplate1));
switchEl.setMaxConnections(3);

const switch2CanvasElement: CanvasElement = new CanvasElement(350, 160, <HTMLImageElement>document.getElementById('switchpng'), 120, 120);
const switch2El: NetzlerElement = new NetzlerElement(switch2CanvasElement, new NetzlerPopup('Switch2', switchTemplate2));
switch2El.setMaxConnections(3);

const switch3CanvasElement: CanvasElement = new CanvasElement(350, 300, <HTMLImageElement>document.getElementById('switchpng'), 120, 120);
const switch3El: NetzlerElement = new NetzlerElement(switch3CanvasElement, new NetzlerPopup('Switch3', switchTemplate3));
switch3El.setMaxConnections(3);

const router1CanvasElement: CanvasElement = new CanvasElement(550, 160, <HTMLImageElement>document.getElementById('routerpng'), 120, 120);
const router1: NetzlerElement = new NetzlerElement(router1CanvasElement, new NetzlerPopup('Router', routerTemplate1));
router1.setMaxConnections(1);

const pcSolution: NetzlerElement = new NetzlerElement(pcCanvasElement, new NetzlerPopup('PC', 'Keine Konfiguration in diesem Level notwendig!'), pcCanvasElement.id);
const pc2Solution: NetzlerElement = new NetzlerElement(pcCanvasElement2, new NetzlerPopup('PC', 'Keine Konfiguration in diesem Level notwendig!'), pcCanvasElement2.id);
const laptopSolution: NetzlerElement = new NetzlerElement(laptopCanvasElement, new NetzlerPopup('Laptop', 'Keine Konfiguration in diesem Level notwendig!'), laptopCanvasElement.id);
const laptop2Solution: NetzlerElement = new NetzlerElement(laptopCanvasElement2, new NetzlerPopup('Laptop', 'Keine Konfiguration in diesem Level notwendig!'), laptopCanvasElement2.id);
const switchElSolution: NetzlerElement = new NetzlerElement(switchCanvasElement, new NetzlerPopup('Switch', switchTemplate1), switchCanvasElement.id);
const switch2ElSolution: NetzlerElement = new NetzlerElement(switch2CanvasElement, new NetzlerPopup('Switch', switchTemplate2), switch2CanvasElement.id);
const switch3ElSolution: NetzlerElement = new NetzlerElement(switch3CanvasElement, new NetzlerPopup('Switch', switchTemplate3), switch3CanvasElement.id);
const routerElSolution: NetzlerElement = new NetzlerElement(router1CanvasElement, new NetzlerPopup('Router', routerTemplate1), router1CanvasElement.id);

pcSolution.createConnection(switch3ElSolution, undefined, false);
pc2Solution.createConnection(switch3ElSolution, undefined, false);
laptopSolution.createConnection(switchElSolution, undefined, false);
laptop2Solution.createConnection(switchElSolution, undefined, false);
switchElSolution.createConnection(switch2ElSolution, undefined, false);
switch2ElSolution.createConnection(switch3ElSolution, undefined, false);
switch2ElSolution.createConnection(routerElSolution, undefined, false);

routerElSolution.settings.set('enable', '1');
routerElSolution.settings.set('configure', '2');
routerElSolution.settings.set('interface1', '1');
routerElSolution.settings.set('encapsulation1', '2');
routerElSolution.settings.set('ip-address1', '3');
routerElSolution.settings.set('interface2', '1');
routerElSolution.settings.set('encapsulation2', '2');
routerElSolution.settings.set('ip-address2', '3');
routerElSolution.settings.set('interface3', '1');
routerElSolution.settings.set('shutdown', '2');

switchElSolution.settings.set('enable', '1');
switchElSolution.settings.set('configure', '2');
switchElSolution.settings.set('vlan1', '1');
switchElSolution.settings.set('name1', '2');
switchElSolution.settings.set('vlan2', '1');
switchElSolution.settings.set('name2', '2');
switchElSolution.settings.set('interface1', '1');
switchElSolution.settings.set('switchport1', '2');
switchElSolution.settings.set('switchport2', '3');
switchElSolution.settings.set('interface2', '1');
switchElSolution.settings.set('switchport3', '2');
switchElSolution.settings.set('switchport4', '3');
switchElSolution.settings.set('interface3', '1');
switchElSolution.settings.set('switchport5', '2');
switchElSolution.settings.set('switchport6', '3');

switch2ElSolution.settings.set('enable', '1');
switch2ElSolution.settings.set('configure', '2');
switch2ElSolution.settings.set('vlan1', '1');
switch2ElSolution.settings.set('name1', '2');
switch2ElSolution.settings.set('vlan2', '1');
switch2ElSolution.settings.set('name2', '2');
switch2ElSolution.settings.set('interface1', '1');
switch2ElSolution.settings.set('switchport1', '2');
switch2ElSolution.settings.set('switchport2', '3');
switch2ElSolution.settings.set('interface2', '1');
switch2ElSolution.settings.set('switchport3', '2');
switch2ElSolution.settings.set('switchport4', '3');
switch2ElSolution.settings.set('interface3', '1');
switch2ElSolution.settings.set('switchport5', '2');
switch2ElSolution.settings.set('switchport6', '3');

switch3ElSolution.settings.set('enable', '1');
switch3ElSolution.settings.set('configure', '2');
switch3ElSolution.settings.set('vlan1', '1');
switch3ElSolution.settings.set('name1', '2');
switch3ElSolution.settings.set('vlan2', '1');
switch3ElSolution.settings.set('name2', '2');
switch3ElSolution.settings.set('interface1', '1');
switch3ElSolution.settings.set('switchport1', '2');
switch3ElSolution.settings.set('switchport2', '3');
switch3ElSolution.settings.set('interface2', '1');
switch3ElSolution.settings.set('switchport3', '2');
switch3ElSolution.settings.set('switchport4', '3');
switch3ElSolution.settings.set('interface3', '1');
switch3ElSolution.settings.set('switchport5', '2');
switch3ElSolution.settings.set('switchport6', '3');


export const level6: NetzlerLevel = new NetzlerLevel([{
  message: 'Ich sehe einen Netzwerktechniker in dir *Quak*! Kommen wir zum letzten Punkt, bevor wir unser LAN Party Netz errichten können! "Ein Router verbindet Netze", vielleicht hast du diesen Spruch schonmal gehört, vielleicht auch nicht. Fakt ist, er ist wahr. Über einen Router ist es möglich, über verschiedene Netzwerke zu kommunizieren. Sagen wir also ich bin in "Netz 1" und du bist in "Netz 2", um diese Weltklasse Erklärung zu dir zu schicken, bräuchte ich einen Router, der die beiden Netzen verbindet.',
  
}, {
  message: 'Genau so, kann ein Router auch mehrere VLANs Miteinader verbinden. Dafür müssen wir für ein Interface, welches mit einem "Trunk"-Interface an einem Switch verbunden ist, mehrere Subinterfaces einrichten. Für jedes VLAN muss ein eigenes Sub-Interface eingerichtet werden.'
}, {
  message: `
  Jedes Sub-interface wird als Nummer hinter dem "Haupt"-Interface angegeben: Beispiel: interface f0/0.10<br>
  Jedes Subinterface kann mit genau einem VLAN kommunizieren, dafür nutzen wir den folgenden Befehl:<br>
  > encapsulation dot1q <b><i>vlan nummer</b></i>`
}, {
  message: `Jedes Sub-Interface erhält eine IP-Adresse. Diese IP-Adresse wird bei allen PCs, die im angegebenen VLAN sind, als "Gateway" angegeben. Beispiel:<br>
  VLAN 10<br>
  PC Gateway: 192.168.1.1<br>
  Router Interface: f0/1.10 -> encapsulation dot1q 10 -> ip address 192.168.1.1`,
}, {
  message: `Die Befehle, um ein Router-Interface mit Sub-Interfaces einzurichten sind wie folgt:<br>
  > enable<br>
  > configure terminal<br><br>
  Für die einzelnen Sub-Interfaces:<br>
  > interface <b><i>name des Interfaces</b></i>.<b><i>nummer des Sub-Interfaces</b></i><br>
  > encapsulation dot1q <b><i>VLAN Nummer</b></i>
  > ip address <b><i>IP-Adresse</b></i> <b><i>Subnetzmaske</b></i>
  `,
}, {
  message: `Um alle Subinterfaces zu starten, nutze diese Befehle:<br>
  > interface <b><i>name des Interfaces</b></i><br>
  > no shutdown`,
}, {
  message: `Also lass uns nun 2 VLANs mit einem Router miteinander verbinden! Gehe bitte so vor:<br>
  - Beide Laptops werden mit dem oberen Switch (S1) verbunden<br>
  - Beide PCs werden mit den unteren Switch (S3) verbunden<br>
  - Der obere und untere Switch (S1, S3), wird mit dem in der Mitte (S2) verbunden<br>
  - Der Switch in der Mitte (S2) wird mit dem Router (R1) verbunden<br>
  - Es gibt die VLANs 10 für Minecraft und 20 für Counter-Strike<br>
  - Im oberen Switch sind 2 Laptops in VLAN 10 und einer in VLAN 20.<br>
  - Beide VLANs sollen über den Router miteinander kommunizieren können`,
  action: (): void => { 
    Globals.currentLevel.renderElements();
  }
}], [
  pc,
  pc2,
  laptop,
  laptop2,
  switchEl,
  switch2El,
  switch3El,
  router1,
], [
  pcSolution,
  pc2Solution,
  laptopSolution,
  laptop2Solution,
  switchElSolution,
  switch2ElSolution,
  switch3ElSolution,
  routerElSolution,
], level7);