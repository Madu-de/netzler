import { CanvasCoords } from "./CanvasCoords";
import { IRenderableCanvasElement } from "./IRenderableCanvasElement";

export class CanvasElement implements IRenderableCanvasElement {
  priority: number = 1;
  public static idCount: number = 0;
  set id(value: number) {
    this._id = value;
  }
  public get id(): number {
    return this._id;
  }
  private _id: number;
  private coords: CanvasCoords;
  private width: number;
  private height: number;
  private image: HTMLImageElement;
  private imageLoaded: boolean = false;

  constructor(x: number, y: number, image: HTMLImageElement, width?: number, height?: number, priority?: number) {
    this.id = CanvasElement.idCount++;
    this.coords = new CanvasCoords(x, y);
    this.width = width || image.width;
    this.height = height || image.height;
    this.image = image;
    if (this.image.complete) {
      this.imageLoaded = true;
    }
    this.image.addEventListener('load', () => {
      this.imageLoaded = true;
    }, false);
    this.priority = priority || 1;
  }

  public getCoords(): CanvasCoords {
    return this.coords;
  }

  public setCoords(value: CanvasCoords): void {
    this.coords = value;
  }

  public getWidth(): number {
    return this.width;
  }

  public getHeight(): number {
    return this.height;
  }

  public getImage(): HTMLImageElement {
    return this.image;
  }

  public getMiddleCoords(): CanvasCoords {
    const elementCoords: CanvasCoords = new CanvasCoords(this.getCoords().getX(), this.getCoords().getY());
    elementCoords.setX(elementCoords.getX() + this.getWidth() / 2);
    elementCoords.setY(elementCoords.getY() + this.getHeight() / 2);
    return elementCoords;
  }

  public isImageLoaded(): boolean {
    return this.imageLoaded;
  }

  public isPointInElement(coords: CanvasCoords): boolean {
    return this.getCoords().getX() <= coords.getX() &&
      coords.getX() <= this.coords.getX() + this.getWidth() &&
      this.getCoords().getY() <= coords.getY() &&
      coords.getY() <= this.getCoords().getY() + this.getHeight();
  }

  public isRectangleFullInElement(coords: CanvasCoords, height: number, width: number): boolean {
    return !(
      coords.getX() < this.getCoords().getX() ||
      coords.getY() < this.getCoords().getY() ||
      coords.getX() + width > this.getCoords().getX() + this.getWidth() ||
      coords.getY() + height > this.getCoords().getY() + this.getHeight()
    );
  }

  public isRectangleInElement(coords: CanvasCoords, height: number, width: number): boolean {
    if (this.getCoords().getX() >= coords.getX() + width || coords.getX() >= this.getCoords().getX() + this.getWidth()) return false;
    if (this.getCoords().getY() >= coords.getY() + height || coords.getY() >= this.getCoords().getY() + this.getHeight()) return false;
    return true;
  }

  public doesRectangleTouchElement(coords: CanvasCoords, height: number, width: number): boolean {
    if (this.getCoords().getX() > coords.getX() + width || coords.getX() > this.getCoords().getX() + this.getWidth()) return false;
    if (this.getCoords().getY() > coords.getY() + height || coords.getY() > this.getCoords().getY() + this.getHeight()) return false;
    return true;
  }

  render(context: CanvasRenderingContext2D): void {
    context.drawImage(this.getImage(), this.getCoords().getX(), this.getCoords().getY(), this.getWidth(), this.getWidth());
  }
}