import { IRule } from "./types";

export default class Field {
  element: HTMLInputElement;
  isValid: boolean = true;
  rules: IRule[] = [];

  constructor(field: HTMLInputElement, rules: IRule[]) {
    this.element = field;
    this.rules = rules;
  }

  get value(): string {
    return this.element.value;
  }
}
