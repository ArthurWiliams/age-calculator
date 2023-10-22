import Field from "./field";
import { isLeapYear, DAYS_OF_MONTHS } from "./utils";

export function isEmpty(value: string): boolean {
  return value !== "";
}

export function noLetters(value: string): boolean {
  return !/[a-z]/i.test(value);
}

export function noSymbols(value: string): boolean {
  return !/[^a-z0-9]/i.test(value);
}

export function isDay(value: string): boolean {
  if (!/^\d{1,2}$/.test(value)) {
    return false;
  }

  const DAY = parseInt(value);

  return DAY > 0 && DAY <= 31;
}

export function isMonth(value: string): boolean {
  if (!/^\d{1,2}$/.test(value)) {
    return false;
  }

  const MONTH = parseInt(value);

  return MONTH > 0 && MONTH <= 12;
}

export function isYear(value: string): boolean {
  return parseInt(value) >= 0;
}

export function isYearInFuture(value: string): boolean {
  return parseInt(value) <= new Date().getFullYear();
}

export function isMonthInFuture(value: string, fields: Field[]): boolean {
  const CURRENT_DATE = new Date();

  if (
    fields[0].valueAsInt === CURRENT_DATE.getFullYear() &&
    parseInt(value) > CURRENT_DATE.getMonth() + 1
  ) {
    return false;
  }

  return true;
}

export function isDayInFuture(value: string, fields: Field[]): boolean {
  const CURRENT_DATE = new Date();

  if (
    fields[0].valueAsInt === CURRENT_DATE.getFullYear() &&
    fields[1].valueAsInt === CURRENT_DATE.getMonth() + 1 &&
    parseInt(value) > CURRENT_DATE.getDate()
  ) {
    return false;
  }

  return true;
}

export function isDate(value: string, fields: Field[]): boolean {
  const [YEAR_FIELD, MONTH_FIELD] = fields;

  if (!MONTH_FIELD.isValid || !YEAR_FIELD.isValid) {
    return true;
  }

  const MONTH = MONTH_FIELD.valueAsInt;

  let addedDay = 0;

  if (isLeapYear(YEAR_FIELD.valueAsInt) && MONTH === 2) {
    addedDay += 1;
  }

  const DAYS = DAYS_OF_MONTHS[MONTH];

  if (!DAYS) {
    return true;
  }

  return DAYS + addedDay >= parseInt(value);
}
