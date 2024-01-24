import { CanvasElement } from "../../core/canvas/CanvasElement";
import { NetzlerElement } from "../classes/NetzlerElement";
import { NetzlerPopup } from '../classes/NetzlerPopup';
import { NetzlerLevel } from '../classes/NetzlerLevel';
import { Globals } from "../globals";
import switchTemplate from "../../popup-templates/switch-minecraft.html";
import { level3 } from "./level3";

const switchCanvasElement: CanvasElement = new CanvasElement(500, 150, <HTMLImageElement>document.getElementById('switchpng'), 120, 120);
const switchEl: NetzlerElement = new NetzlerElement(switchCanvasElement, new NetzlerPopup('Switch', switchTemplate));

const switchElSolution: NetzlerElement = new NetzlerElement(switchCanvasElement, new NetzlerPopup('Switch', switchTemplate), switchCanvasElement.id);

switchElSolution.settings.set('enable', '1');
switchElSolution.settings.set('configure', '2');
switchElSolution.settings.set('vlan', '3');
switchElSolution.settings.set('name', '4');

export const level2: NetzlerLevel = new NetzlerLevel([{
  message: 'Sehr gut *Quark*! Jetzt wollen wir mal das Netz einer richtige LAN-Party aufbauen, um zusammen verschiedene Spiele zu spielen.'
}, {
  message: 'Wir werden Subnetze und VLANs für jedes einzelne Spiel, welches auf einem internen Server gehostet wird, einrichten. So können wir die Kommunikation zwischen 2 PCs kontrollieren, sodass diese nicht miteinander kommunizieren können, wenn sie jeweils für andere Spiele vorgesehen sind. Zudem sorgt dies auch für weniger Netzwerklast, sollte ein PC jeden anderen PC im gleichen (Sub-)Netz eine Nachricht senden wollen (Broadcast), da weniger PCs in einem Subnetz vorhanden sind, als im gesamten Netz.',
}, {
  message: 'Ich habe mir für dich ein paar Subnetze und die dazugehörigen VLANs überlegt. Richte die doch mal ein.',
}, {
  message: 'Dem Switch muss mitgeteilt werden, dass es verschiedene VLANs gibt, damit jeweils nur die PCs im gleichen VLAN miteinander kommunizieren können.',
}, {
  message: `Die Befehlsreihenfolge zum einrichten von VLANs im Switch ist:<br>
  enable<br>
  configure terminal<br>
  vlan <b><i>nummer des VLANs</b></i><br>
  name <b><i>name des VLANs</b></i>`,
}, {
  message: 'Um die VLANs im Switch einzurichten klicke, mit dem <b>Auswahl Werkzeug</b> aus der Toolbar, auf den Switch welchen du einrichten möchtest.',
}, {
  message: `Denk dran die Befehlsreihenfolge ist:<br>
  enable<br>
  configure terminal<br>
  vlan <b><i>nummer des VLANs</b></i><br>
  name <b><i>name des VLANs</b></i>
  `,
}, { 
  message: 'Das erste VLAN hat die Nummer 10 und hat den Namen Minecraft', 
  action: (): void => { 
    Globals.currentLevel.renderElements();
  }
}], [
  switchEl
], [
  switchElSolution
], level3);
