import { IRule, Fields } from "./types";
import { hideError, showError, getElementById } from "./utils";
import Field from "./field";

export default class Form {
  element: HTMLFormElement;
  fields: Fields = {};

  constructor(form: HTMLFormElement | string) {
    if (form instanceof HTMLFormElement) {
      this.element = form;
      return;
    }

    try {
      this.element = getElementById(form);
    } catch (error) {
      throw error;
    }
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
    try {
      const FIELD = new Field(field);

      FIELD.rules = rules;

      this.fields[FIELD.element.id] = FIELD;
    } catch (error) {
      throw error;
    }
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
