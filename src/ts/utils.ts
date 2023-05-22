import Field from "./field";
import { sub } from "date-fns";

export function showError(field: Field, message: string) {
  const FIELD = field.element;
  const ERROR_CONTAINER = FIELD?.nextElementSibling;

  FIELD?.classList.replace("border-off-white", "border-light-red");
  FIELD?.previousElementSibling?.classList.replace(
    "text-smokey-grey",
    "text-light-red"
  );

  if (ERROR_CONTAINER !== null && ERROR_CONTAINER !== undefined) {
    ERROR_CONTAINER.textContent = message;
  }
}

export function hideError(field: Field) {
  const FIELD = field.element;
  const ERROR_CONTAINER = FIELD?.nextElementSibling;

  FIELD?.classList.replace("border-light-red", "border-off-white");
  FIELD?.previousElementSibling?.classList.replace(
    "text-light-red",
    "text-smokey-grey"
  );

  if (ERROR_CONTAINER !== null && ERROR_CONTAINER !== undefined) {
    ERROR_CONTAINER.textContent = "";
  }
}

export function padZeros(value: string, length: number) {
  const ZEROS_COUNT = length - value.length;

  if (ZEROS_COUNT <= 0) {
    return value;
  }

export function getElementById<T extends Element>(id: string): T {
  if (id.startsWith("#")) {
    id = id.slice(1);
  }

  const ELEMENT = <T | null>document.getElementById(id);

  if (ELEMENT === null) {
    throw new Error(`Element with ${id} ID is not found!`);
  }

  return ELEMENT;
}
