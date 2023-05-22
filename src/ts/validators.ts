import Field from "./field";
import { Fields } from "./types";
import { createDate } from "./utils";

export function isEmpty(value: string): boolean {
  return !(value === "");
}

export function isValidDay(value: string): boolean {
  if (!/^\d{1,2}$/.test(value)) {
    return false;
  }

  const DAY = parseInt(value);

  return DAY > 0 && DAY <= 31;
}

export function isValidMonth(value: string): boolean {
  if (!/^\d{1,2}$/.test(value)) {
    return false;
  }

  const MONTH = parseInt(value);

  return MONTH > 0 && MONTH <= 12;
}

export function isValidYear(value: string): boolean {
  return /^\d{1,4}$/.test(value);
}

export function isYearPast(value: string): boolean {
  const YEAR = parseInt(value);

  return YEAR <= new Date().getFullYear();
}

export function isMonthPast(value: string, fields: Fields): boolean {
  const YEAR_FIELD = fields["year-field"];

  if (!YEAR_FIELD.isValid) {
    return true;
  }

  const { year: YEAR, month: MONTH } = createDate(YEAR_FIELD.value, value);
  const CURRENT_DATE = new Date();

  return !(
    YEAR === CURRENT_DATE.getFullYear() && MONTH > CURRENT_DATE.getMonth()
  );
}

export function isDayPast(value: string, fields: Fields): boolean {
  const MONTH_FIELD = fields["month-field"];
  const YEAR_FIELD = fields["year-field"];

  if (!MONTH_FIELD.isValid) {
    return true;
  }

  const {
    year: YEAR,
    month: MONTH,
    day: DAY,
  } = createDate(YEAR_FIELD.value, MONTH_FIELD.value, value);
  const CURRENT_DATE = new Date();

  return !(
    YEAR === CURRENT_DATE.getFullYear() &&
    MONTH === CURRENT_DATE.getMonth() &&
    DAY > CURRENT_DATE.getDate()
  );
}

export function isValidDate(date: Date) {
  return !isNaN(date.getTime());
}
