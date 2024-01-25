import { CanvasElement } from '../../core/canvas/CanvasElement';
import { NetzlerElement } from '../classes/NetzlerElement';
import { NetzlerLevel } from '../classes/NetzlerLevel';
import { Globals } from "../globals";
import pcTemplate from "../../popup-templates/pc-template.html";
import switchTemplate1 from "../../popup-templates/switch-7-1.html";
import switchTemplate2 from "../../popup-templates/switch-6-2.html";
import switchTemplate3 from "../../popup-templates/switch-6-3.html";
import routerTemplate1 from "../../popup-templates/router-6-1.html";
import { NetzlerPopup } from '../classes/NetzlerPopup';

const pcCanvasElement: CanvasElement = new CanvasElement(100, 300, <HTMLImageElement>document.getElementById('pcpng'), 100, 100);
const pc: NetzlerElement = new NetzlerElement(pcCanvasElement, new NetzlerPopup('PC', pcTemplate));
pc.setMaxConnections(1);

const pcCanvasElement2: CanvasElement = new CanvasElement(600, 300, <HTMLImageElement>document.getElementById('pcpng'), 100, 100);
const pc2: NetzlerElement = new NetzlerElement(pcCanvasElement2, new NetzlerPopup('PC2', pcTemplate));
pc2.setMaxConnections(1);

const laptopCanvasElement: CanvasElement = new CanvasElement(100, 30, <HTMLImageElement>document.getElementById('laptoppng'), 80, 80);
const laptop: NetzlerElement = new NetzlerElement(laptopCanvasElement, new NetzlerPopup('Laptop', pcTemplate));
laptop.setMaxConnections(1);

const laptopCanvasElement2: CanvasElement = new CanvasElement(600, 30, <HTMLImageElement>document.getElementById('laptoppng'), 80, 80);
const laptop2: NetzlerElement = new NetzlerElement(laptopCanvasElement2, new NetzlerPopup('Laptop2', pcTemplate));
laptop2.setMaxConnections(1);

const laptopCanvasElement3: CanvasElement = new CanvasElement(100, 160, <HTMLImageElement>document.getElementById('laptoppng'), 80, 80);
const laptop3: NetzlerElement = new NetzlerElement(laptopCanvasElement3, new NetzlerPopup('Laptop3', pcTemplate));
laptop3.setMaxConnections(1);

const switchCanvasElement: CanvasElement = new CanvasElement(350, 30, <HTMLImageElement>document.getElementById('switchpng'), 120, 120);
const switchEl: NetzlerElement = new NetzlerElement(switchCanvasElement, new NetzlerPopup('Switch', switchTemplate1));
switchEl.setMaxConnections(4);

const switch2CanvasElement: CanvasElement = new CanvasElement(350, 160, <HTMLImageElement>document.getElementById('switchpng'), 120, 120);
const switch2El: NetzlerElement = new NetzlerElement(switch2CanvasElement, new NetzlerPopup('Switch2', switchTemplate2));
switch2El.setMaxConnections(3);

const switch3CanvasElement: CanvasElement = new CanvasElement(350, 300, <HTMLImageElement>document.getElementById('switchpng'), 120, 120);
const switch3El: NetzlerElement = new NetzlerElement(switch3CanvasElement, new NetzlerPopup('Switch3', switchTemplate3));
switch3El.setMaxConnections(3);

const router1CanvasElement: CanvasElement = new CanvasElement(550, 160, <HTMLImageElement>document.getElementById('routerpng'), 120, 120);
const router1: NetzlerElement = new NetzlerElement(router1CanvasElement, new NetzlerPopup('Router', routerTemplate1));
router1.setMaxConnections(1);

const pcSolution: NetzlerElement = new NetzlerElement(pcCanvasElement, new NetzlerPopup('PC', pcTemplate), pcCanvasElement.id);
const pc2Solution: NetzlerElement = new NetzlerElement(pcCanvasElement2, new NetzlerPopup('PC', pcTemplate), pcCanvasElement2.id);
const laptopSolution: NetzlerElement = new NetzlerElement(laptopCanvasElement, new NetzlerPopup('Laptop', pcTemplate), laptopCanvasElement.id);
const laptop2Solution: NetzlerElement = new NetzlerElement(laptopCanvasElement2, new NetzlerPopup('Laptop', pcTemplate), laptopCanvasElement2.id);
const laptop3Solution: NetzlerElement = new NetzlerElement(laptopCanvasElement3, new NetzlerPopup('Laptop', pcTemplate), laptopCanvasElement3.id);
const switchElSolution: NetzlerElement = new NetzlerElement(switchCanvasElement, new NetzlerPopup('Switch', switchTemplate1), switchCanvasElement.id);
const switch2ElSolution: NetzlerElement = new NetzlerElement(switch2CanvasElement, new NetzlerPopup('Switch', switchTemplate2), switch2CanvasElement.id);
const switch3ElSolution: NetzlerElement = new NetzlerElement(switch3CanvasElement, new NetzlerPopup('Switch', switchTemplate3), switch3CanvasElement.id);
const routerElSolution: NetzlerElement = new NetzlerElement(router1CanvasElement, new NetzlerPopup('Router', routerTemplate1), router1CanvasElement.id);

pcSolution.createConnection(switch3ElSolution, undefined, false);
pc2Solution.createConnection(switch3ElSolution, undefined, false);
laptopSolution.createConnection(switchElSolution, undefined, false);
laptop2Solution.createConnection(switchElSolution, undefined, false);
laptop3Solution.createConnection(switchElSolution, undefined, false);
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
switchElSolution.settings.set('interface4', '1');
switchElSolution.settings.set('switchport7', '2');
switchElSolution.settings.set('switchport8', '3');

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

pcSolution.settings.set('ip-address', '192.168.1.2');
pcSolution.settings.set('subnetzmaske', '255.255.255.0');
pcSolution.settings.set('gateway', '192.168.1.1');

pc2Solution.settings.set('ip-address', '192.168.2.2');
pc2Solution.settings.set('subnetzmaske', '255.255.255.0');
pc2Solution.settings.set('gateway', '192.168.2.1');

laptopSolution.settings.set('ip-address', '192.168.1.3');
laptopSolution.settings.set('subnetzmaske', '255.255.255.0');
laptopSolution.settings.set('gateway', '192.168.1.1');

laptop2Solution.settings.set('ip-address', '192.168.2.3');
laptop2Solution.settings.set('subnetzmaske', '255.255.255.0');
laptop2Solution.settings.set('gateway', '192.168.2.1');

laptop3Solution.settings.set('ip-address', '192.168.1.4');
laptop3Solution.settings.set('subnetzmaske', '255.255.255.0');
laptop3Solution.settings.set('gateway', '192.168.1.1');

export const level7: NetzlerLevel = new NetzlerLevel([{
  message: 'Spektakulär *Quak*! Lass uns nun zum Aufbau des Netzwerkes für die LAN-Party kommen. Hierfür wirst du die Konfiguration der PCs und Laptops in die Hand nehmen!',
}, {
  message: '',
  action: (): void => { 
    Globals.currentLevel.renderElements();
  }
}], [
  pc,
  pc2,
  laptop,
  laptop2,
  laptop3,
  switchEl,
  switch2El,
  switch3El,
  router1,
], [
  pcSolution,
  pc2Solution,
  laptopSolution,
  laptop2Solution,
  laptop3Solution,
  switchElSolution,
  switch2ElSolution,
  switch3ElSolution,
  routerElSolution,
]);