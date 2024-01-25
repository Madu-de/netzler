import { Globals } from './../globals';
import { NetzlerLevel } from '../classes/NetzlerLevel';
import { confetti, drawCertificate, switchTool } from '../NetzlerFunctions';

export const level8: NetzlerLevel = new NetzlerLevel([{
  message: 'ICH BIN ERSTAUNT *Quak*!',
  action: (): void => { 
    confetti();
    drawCertificate();
    switchTool('download');
    Globals.finished = true;
    const messagebox: HTMLElement = document.getElementById('character-message-box');
    messagebox.classList.add('party-cursor');
    Globals.canvasElement.addEventListener('click', () => {
      const aTag: HTMLAnchorElement = <HTMLAnchorElement>document.getElementById('zertifikat-download-a');
      let url: string = Globals.canvasElement.toDataURL('image/png');
      url = url.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
      url = url.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Netzler-Zertifikat.png');
      aTag.href = url;
      aTag.click();
    });
    messagebox.addEventListener('click', () => {
      confetti();
    });
  }
}], [], []);
