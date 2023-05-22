import Field from "./field";
import { sub } from "date-fns";

export const DAYS_OF_MONTHS = {
  1: 31,
  2: 28,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
};

export function showError(field: HTMLInputElement, message: string) {
  const ERROR_CONTAINER = field?.nextElementSibling;

  field?.classList.replace("border-off-white", "border-light-red");
  field?.previousElementSibling?.classList.replace(
    "text-smokey-grey",
    "text-light-red"
  );

  if (ERROR_CONTAINER !== null && ERROR_CONTAINER !== undefined) {
    ERROR_CONTAINER.textContent = message;
  }
}

export function hideError(field: HTMLInputElement) {
  const ERROR_CONTAINER = field?.nextElementSibling;

  field?.classList.replace("border-light-red", "border-off-white");
  field?.previousElementSibling?.classList.replace(
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

export function isLeapYear(year: number): boolean {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
