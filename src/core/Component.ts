export function Component(body: ComponentBody): Function {
  return function(constructor: Function) {
    constructor.prototype.body = body;
  };
}

export type ComponentBody = { tag: string, template: string };