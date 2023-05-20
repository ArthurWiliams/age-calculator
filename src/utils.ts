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

  return "0".repeat(ZEROS_COUNT).concat(value);
}

export function createDate(
  year: string,
  month: string = "01",
  day: string = "01"
) {
  return new Date(
    `${padZeros(year, 4)}-${padZeros(month, 2)}-${padZeros(day, 2)}`
  );
}

export function getAge(birthdate: Date) {
  return sub(new Date(), {
    years: birthdate.getFullYear(),
    months: birthdate.getMonth(),
    days: birthdate.getDate(),
  });
}
