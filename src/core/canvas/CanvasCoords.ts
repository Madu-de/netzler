import { Canvas } from "./Canvas";

export class CanvasCoords {
  private x: number;
  private y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getX(): number { return this.x; }
  getY(): number { return this.y; }
  setX(x: number): void { this.x = x; }
  setY(y: number): void { this.y = y; }
  isInCanvas(canvas: Canvas, height: number = 0, width: number = 0): boolean {
    return this.getX() >= 0 && this.getY() >= 0 && this.getX() + width <= canvas.getWidth() && this.getY() + height <= canvas.getHeight();
  }
}