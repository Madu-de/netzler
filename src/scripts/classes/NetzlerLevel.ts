import { setNewCharacterMessage } from "../NetzlerFunctions";
import { Globals } from "../globals";
import { NetzlerLevelAction } from "../netzlertypes";
import { NetzlerElement } from "./NetzlerElement";

export class NetzlerLevel {
  private netzlerActions: NetzlerLevelAction[];
  private nextLevel: NetzlerLevel | undefined;
  private elements: NetzlerElement[];
  private elementsSolution: NetzlerElement[];

  constructor(netzlerActions: NetzlerLevelAction[], elements: NetzlerElement[], elementsSolution: NetzlerElement[], nextLevel?: NetzlerLevel) {
    this.netzlerActions = netzlerActions;
    this.elements = elements;
    this.elementsSolution = elementsSolution;
    this.nextLevel = nextLevel;
  }

  renderElements(): void {
    Globals.elements = this.elements;
    Globals.canvas.removeAllElements();
    Globals.canvas.removeAllLines();
    this.elements.forEach((e: NetzlerElement) => {
      e.clearConnections();
      Globals.canvas.addElement(e.getCanvasElement());
    });
  }

  triggerNewAction(): NetzlerLevelAction {
    const netzlerAction: NetzlerLevelAction = this.netzlerActions.shift();
    setNewCharacterMessage(netzlerAction.message);
    netzlerAction.action?.();
    return netzlerAction;
  }

  switchToNextLevel(): void {
    Globals.currentLevel = this.nextLevel;
    Globals.currentLevel.init();
  }

  isLevelFinished(): void {
    // TODO
  }

  init(): void {
    this.triggerNewAction();
  }
}