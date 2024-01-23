import "../styles/styles";
import { ComponentManager } from "../core/ComponentManager";
import { HeaderComponent } from "../components/header/header.component";
import { FooterComponent } from "../components/footer/footer.component";
import { CanvasImagesComponent } from "../components/canvas-images/canvas-images.component";

ComponentManager.manage([
  HeaderComponent,
  FooterComponent,
  CanvasImagesComponent,
]);

import './canvas';

const isMobile: boolean = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (isMobile) {
  document.getElementById('device-not-supported').classList.toggle('hidden');
}

handleWidth();
window.addEventListener('resize', handleWidth);

function handleWidth(): void {
  const element: HTMLElement = document.getElementById('width-not-supported');
  if (window.innerWidth <= 720 && !isMobile) {
    element.classList.remove('hidden');
  }
  if (window.innerWidth > 720) {
    element.classList.add('hidden');
  }
}