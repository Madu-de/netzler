import { Globals } from './../globals';
import JSConfetti from 'js-confetti';
import { NetzlerLevel } from '../classes/NetzlerLevel';
import { drawCertificate, switchTool } from '../NetzlerFunctions';

export const level8: NetzlerLevel = new NetzlerLevel([{
  message: 'ICH BIN ERSTAUNT *Quak*!',
  action: (): void => { 
    Globals.confettiCanvas.classList.remove('hidden');
    const confetti: JSConfetti = new JSConfetti({ canvas: Globals.confettiCanvas });
    confetti.addConfetti().then(() => {
      Globals.confettiCanvas.classList.add('hidden');
    });
    drawCertificate();
    switchTool('download');
    Globals.finished = true;
    Globals.canvasElement.addEventListener('click', () => {
      const aTag: HTMLAnchorElement = <HTMLAnchorElement>document.getElementById('zertifikat-download-a');
      let url: string = Globals.canvasElement.toDataURL('image/png');
      url = url.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
      url = url.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Netzler-Zertifikat.png');
      aTag.href = url;
      aTag.click();
    });
  }
}], [], []);
