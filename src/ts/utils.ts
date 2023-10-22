import { IDate } from "./types";

export const DAYS_OF_MONTHS: {
  [index: number]: number | undefined;
} = {
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

export function getElementById<T extends Element>(id: string): T {
  const ELEMENT = <T | null>document.getElementById(id);

  if (ELEMENT === null) {
    throw new Error(`Element with ID '${id}' is not found!`);
  }

  return ELEMENT;
}

export function getFieldError(id: string): HTMLSpanElement {
  return <HTMLSpanElement>getElementById(id + "Error");
}

export function createDate(
  year: string,
  month: string = "01",
  day: string = "01"
): IDate {
  return {
    year: parseInt(year),
    month: parseInt(month),
    day: parseInt(day),
  };
}

export function getAge({ year, month, day }: IDate): IDate {
  const CURRENT_DATE = new Date();

  let [currentYear, currentMonth, currentDay] = [
    CURRENT_DATE.getFullYear(),
    CURRENT_DATE.getMonth() + 1,
    CURRENT_DATE.getDate(),
  ];

  if (currentDay < day) {
    const DAYS_OF_THE_MONTH = <number>DAYS_OF_MONTHS[month];

    if (isLeapYear(year) && month === 2) {
      currentDay += DAYS_OF_THE_MONTH + 1;
    } else {
      currentDay += DAYS_OF_THE_MONTH;
    }

    currentMonth -= 1;
  }

  if (currentMonth < month) {
    currentYear -= 1;
    currentMonth += 12;
  }

  return {
    year: currentYear - year,
    month: currentMonth - month,
    day: currentDay - day,
  };
}

export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function fadeIn(element: HTMLElement, duration: number): number {
  let start: number;

  function animate(timestamp: number): void {
    const value = (timestamp - start) / duration;

    if (value < 1) {
      element.style.opacity = value.toString();
      requestAnimationFrame((timestamp) => animate(timestamp));
    } else {
      element.style.opacity = "1";
    }
  }

  return requestAnimationFrame((timestamp) => {
    start = timestamp;

    animate(timestamp);
  });
}

function fadeOut(element: HTMLElement, duration: number): number {
  let start: number;

  function animate(timestamp: number): void {
    const value = 1 - (timestamp - start) / duration;

    if (value > 0) {
      element.style.opacity = value.toString();
      requestAnimationFrame((timestamp) => animate(timestamp));
    } else {
      element.style.opacity = "0";
    }
  }

  return requestAnimationFrame((timestamp) => {
    start = timestamp;

    animate(timestamp);
  });
}

export function fadeValueIn(
  element: HTMLElement,
  value: string,
  duration: number,
  delay: number = 0
): void {
  duration = duration / 2;

  setTimeout(() => {
    fadeOut(element, duration);

    setTimeout(() => {
      element.textContent = value;
      fadeIn(element, duration);
    }, duration);
  }, delay);
}
