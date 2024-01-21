import { CanvasCoords } from "./CanvasCoords";
import { CanvasElement } from "./CanvasElement";
import { CanvasLine } from "./CanvasLine";
import { IRenderableCanvasElement } from "./IRenderableCanvasElement";

export class Canvas {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private height: number;
  private width: number;
  private elements: CanvasElement[] = [];
  private lines: CanvasLine[] = [];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.height = canvas.height;
    this.width = canvas.width;
  }

  getHeight(): number {
    return this.height;
  }

  getWidth(): number {
    return this.width;
  }

  addElement(element: CanvasElement): void {
    this.elements.push(element);
  }

  getElementsCopy(): CanvasElement[] {
    return [...this.elements];
  }

  removeElement(element: CanvasElement): void;
  removeElement(id: number): void;

  removeElement(elementOrId: CanvasElement | number): void {
    this.elements = this.elements.filter((e: CanvasElement) => e.id !== (typeof elementOrId === 'number' ? elementOrId : elementOrId.id));
  }

  removeAllElements(): void {
    this.elements = [];
  }
  
  addLine(line: CanvasLine): void {
    this.lines.push(line);
  }

  addLineBetweenElements(element1: CanvasElement, element2: CanvasElement, width?: number, style?: string, priority?: number): CanvasLine {
    const line: CanvasLine = new CanvasLine([element1, element2], width, style, priority);
    this.addLine(line);
    return line;
  }

  getLinesCopy(): CanvasLine[] {
    return [...this.lines];
  }

  removeLine(line: CanvasLine): void;
  removeLine(id: number): void;

  removeLine(lineOrId: CanvasLine | number): void {
    this.lines = this.lines.filter((l: CanvasLine) => l.id !== (typeof lineOrId === 'number' ? lineOrId : lineOrId.id));
  }

  removeAllLines(): void {
    this.lines = [];
  }

  render(): void {
    requestAnimationFrame(() => this.render());
    this.context.clearRect(0, 0, this.width, this.height);
    if (this.elements.some((e: CanvasElement) => !e.isImageLoaded())) {
      this.context.font = '48px serif';
      this.context.fillText('Loading...', 0, 48);
      return;
    }
    const renderableElements: IRenderableCanvasElement[] = [...this.elements, ...this.lines];
    renderableElements.sort((a: IRenderableCanvasElement, b: IRenderableCanvasElement) => a.priority - b.priority);
    renderableElements.forEach((e: IRenderableCanvasElement) => {
      e.render(this.context);
    });
  }

  getCanvasMouseCoords(ev: MouseEvent): CanvasCoords {
    const rect: DOMRect = this.canvas.getBoundingClientRect();
    return new CanvasCoords(ev.clientX - rect.left, ev.clientY - rect.top); 
  }
}