import { IFields, IDate } from "./types";
import { createDate, isLeapYear, DAYS_OF_MONTHS } from "./utils";

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

export function isMonthPast(value: string, fields: IFields): boolean {
  const YEAR_FIELD = fields['year-field'];

  if (!YEAR_FIELD.isValid) {
    return true;
  }

  const { year: YEAR, month: MONTH } = createDate(YEAR_FIELD.value, value);
  const CURRENT_DATE = new Date();

  return !(
    YEAR === CURRENT_DATE.getFullYear() && MONTH > CURRENT_DATE.getMonth() + 1
  );
}

export function isDayPast(value: string, fields: IFields): boolean {
  const MONTH_FIELD = fields['month-field'];
  const YEAR_FIELD = fields['day-field'];

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
    MONTH === CURRENT_DATE.getMonth() + 1 &&
    DAY > CURRENT_DATE.getDate()
  );
}

export function isValidDate(date: IDate): boolean {
  let daysOfMonth = DAYS_OF_MONTHS[date.month];

  if (isLeapYear(date.year) && date.month === 2) {
    daysOfMonth += 1;
  }

  return daysOfMonth >= date.day;
}
