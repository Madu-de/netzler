export interface IRenderableCanvasElement {
  priority: number;
  render(context: CanvasRenderingContext2D): void;
}