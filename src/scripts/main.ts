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

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  document.body.innerHTML = 'Dein Gerät wird nicht unterstützt!';
}