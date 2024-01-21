import { CanvasLine } from './../core/canvas/CanvasLine';
import { Canvas } from "../core/canvas/Canvas";
import { CanvasCoords } from "../core/canvas/CanvasCoords";
import { CanvasElement } from "../core/canvas/CanvasElement";

// Canvas example
const canvasElement: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
const canvas: Canvas = new Canvas(canvasElement);
const duck1: CanvasElement = new CanvasElement(200, 200, <HTMLImageElement>document.getElementById('madupng'), 50, 50);
const duck2: CanvasElement = new CanvasElement(550, 150, <HTMLImageElement>document.getElementById('madupng'), 50, 50);
canvas.addElement(duck1);
canvas.addElement(duck2);
const line: CanvasLine = canvas.addLineBetweenElements(duck1, duck2, 10, 'yellow');
canvas.render();

window.addEventListener('keydown', (ev: KeyboardEvent) => {
  const c: CanvasCoords = new CanvasCoords(duck1.getCoords().getX(), duck1.getCoords().getY());

  if (ev.key === 'ArrowDown') {
    c.setY(c.getY() + 10);
  } 
  if (ev.key === 'ArrowUp') {
    c.setY(c.getY() - 10);
  } 
  if (ev.key === 'ArrowRight') {
    c.setX(c.getX() + 10);
  } 
  if (ev.key === 'ArrowLeft') {
    c.setX(c.getX() - 10);
  }
  if (!duck2.isRectangleInElement(c, duck1.getHeight(), duck1.getWidth()) && c.isInCanvas(canvas, duck1.getHeight(), duck1.getWidth())) {
    duck1.setCoords(c);
  }
});

let follow: boolean = false;

function followMouse(ev: MouseEvent): void {
  duck2.getCoords().setX(canvas.getCanvasMouseCoords(ev).getX() - (duck2.getWidth() / 2));
  duck2.getCoords().setY(canvas.getCanvasMouseCoords(ev).getY() - (duck2.getHeight() / 2));
}

canvasElement.addEventListener('mouseup', (ev: MouseEvent) => {
  if (duck2.isPointInElement(canvas.getCanvasMouseCoords(ev))) {
    follow = !follow;
    followMouse(ev);
    follow ? canvasElement.addEventListener('mousemove', followMouse) : canvasElement.removeEventListener('mousemove', followMouse);
    follow ? line.setWidth(5) : line.setWidth(10);
    follow ? line.setStyle('red') : line.setStyle('yellow');
  }
});
