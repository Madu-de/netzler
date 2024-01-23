import { setNewCharacterMessage } from "../NetzlerFunctions";
import { Globals } from "../globals";
import { NetzlerElement } from "./NetzlerElement";

export class NetzlerLevel {
  private messages: string[];
  private nextLevel: NetzlerLevel | undefined;
  private elements: NetzlerElement[];
  private elementsSolution: NetzlerElement[];

  constructor(messages: string[], elements: NetzlerElement[], elementsSolution: NetzlerElement[], nextLevel?: NetzlerLevel) {
    this.messages = messages;
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

  nextMessage(): string {
    return this.messages.shift();
  }

  switchToNextLevel(): void {
    Globals.currentLevel = this.nextLevel;
  }

  isLevelFinished(): void {
    // TODO
  }

  init(): void {
    setNewCharacterMessage(this.nextMessage());
  }
}