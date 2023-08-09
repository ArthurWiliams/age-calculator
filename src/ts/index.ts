import Field from "./field";
import {
  createDate,
  getAge,
  hideError,
  showError,
  getElementById,
} from "./utils";
import {
  isEmpty,
  isValidDay,
  isValidMonth,
  isValidYear,
  isDayPast,
  isMonthPast,
  isYearPast,
  isValidDate,
} from "./validators";

function init(): void {
  try {
    const FORM = <HTMLFormElement>getElementById("birthdate-form");

    const EMPTY_ERROR_MESSAGE = "This field is required";
    const PAST_ERROR_MESSAGE = "Must be in the past";

    const YEARS_CONTAINER = <HTMLSpanElement>getElementById("years");
    const MONTHS_CONTAINER = <HTMLSpanElement>getElementById("months");
    const DAYS_CONTAINER = <HTMLSpanElement>getElementById("days");

    const YEAR_FIELD = <HTMLInputElement>getElementById("year-field");
    const MONTH_FIELD = <HTMLInputElement>getElementById("month-field");
    const DAY_FIELD = <HTMLInputElement>getElementById("day-field");

    const YEAR_RULES = new Field(YEAR_FIELD, [
      {
        message: EMPTY_ERROR_MESSAGE,
        validator: isEmpty,
      },
      {
        message: "Must be a valid year",
        validator: isValidYear,
      },
      {
        message: PAST_ERROR_MESSAGE,
        validator: isYearPast,
      },
    ]);

    const MONTH_RULES = new Field(MONTH_FIELD, [
      {
        message: EMPTY_ERROR_MESSAGE,
        validator: isEmpty,
      },
      {
        message: "Must be a valid month",
        validator: isValidMonth,
      },
      {
        message: PAST_ERROR_MESSAGE,
        validator: isMonthPast,
      },
    ]);

    const DAY_RULES = new Field(DAY_FIELD, [
      {
        message: EMPTY_ERROR_MESSAGE,
        validator: isEmpty,
      },
      {
        message: "Must be a valid day",
        validator: isValidDay,
      },
      {
        message: PAST_ERROR_MESSAGE,
        validator: isDayPast,
      },
    ]);

    const FIELDS = {
      [YEAR_FIELD.id]: YEAR_RULES,
      [MONTH_FIELD.id]: MONTH_RULES,
      [DAY_FIELD.id]: DAY_RULES
    }

    FORM.addEventListener("submit", function (event) {
      event.preventDefault();

      for (const key in FIELDS) {
        const field = FIELDS[key];

        for (const { message, validator } of field.rules) {
          if (!validator(field.value, FIELDS)) {
            showError(field.element, message);
            field.isValid = false;
            break;
          }

          hideError(field.element);
          field.isValid = true;
        }
      }

      for (const key in FIELDS) {
        const field = FIELDS[key];

        if (!field.isValid) {
          return false;
        }
      }

      const BIRTHDATE = createDate(
        YEAR_FIELD.value,
        MONTH_FIELD.value,
        DAY_FIELD.value
      );

      if (!isValidDate(BIRTHDATE)) {
        for (const key in FIELDS) {
          const FIELD = FIELDS[key];

          if (key === "day-field") {
            FIELD.isValid = false;
            showError(FIELD.element, "Must be valid date");
            continue;
          }

          showError(FIELD.element, "");
        }

        YEARS_CONTAINER.textContent = "- -";
        MONTHS_CONTAINER.textContent = "- -";
        DAYS_CONTAINER.textContent = "- -";

        return false;
      }

      for (const key in FIELDS) {
        const FIELD = FIELDS[key];

        FIELD.isValid = true;
        hideError(FIELD.element);
      }

      const AGE = getAge(BIRTHDATE);

      YEARS_CONTAINER.textContent = AGE.year.toString();
      MONTHS_CONTAINER.textContent = AGE.month.toString();
      DAYS_CONTAINER.textContent = AGE.day.toString();
    });
  } catch (error) {
    console.error(error);
  }
}

init();
