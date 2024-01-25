import { CanvasCoords } from "../core/canvas/CanvasCoords";
import { CanvasElement } from "../core/canvas/CanvasElement";
import { NetzlerElement } from "./classes/NetzlerElement";
import { Globals } from "./globals";
import { CanvasLine } from "../core/canvas/CanvasLine";
import { NetzlerConnection, NetzlerTool } from "./netzlertypes";
import JSConfetti from "js-confetti";

export type NetzlerFunction = (mousecoords: CanvasCoords) => void;

let followElement: CanvasElement;

export const moveTool: NetzlerFunction = (mousecoords: CanvasCoords): void => {
  const elements: NetzlerElement[] = Globals.elements;
  if (followElement) {
    Globals.canvasElement.removeEventListener('mousemove', followMouse);
    followElement = undefined;
  } else {
    elements.forEach((nelement: NetzlerElement) => {
      const element: CanvasElement = nelement.getCanvasElement();
      if (element.isPointInElement(mousecoords)) {
        followElement = element;
        if (followElement) {
          Globals.canvasElement.addEventListener('mousemove', followMouse);
        }
      }
    });
  }
};

export const selectionTool: NetzlerFunction = (mousecoords: CanvasCoords): void => {
  const elements: NetzlerElement[] = Globals.elements;
  elements.forEach((element: NetzlerElement) => {
    if (element.getCanvasElement().isPointInElement(mousecoords)) {
      element.popup();
    }
  });
};

export const deleteTool: NetzlerFunction = (mousecoords: CanvasCoords): void => {
  const lines: CanvasLine[] = Globals.canvas.getLinesCopy();
  lines.forEach((line: CanvasLine) => {
    if (line.isPointInLine(mousecoords)) {
      const elements: NetzlerElement[] = Globals.elements;
      elements.forEach((element: NetzlerElement) => {
        element.getConnectionsCopy().forEach((connection: NetzlerConnection) => {
          if (connection.line === line) {
            element.removeConnection(connection.element);
          }
        });
      });
    }
  });
};

let selectedElement: NetzlerElement | undefined;

export const cableTool: NetzlerFunction = (mousecoords: CanvasCoords): void => {
  const elements: NetzlerElement[] = Globals.elements;
  elements.forEach((element: NetzlerElement) => {
    const canvasElement: CanvasElement = element.getCanvasElement();
    if (canvasElement.isPointInElement(mousecoords)) {
      if (selectedElement) {
        try {
          selectedElement.createConnection(element);
        } catch (error) {
          showError(error.message);
        } finally {
          selectedElement = undefined;
        }
        return;
      }
      selectedElement = element;
    }
  });
};

function followMouse(ev: MouseEvent): void {
  const mousecoords: CanvasCoords = Globals.canvas.getCanvasMouseCoords(ev);
  followElement.getCoords().setX(mousecoords.getX() - (followElement.getWidth() / 2));
  followElement.getCoords().setY(mousecoords.getY() - (followElement.getHeight() / 2));
}

export function switchTool(tool: NetzlerTool): void {
  if (Globals.finished) return;
  Globals.selectedTool = tool;
  const toolCursorImages: Map<NetzlerTool, HTMLImageElement> = new Map<NetzlerTool, HTMLImageElement>([
    ['selection', <HTMLImageElement>document.getElementById('selection-image')],
    ['move', <HTMLImageElement>document.getElementById('move-image')],
    ['delete', <HTMLImageElement>document.getElementById('delete-image')],
    ['cable', <HTMLImageElement>document.getElementById('cable-image')],
    ['download', <HTMLImageElement>document.getElementById('downloadpng')]
  ]);
  Globals.canvasElement.style.cursor = `url('${toolCursorImages.get(tool).src}') 15 15, auto`;
}

export function showError(message: string): void {
  const errorElement: HTMLElement = <HTMLElement>document.getElementById('error-notification');
  showNotification(errorElement, message);
}

export function showSuccess(message: string): void {
  const successElement: HTMLElement = <HTMLElement>document.getElementById('success-notification');
  showNotification(successElement, message);
}

function showNotification(element: HTMLElement, message: string): void {
  element.innerHTML = message;
  element.classList.remove('hidden');
  setTimeout(() => {
    element.classList.add('hidden');
  }, 2500);
}

export function togglePopup(name: string = '', body: string = '', netzlerElement?: NetzlerElement): void {
  const popup: HTMLElement = <HTMLElement>document.getElementById('popup');
  const blur: HTMLElement = <HTMLElement>document.getElementById('pop-up-blur');
  popup.querySelector('.popup-title').innerHTML = name;
  popup.querySelector('.popup-body').innerHTML = body;
  popup.classList.toggle('hidden');
  blur.classList.toggle('hidden');
  if (!netzlerElement) return;
  netzlerElement.settings.forEach((value: string, key: string) => {
    popup.querySelector('.popup-body').querySelector(`[name=${key}]`)["value"] = value || '';
  });
  Globals.currentPopupNetzlerElement = netzlerElement;
}

export function handleSuccessClick(netzlerElement: NetzlerElement, popup: HTMLElement): void {
  netzlerElement.settings.clear();
  popup.querySelector('.popup-body').querySelectorAll('.netzler-popup-item').forEach((item: HTMLElement) => {
    netzlerElement.settings.set(item.getAttribute('name'), item['value'] || item.getAttribute('value'));
  });
  togglePopup();
}

export function setNewCharacterMessage(message: string): void {
  document.querySelector('#character-message-box').innerHTML = message || document.querySelector('#character-message-box').innerHTML;
}

export function drawCertificate(): void {
  const canvas: HTMLCanvasElement = Globals.canvasElement;
  const ctx: CanvasRenderingContext2D  = canvas.getContext('2d');
  ctx.drawImage(<HTMLImageElement>document.getElementById('zertifikatpng'), 0, 0, 720, 420);
  ctx.textAlign = 'left';
  ctx.font = "30px 'Montserrat', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
  ctx.fillStyle = '#fff';
  const abstand: number = 18;
  ctx.fillText(`Dieses Zertifikat bestätigt, dass der Spieler`, 50, 180);
  ctx.font = "35px 'Montserrat', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
  ctx.fillText(`${Globals.username}`, 50, 180 + 35 + abstand);
  ctx.font = "30px 'Montserrat', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
  ctx.fillText(`das Netzwerktechnik Lernspiel "Netzler"${Globals.cheated ? ' mit' : ''}`, 50, 180 + 35 + abstand + 35 + abstand);
  ctx.fillText(`${Globals.cheated ? 'Cheats ' : ''}durchgespielt hat!`, 50, 180 + 35 + abstand + 35 + abstand + 30 + abstand);
  ctx.font = "80px 'Ink Free', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
  ctx.fillText(`Netzler`, 420, 380);
  ctx.font = "10px 'Montserrat', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
  ctx.fillText('rbz-netzler.de', 10, 410);
}

export async function confetti(): Promise<void> {
  return new Promise<void>((resolve: (value: void | PromiseLike<void>) => void) => {
    Globals.confettiCanvas.classList.remove('hidden');
    const confetti: JSConfetti = new JSConfetti({ canvas: Globals.confettiCanvas });
    confetti.addConfetti().then(() => {
      Globals.confettiCanvas.classList.add('hidden');
      resolve();
    });
  });
}