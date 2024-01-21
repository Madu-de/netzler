import "../styles/styles";
import { ComponentManager } from "../core/ComponentManager";
import { HeaderComponent } from "../components/header/header.component";
import { FooterComponent } from "../components/footer/footer.component";
import { BodyComponent } from "../components/body/body.component";
import { CanvasImagesComponent } from "../components/canvas-images/canvas-images.component";

ComponentManager.manage([
  HeaderComponent,
  FooterComponent,
  BodyComponent,
  CanvasImagesComponent,
]);

import './canvas';