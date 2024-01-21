[![Netlify Status](https://api.netlify.com/api/v1/badges/e39c2ef7-ae80-49ed-a084-6cacabaf3c94/deploy-status)](https://app.netlify.com/sites/netzler/deploys)

# Madu Framework
This is my own little framework based on webpack including typescript, static components and a compiler which compiles all files into 3.

# How to use this template
1. Create a repository based on this template
2. Run <code>npm run start</code> to watch the files
3. Run <a href="https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer">Liveserver</a> on <code>/dist/index.html</code>

# How to build the project
1. Run <code>npm run build</code>
2. When everything is done, you'll see the project at <code>/dist</code>

# How to create components
1. Create a directory at <code>/src/components</code>
2. Create the <code>/src/components/{name}/{name}.component.ts</code> file
3. Create the <code>/src/components/{name}/{name}.component.html</code> file
4. Paste this into the Typescript file and swap {name} with your component name:
```ts
import { Component } from '../../core/Component';
import template from './{name}.component.html';

@Component({
  tag: 'app-{name}',
  template,
})
export class {Name}Component { }
```
5. Add the component to the array at the <code>ComponentManager.manage</code> call at <code>/src/scripts/main.ts</code>:
```ts
import "../styles/styles";
import { ComponentManager } from "../core/ComponentManager";
import { HeaderComponent } from "../components/header/header.component";
import { FooterComponent } from "../components/footer/footer.component";
import { BodyComponent } from "../components/body/body.component";

ComponentManager.manage([
  HeaderComponent,
  FooterComponent,
  BodyComponent,
]);
```

### How to add external content to your component
1. Add the <code>madu-template</code>-element, to your component html file. (If you changed the name in the <code>madu-configuration.json</code> use that instead)
2. Add content to the used component.

Example:
```html
<!--footer.component.html-->
<footer>
  <p>This is an example footer</p>
  <madu-template></madu-template>
</footer>
```
```html
<!--index.html-->
<!DOCTYPE html>
<html lang="de-DE">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MaduChat</title>
</head>
<body>
  <app-footer>
    Everything here will be pasted into the madu-template component
  </app-footer>
</body>
</html>
```

### How to use scoped css
1. Create a <code>style</code>-Tag at the end of your component html file.
2. Use <code>:scope</code> as pseudo element before you select your element

Example:
```html
<footer>
  <p>© Madu - <span id="year"></span></p>
</footer>

<style>
  :scope footer {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :scope p {
    color: red;
  }
</style>
```

### How to add logic to a component
1. Implement the <code>OnInit</code> interface
2. Add the <code>maduOnInit</code> method to your component class. The first parameter is the HTMLElement that you created to paste your component/component.html into.
3. For example you can get every element of the single component and edit them.

Example:
```ts
@Component({
  tag: 'app-footer',
  template,
})
export class FooterComponent implements OnInit {
  maduOnInit(element: HTMLElement): void {
    const yearEl: HTMLElement = element.querySelector('#year');
    yearEl.innerHTML = new Date().getFullYear().toString();
  } 
}
```

# How to use canvas
1. Create a canvas in the index.html or a component
```html
<canvas id="canvas" width="720" height="420"></canvas>
```
2. If you want to use images, add them to the index.html and add following css to your code:
```html
<!--index.html-->
<div class="canvas-images">
  <img src="path/to/image.png" id="">
</div>
```
```scss
// main.scss
div.canvas-images {
  display: none;
}
```
3. Create a <code>Canvas</code> instance with the HTMLCanvasElement
```ts
import { Canvas } from "../core/canvas/Canvas";

const canvasElement: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
const canvas: Canvas = new Canvas(canvasElement);
```

### How to create an element
1. If you dont, add the element image to your index.html like step 2 at "How to use canvas"
2. Create a <code>CanvasElement</code> instance:
```ts
import { CanvasElement } from "../core/canvas/CanvasElement";

const x: number = 200;
const y: number = 200;
const image: HTMLImageELement = <HTMLImageElement>document.getElementById('madupng');
const width: number = 50;
const height: number = 50;
const duck1: CanvasElement = new CanvasElement(x, y, image, width, height);
```
2. Add the element to your canvas:
```ts
canvas.addElement(duck1);
```
3. You can edit the rendering element using the <code>CanvasElement</code> instance


### How to create a line
1. Create a <code>CanvasLine</code> instance:
```ts
import { CanvasCoords } from "../core/canvas/CanvasCoords";
import { CanvasLine } from './../core/canvas/CanvasLine';

const coords1: CanvasCoords = new CanvasCoords(20, 20);
const coords2: CanvasCoords = new CanvasCoords(30, 40);
const width: number = 20;
const style: string = 'yellow';
const line: CanvasLine = new CanvasLine([coords1, coords2], width, style);
```
2. Add the line to your canvas:
```ts
canvas.addLine(line);
```
3. You can edit the rendering line using the <code>CanvasLine</code> instance

#### How to add a constant line between elements
1. Call the <code>addLineBetweenElements</code> method on the canvas object
```ts
import { CanvasElement } from "../core/canvas/CanvasElement";
import { CanvasLine } from './../core/canvas/CanvasLine';

const duck1: CanvasElement = new CanvasElement(200, 200, <HTMLImageElement>document.getElementById('madupng'), 50, 50);

const duck2: CanvasElement = new CanvasElement(550, 150, <HTMLImageElement>document.getElementById('madupng'), 50, 50);

const line: CanvasLine = canvas.addLineBetweenElements(duck1, duck2, 10, 'yellow');
```
3. You can edit the rendering line using the <code>CanvasLine</code> instance

### How to change the z-index/priority of an element or line
Firstly lines have automatically priority 0. Elements have automatically priority 1. That means that every elemement is automatically over every line.
But if you want to change the priority of an element to a higher one to render it over everything, you can change the priority every time you want to.

#### How to set the priority of an element or line when creating 
1. When creating an element or line, you can set the priority in the constructor
```ts
const duck1: CanvasElement = new CanvasElement(200, 200, <HTMLImageElement>document.getElementById('madupng'), 50, 50, 2);

const duck2: CanvasElement = new CanvasElement(550, 150, <HTMLImageElement>document.getElementById('madupng'), 50, 50, 6);

const line: CanvasLine = canvas.addLineBetweenElements(duck1, duck2, 10, 'yellow', 200);
```
In this example the line will be rendered over duck2 and duck2 over duck1.

#### How to set the priority of an element or line on runtime
1. Every time you want to set the priority of an element or line you can change the priority of the object
```
duck1.priority = 2;
duck2.priority = 3;
line.priority = 1;
```
In this example duck2 will be rendered over duck1 and duck1 over the line.

### How to render/start the canvas
1. After all, you call the render method on the canvas. It will render every elements and lines how often it can.
```ts
canvas.render();
```
