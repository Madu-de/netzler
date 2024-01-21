import { ComponentBody } from "./Component";
import template from '../../madu-configuration.json';

export class ComponentManager {
  public static manage<T>(components: { new(): T; }[]): void {
    components.forEach((component: { new(): T; }) => {
      const c: T = new component();
      const body: ComponentBody = <ComponentBody>component.prototype['body'];
      const innerHTML: string[] = [];
      document.querySelectorAll(body.tag).forEach((element: HTMLElement, i: number) => {
        element.setAttribute(`madu-${body.tag}-component-id`, `${i}`);
        innerHTML.push(element.innerHTML);
        element.innerHTML = body.template;
      });
      document.querySelectorAll(body.tag).forEach((element: HTMLElement) => {
        const index: number = +element.getAttribute(`madu-${body.tag}-component-id`);
        element.querySelectorAll(template["template-element"]).forEach((outElement: HTMLElement) => {
          outElement.innerHTML = innerHTML[index];
        });
        c['maduOnInit']?.(element);
      });
    });
  }
}
