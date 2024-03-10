import { CanvasElement } from '../../core/canvas/CanvasElement';
import { NetzlerElement } from '../classes/NetzlerElement';
import { NetzlerLevel } from '../classes/NetzlerLevel';
import { Globals } from "../globals";
import routerTemplate1 from "../../popup-templates/router-8.html";
import { NetzlerPopup } from '../classes/NetzlerPopup';
import { finalLevel } from './finalLevel';

const pcCanvasElement: CanvasElement = new CanvasElement(100, 300, <HTMLImageElement>document.getElementById('pcpng'), 100, 100);
const pc: NetzlerElement = new NetzlerElement(pcCanvasElement, new NetzlerPopup('PC', 'IP Adresse: 192.168.1.2<br> Subnetzmaske: 255.255.255.0'));
pc.setMaxConnections(1);

const pcCanvasElement2: CanvasElement = new CanvasElement(600, 300, <HTMLImageElement>document.getElementById('pcpng'), 100, 100);
const pc2: NetzlerElement = new NetzlerElement(pcCanvasElement2, new NetzlerPopup('PC2', 'IP Adresse: 192.168.1.3<br> Subnetzmaske: 255.255.255.0'));
pc2.setMaxConnections(1);

const laptopCanvasElement: CanvasElement = new CanvasElement(100, 30, <HTMLImageElement>document.getElementById('laptoppng'), 80, 80);
const laptop: NetzlerElement = new NetzlerElement(laptopCanvasElement, new NetzlerPopup('Laptop', 'IP Adresse: 192.168.2.2<br> Subnetzmaske: 255.255.255.0'));
laptop.setMaxConnections(1);

const laptopCanvasElement2: CanvasElement = new CanvasElement(600, 30, <HTMLImageElement>document.getElementById('laptoppng'), 80, 80);
const laptop2: NetzlerElement = new NetzlerElement(laptopCanvasElement2, new NetzlerPopup('Laptop2', 'IP Adresse: 192.168.2.3<br> Subnetzmaske: 255.255.255.0'));
laptop2.setMaxConnections(1);

const switchCanvasElement: CanvasElement = new CanvasElement(350, 30, <HTMLImageElement>document.getElementById('switchpng'), 120, 120);
const switchEl: NetzlerElement = new NetzlerElement(switchCanvasElement, new NetzlerPopup('Switch', 'Keine Konfiguration in diesem Level notwendig!'));
switchEl.setMaxConnections(3);

const switch3CanvasElement: CanvasElement = new CanvasElement(350, 300, <HTMLImageElement>document.getElementById('switchpng'), 120, 120);
const switch3El: NetzlerElement = new NetzlerElement(switch3CanvasElement, new NetzlerPopup('Switch2', 'Keine Konfiguration in diesem Level notwendig!'));
switch3El.setMaxConnections(3);

const router1CanvasElement: CanvasElement = new CanvasElement(350, 160, <HTMLImageElement>document.getElementById('routerpng'), 120, 120);
const router1: NetzlerElement = new NetzlerElement(router1CanvasElement, new NetzlerPopup('Router', routerTemplate1));
router1.setMaxConnections(2);

const pcSolution: NetzlerElement = new NetzlerElement(pcCanvasElement, new NetzlerPopup('PC', 'Keine Konfiguration in diesem Level notwendig!'), pcCanvasElement.id);
const pc2Solution: NetzlerElement = new NetzlerElement(pcCanvasElement2, new NetzlerPopup('PC', 'Keine Konfiguration in diesem Level notwendig!'), pcCanvasElement2.id);
const laptopSolution: NetzlerElement = new NetzlerElement(laptopCanvasElement, new NetzlerPopup('Laptop', 'Keine Konfiguration in diesem Level notwendig!'), laptopCanvasElement.id);
const laptop2Solution: NetzlerElement = new NetzlerElement(laptopCanvasElement2, new NetzlerPopup('Laptop', 'Keine Konfiguration in diesem Level notwendig!'), laptopCanvasElement2.id);
const switchElSolution: NetzlerElement = new NetzlerElement(switchCanvasElement, new NetzlerPopup('Switch', ''), switchCanvasElement.id);
const switch3ElSolution: NetzlerElement = new NetzlerElement(switch3CanvasElement, new NetzlerPopup('Switch', ''), switch3CanvasElement.id);
const routerElSolution: NetzlerElement = new NetzlerElement(router1CanvasElement, new NetzlerPopup('Router', routerTemplate1), router1CanvasElement.id);

pcSolution.createConnection(switch3ElSolution, undefined, false);
pc2Solution.createConnection(switch3ElSolution, undefined, false);
laptopSolution.createConnection(switchElSolution, undefined, false);
laptop2Solution.createConnection(switchElSolution, undefined, false);
switch3ElSolution.createConnection(routerElSolution, undefined, false);
switchElSolution.createConnection(routerElSolution, undefined, false);

routerElSolution.settings.set('enable', '1');
routerElSolution.settings.set('configure', '2');

routerElSolution.settings.set('interface1', '1');
routerElSolution.settings.set('ip-address1', '2');
routerElSolution.settings.set('shutdown1', '3');
routerElSolution.settings.set('interface2', '1');
routerElSolution.settings.set('ip-address2', '2');
routerElSolution.settings.set('shutdown2', '3');


export const level8: NetzlerLevel = new NetzlerLevel([{
  message: 'Das hast du super gemacht *Quak*! Lass uns zum zweiten Teil des Spiels kommen! Wusstest du, dass man Router auch ohne VLANs nutzen kann? Lass es mich dir erklären!',
  action: (): void => {
    document.getElementById('title').innerHTML += " - Erweiterte Level";
  }
}, {
  message: 'Wie du bereits weißt, verbindet ein Router verschiedene Netze. Diese Netze haben wir bisher mit VLANs erstellt. Nutzen wir keine VLANs, stellt die Verbindung von Hubs, Switches und Hosts ein ganzes Netz dar. Dieses können wir mit einem Router an ein weiteres Netz voller Hubs, Switches und Hosts verbinden. Wichtig dabei ist es, dass die Hosts im gleichen Netz, den gleichen Netzteil besitzen.'
}, {
  message: 'Da wir nun keine VLANs routen, welche alle über ein Kabel laufen, nutzen wir für jedes Netz ein eigenes Interface'
}, {
  message: `Lass es mich dir an einem Beispiel erklären! Du siehst hier 2 PCs, 2 Laptops, 2 Switches und einen Router. Wir wollen die PCs und Laptops jeweils in eigene Netze aufgliedern. Hierfür müssen wir den Hosts im gleichen Netz, Hostadressen mit gleichen Netzteil geben. Dies habe ich schon für dich getan. Da wir keine VLANs einrichten, müssen wir die Switches nicht konfigurieren. Das gibt uns auch den Vorteil, dass jeder Host, der an einen Switch angeschlossen wird, direkt dem gleichen Netz zugeordnet wird, in dem die schon angeschlossenen Hosts sich befinden. Die Interfaces des Routers müssen so eingerichtet werden, sodass ein Interface eine Hostadresse des angeschlossenen Netzes erhält. Dies ist meist die erste oder letzte Hostadresse. Da wir zwei Netze anschließen, müssen wir 2 Interfaces einrichten. Versuch es doch selbst einmal aufzubauen! Gehe dabei wie folgt vor:<br>
  - Verbinde die PCs an den unteren Switch<br>
  - Verbinde die Laptops an den oberen Switch<br>
  - Verbinde jeden Switch mit dem Router<br>
  - Schaue dir für ein besseres Verständnis die Konfiguration der PCs und Laptops an<br>
  - Konfiguriere die Interfaces des Router`,
  action: (): void => { 
    Globals.currentLevel.renderElements();
  }
}], [
  pc,
  pc2,
  laptop,
  laptop2,
  switchEl,
  switch3El,
  router1,
], [
  pcSolution,
  pc2Solution,
  laptopSolution,
  laptop2Solution,
  switchElSolution,
  switch3ElSolution,
  routerElSolution,
], finalLevel);