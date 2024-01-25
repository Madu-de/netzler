import { CanvasElement } from '../../core/canvas/CanvasElement';
import { NetzlerElement } from '../classes/NetzlerElement';
import { NetzlerLevel } from '../classes/NetzlerLevel';
import { Globals } from "../globals";
import switchTemplate from "../../popup-templates/switch-cs.html";
import { NetzlerPopup } from '../classes/NetzlerPopup';
import { level4 } from './level4';

const switchCanvasElement: CanvasElement = new CanvasElement(500, 150, <HTMLImageElement>document.getElementById('switchpng'), 120, 120);
const switchEl: NetzlerElement = new NetzlerElement(switchCanvasElement, new NetzlerPopup('Switch', switchTemplate));

const switchElSolution: NetzlerElement = new NetzlerElement(switchCanvasElement, new NetzlerPopup('Switch', switchTemplate), switchCanvasElement.id);

switchElSolution.settings.set('enable', '1');
switchElSolution.settings.set('configure', '2');
switchElSolution.settings.set('vlan', '3');
switchElSolution.settings.set('name', '4');

export const level3: NetzlerLevel = new NetzlerLevel([{
  message: 'Perfekt *Quak*! Jetzt haben wir nur ein VLAN für Minecraft erstellt. Einige wollen allerdings auch Counter-Strike spielen.'
}, {
  message: 'Für Counter-Strike brauchen wir also auch noch ein VLAN. Das funktioniert wie zuvor durch anklicken des Switches und Eingeben der Befehle.',
  action: (): void => { 
    Globals.currentLevel.renderElements();
  }
}, {
  message: `Zur Erinnerung, die Befehle müssen in dieser Reihenfolge eingegeben werden:<br>
  > enable<br>
  > configure terminal<br>
  > vlan <b><i>nummer des VLANs</b></i><br>
  > name <b><i>name des VLANs</b></i><br>
  > Unser zweites VLAN hat also die Nummer 20 und den Namen Counter-Strike`
}], [
  switchEl
], [
  switchElSolution
], level4);