import { IRule, Fields } from "./types";
import { getElementById } from "./utils";

export default class Field {
  element: HTMLInputElement;
  isValid: boolean = true;
  rules: IRule[] = [];

  constructor(field: HTMLInputElement | string) {
    if (field instanceof HTMLInputElement) {
      this.element = field;
      return;
    }

    try {
      this.element = getElementById(field);
    } catch (error) {
      throw error;
    }
  }

  get value(): string {
    return this.element.value;
  }
}
