import { Globals } from './../globals';
import { NetzlerLevel } from '../classes/NetzlerLevel';
import { confetti, drawCertificate, switchTool } from '../NetzlerFunctions';

export const level8: NetzlerLevel = new NetzlerLevel([{
  message: 'ICH BIN ERSTAUNT *Quak*! Ich habe für dich ein Zertifikat erstellt! Lade es dir doch runter, indem du mit deiner linken Maustaste drauf klickst! Wenn du noch nicht genug hast, klick doch mal auf die Sprechblase, um das Konfetti nochmal schießen zu lassen. Du kannst mich aber auch dazu bringen, einen Salto zu machen. Sollte dich das Projekt an sich interessieren, dann klick doch mal auf den Namen oben in der Kopfzeile! Die Entwickler des Spieles findest du unten. Nun gut, ich hoffe ich konnte dir im Thema Netzwerk-Konfiguration helfen! Hab noch einen schönen Tag *Quak* *Quak*!',
  action: (): void => { 
    confetti();
    drawCertificate();
    switchTool('download');
    Globals.finished = true;
    const messagebox: HTMLElement = document.getElementById('character-message-box');
    const characterImage: HTMLElement = document.getElementById('character-image');
    messagebox.classList.add('party-cursor');
    characterImage.classList.add('pointer-cursor');
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
    characterImage.addEventListener('click', () => {
      characterImage.classList.add('rotate');
      setTimeout(() => {
        characterImage.classList.remove('rotate');
      }, 1000);
    });
  }
}], [], []);
