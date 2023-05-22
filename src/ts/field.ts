import { IRule, Fields } from "./types";

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

    if (field.startsWith("#")) {
      field = field.slice(1);
    }

    const FIELD = <TElement<HTMLInputElement>>document.getElementById(field);

    if (FIELD === null) {
      console.error(`Element with ${field} ID is not found!`);
      return;
    }

    this.element = FIELD;
  }

  // addRule(message: string, validator: TValidator) {
  //   this.rules.push({
  //     message,
  //     validator,
  //   });
  // }

  validate(fields: Fields) {
    const FIELD = this;

    if (FIELD === null) {
      this.isValid = true;
      return null;
    }

    for (const rule of this.rules) {
      if (!rule.validator(FIELD, fields)) {
        this.isValid = false;
        return rule.message;
      }
    }

    this.isValid = true;
    return null;
  }

  value() {
    return this.element?.value ?? "";
  }
}
