import Field from "./field";
import { IValidator } from "./types";
import {
  createDate,
  fadeValueIn,
  getAge,
  getElementById,
  getFieldError,
} from "./utils";
import {
  isEmpty,
  noLetters,
  noSymbols,
  isDay,
  isMonth,
  isYear,
  isDayInFuture,
  isMonthInFuture,
  isYearInFuture,
  isDate,
} from "./validators";

function init(): void {
  const DAY_INPUT_ID = "dayField";
  const MONTH_INPUT_ID = "monthField";
  const YEAR_INPUT_ID = "yearField";

  const FORM = <HTMLFormElement>getElementById("form");

  const DAY_INPUT = <HTMLInputElement>getElementById(DAY_INPUT_ID);
  const MONTH_INPUT = <HTMLInputElement>getElementById(MONTH_INPUT_ID);
  const YEAR_INPUT = <HTMLInputElement>getElementById(YEAR_INPUT_ID);

  const DAY_ERROR = getFieldError(DAY_INPUT_ID);
  const MONTH_ERROR = getFieldError(MONTH_INPUT_ID);
  const YEAR_ERROR = getFieldError(YEAR_INPUT_ID);

  const DAY_LABEL = <HTMLLabelElement>getElementById("dayLabel");
  const MONTH_LABEL = <HTMLLabelElement>getElementById("monthLabel");
  const YEAR_LABEL = <HTMLLabelElement>getElementById("yearLabel");

  const YEARS_CONTAINER = <HTMLSpanElement>getElementById("years");
  const MONTHS_CONTAINER = <HTMLSpanElement>getElementById("months");
  const DAYS_CONTAINER = <HTMLSpanElement>getElementById("days");

  const FIELD_ERROR_CLASSES = ["border-light-red"];
  const FIELD_CLASSES_TO_REMOVE = ["focus:border-purple"];

  const LABEL_ERROR_CLASSES = ["text-light-red"];
  const LABEL_CLASSES_TO_REMOVE = ["text-smokey-grey"];

  const NO_EMPTY: IValidator = {
    validator: isEmpty,
    message: "Field is required!",
  };

  const NO_LETTERS: IValidator = {
    validator: noLetters,
    message: "No letters!",
  };

  const NO_SYMBOLS: IValidator = {
    validator: noSymbols,
    message: "No Symbols!",
  };

  const DAY_FIELD = new Field(
    DAY_INPUT,
    DAY_LABEL,
    DAY_ERROR,
    FIELD_ERROR_CLASSES,
    FIELD_CLASSES_TO_REMOVE,
    LABEL_ERROR_CLASSES,
    LABEL_CLASSES_TO_REMOVE,
    [
      NO_EMPTY,
      NO_LETTERS,
      NO_SYMBOLS,
      {
        validator: isDay,
        message: "Must be valid day.",
      },
      {
        validator: isDayInFuture,
        message: "Day must be in the past.",
      },
      {
        validator: isDate,
        message: (value, fields) => {
          const MONTHS = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];

          return `${
            MONTHS[fields[1].valueAsInt - 1]
          } doesn't have ${value} days.`;
        },
      },
    ]
  );

  const MONTH_FIELD = new Field(
    MONTH_INPUT,
    MONTH_LABEL,
    MONTH_ERROR,
    FIELD_ERROR_CLASSES,
    FIELD_CLASSES_TO_REMOVE,
    LABEL_ERROR_CLASSES,
    LABEL_CLASSES_TO_REMOVE,
    [
      NO_EMPTY,
      NO_LETTERS,
      NO_SYMBOLS,
      {
        validator: isMonth,
        message: "Must be valid month.",
      },
      {
        validator: isMonthInFuture,
        message: "Month must be in the past.",
      },
    ]
  );

  const YEAR_FIELD = new Field(
    YEAR_INPUT,
    YEAR_LABEL,
    YEAR_ERROR,
    FIELD_ERROR_CLASSES,
    FIELD_CLASSES_TO_REMOVE,
    LABEL_ERROR_CLASSES,
    LABEL_CLASSES_TO_REMOVE,
    [
      NO_EMPTY,
      NO_LETTERS,
      NO_SYMBOLS,
      {
        validator: isYear,
        message: "Must be valid year.",
      },
      {
        validator: isYearInFuture,
        message: "Year must be in the past.",
      },
    ]
  );

  const FIELDS = [DAY_FIELD, MONTH_FIELD, YEAR_FIELD];

  let previousValues: string[] = [];

  FORM.addEventListener("submit", function (event) {
    event.preventDefault();

    if (FIELDS.every((field, index) => field.value === previousValues[index])) {
      return;
    }

    previousValues = [];

    for (const field of FIELDS) {
      previousValues.push(field.value);
    }

    for (const field of FIELDS) {
      field.validate(FIELDS);
    }

    for (const field of FIELDS) {
      if (!field.isValid) {
        field.field.select();

        YEARS_CONTAINER.textContent = "- -";
        MONTHS_CONTAINER.textContent = "- -";
        DAYS_CONTAINER.textContent = "- -";

        return;
      }
    }

    const BIRTHDATE = createDate(
      YEAR_FIELD.value,
      MONTH_FIELD.value,
      DAY_FIELD.value
    );

    const AGE = getAge(BIRTHDATE);

    fadeValueIn(YEARS_CONTAINER, AGE.year.toString(), 200);
    fadeValueIn(MONTHS_CONTAINER, AGE.month.toString(), 200, 60);
    fadeValueIn(DAYS_CONTAINER, AGE.day.toString(), 200, 120);
  });
}

init();
