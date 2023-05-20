import Field from "./field";
import { Fields } from "./types";
import { createDate } from "./utils";

export function isEmpty(field: Field) {
  return !(field.value() === "");
}

export function isValidDay(field: Field) {
  const VALUE = field.value();

  if (!/^\d{1,2}$/.test(VALUE)) {
    return false;
  }

  const DAY = parseInt(VALUE);

  return DAY > 0 && DAY <= 31;
}

export function isValidMonth(field: Field) {
  const VALUE = field.value();

  if (!/^\d{1,2}$/.test(VALUE)) {
    return false;
  }

  const MONTH = parseInt(VALUE);

  return MONTH > 0 && MONTH <= 12;
}

export function isValidYear(field: Field) {
  return /^\d{1,4}$/.test(field.value());
}

export function isYearPast(field: Field) {
  const BIRTHDATE_YEAR = parseInt(field.value());

  return BIRTHDATE_YEAR <= new Date().getFullYear();
}

export function isMonthPast(field: Field, fields: Fields) {
  const YEAR_FIELD = fields["year-field"];

  if (!YEAR_FIELD.isValid) {
    return true;
  }

  const DATE = createDate(YEAR_FIELD.value(), field.value());
  const CURRENT_DATE = new Date();

  return !(
    DATE.getFullYear() === CURRENT_DATE.getFullYear() &&
    DATE.getMonth() > CURRENT_DATE.getMonth()
  );
}

export function isDayPast(field: Field, fields: Fields) {
  const MONTH_FIELD = fields["month-field"];
  const YEAR_FIELD = fields["year-field"];

  if (!MONTH_FIELD.isValid) {
    return true;
  }

  const DATE = createDate(
    YEAR_FIELD.value(),
    MONTH_FIELD.value(),
    field.value()
  );
  const CURRENT_DATE = new Date();

  return !(
    DATE.getFullYear() === CURRENT_DATE.getFullYear() &&
    DATE.getMonth() === CURRENT_DATE.getMonth() &&
    DATE.getDate() > CURRENT_DATE.getDate()
  );
}

export function isValidDate(date: Date) {
  return !isNaN(date.getTime());
}
