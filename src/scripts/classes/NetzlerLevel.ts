import { setNewCharacterMessage } from "../NetzlerFunctions";
import { Globals } from "../globals";
import { NetzlerConnection, NetzlerLevelAction } from "../netzlertypes";
import { NetzlerElement } from "./NetzlerElement";
import _ from 'lodash';

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
    if (!this.nextLevel) throw new Error('Das Level wurde fertiggestellt, verlinkt jedoch auf kein neues!');
    Globals.currentLevel = this.nextLevel;
    Globals.currentLevel.init();
  }

  isLevelFinished(): boolean {
    return this.elementsSolution.every((es: NetzlerElement) => {
      const isSomeElementTheSame: boolean = this.elements.some((e: NetzlerElement) => {
        if (es.getCanvasElement().id === e.getCanvasElement().id) {
          const settings: boolean = _.isEqual(es.settings, e.settings);
          const connections: boolean = es.getConnectionsCopy().every((cs: NetzlerConnection) => {
            return e.getConnectionsCopy().some((c: NetzlerConnection) => {
              return cs.element.getCanvasElement().id === c.element.getCanvasElement().id;
            });
          });
          const connections2: boolean = e.getConnectionsCopy().every((c: NetzlerConnection) => {
            return es.getConnectionsCopy().some((cs: NetzlerConnection) => {
              return c.element.getCanvasElement().id === cs.element.getCanvasElement().id;
            });
          });
          return settings && connections && connections2;
        }
        return false;
      });
      return isSomeElementTheSame;
    });
  }

  init(): void {
    this.triggerNewAction();
  }
}