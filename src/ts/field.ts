import { IValidator } from "./types";

export default class Field {
  isValid: boolean = true;
  private validators: IValidator[];

  constructor(
    public readonly field: HTMLInputElement,
    public readonly label: HTMLLabelElement,
    public errorElement: HTMLElement,
    public fieldErrorClasses: string[],
    public fieldClassesToRemove: string[],
    public labelErrorClasses: string[],
    public labelClassesToRemove: string[],
    validators: IValidator[]
  ) {
    this.validators = validators;
  }

  public validate(fields: Field[]): void {
    for (const { message, validator } of this.validators) {
      if (!validator(this.value, fields)) {
        if (typeof message === "string") {
          this.showError(message);
        } else {
          this.showError(message(this.value, fields));
        }
        this.isValid = false;
        return;
      }
    }

    if (!this.isValid) {
      this.hideError();
      this.isValid = true;
    }
  }

  showError(message: string): void {
    this.label.classList.add(...this.labelErrorClasses);
    this.label.classList.remove(...this.labelClassesToRemove);
    this.field.classList.add(...this.fieldErrorClasses);
    this.field.classList.remove(...this.fieldClassesToRemove);
    this.errorElement.textContent = message;
  }

  hideError(): void {
    this.label.classList.remove(...this.labelErrorClasses);
    this.label.classList.add(...this.labelClassesToRemove);
    this.field.classList.remove(...this.fieldErrorClasses);
    this.field.classList.add(...this.fieldClassesToRemove);
    this.errorElement.textContent = "";
  }

  get value(): string {
    return this.field.value;
  }

  get valueAsInt(): number {
    return parseInt(this.field.value);
  }
}
