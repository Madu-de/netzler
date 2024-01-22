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
