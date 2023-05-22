import { IRule, Fields } from "./types";
import { hideError, showError } from "./utils";
import Field from "./field";

export default class Form {
  element: HTMLFormElement;
  fields: Fields = {};

  constructor(form: HTMLFormElement | string) {
    if (form instanceof HTMLFormElement) {
      this.element = form;
      return;
    }

    if (form.startsWith("#")) {
      form = form.slice(1);
    }

    const FORM = <TElement<HTMLFormElement>>document.getElementById(form);

    if (FORM === null) {
      console.error(`Element with ${form} ID is not found!`);
      return;
    }

    this.element = FORM;
  }

  isValid() {
    for (const key in this.fields) {
      if (!this.fields[key].isValid) {
        return false;
      }
    }

    return true;
  }

  addField(field: string | HTMLInputElement, rules: IRule[]) {
    const FIELD = new Field(field);

    if (FIELD.element === null) {
      console.error(`Field with ${field} ID is not found`);
      return;
    }

    FIELD.rules = rules;

    this.fields[FIELD.element.id] = FIELD;
  }

  validate() {
    const FIELDS = this.fields;

    for (const key in FIELDS) {
      const FIELD = FIELDS[key];

      const ERROR_MESSAGE = FIELD.validate(FIELDS);

      if (ERROR_MESSAGE !== null) {
        showError(FIELD, ERROR_MESSAGE);
        continue;
      }

      hideError(FIELD);
    }
  }
}
