import { IRule, Fields } from "./types";
import { getElementById } from "./utils";

export default class Field {
  element: HTMLInputElement;
  isValid: boolean = true;
  rules: IRule[] = [];

  // static isOneInvalid(fields: Field[]) {
  //   return fields.some((field) => !field.isValid);
  // }

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

  // addRule(message: string, validator: TValidator) {
  //   this.rules.push({
  //     message,
  //     validator,
  //   });
  // }

  get value(): string {
    return this.element.value;
  }
}
