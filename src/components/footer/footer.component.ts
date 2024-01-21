import { OnInit } from '../../core/OnInit';
import { Component } from '../../core/Component';
import template from './footer.component.html';

@Component({
  tag: 'app-footer',
  template,
})
export class FooterComponent implements OnInit {
  maduOnInit(element: HTMLElement): void {
    element.querySelector('#year').innerHTML = new Date().getFullYear().toString();
  } 
}