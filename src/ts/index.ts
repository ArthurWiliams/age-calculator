import Form from "./form";
import { TElement } from "./types";
import { createDate, getAge, hideError, showError } from "./utils";
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

function init() {
  const FORM = new Form("birthdate-form");

  const EMPTY_ERROR_MESSAGE = "This field is required";
  const PAST_ERROR_MESSAGE = "Must be in the past";

  const YEARS_CONTAINER = <TElement<HTMLSpanElement>>(
    document.getElementById("years")
  );
  const MONTHS_CONTAINER = <TElement<HTMLSpanElement>>(
    document.getElementById("months")
  );
  const DAYS_CONTAINER = <TElement<HTMLSpanElement>>(
    document.getElementById("days")
  );

  if (
    YEARS_CONTAINER === null ||
    MONTHS_CONTAINER === null ||
    DAYS_CONTAINER === null
  ) {
    return;
  }

  FORM.addField("year-field", [
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

  FORM.addField("month-field", [
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

  FORM.addField("day-field", [
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

  FORM.element?.addEventListener("submit", (event) => {
    event.preventDefault();

    FORM.validate();

    if (!FORM.isValid()) {
      YEARS_CONTAINER.textContent = "--";
      MONTHS_CONTAINER.textContent = "--";
      DAYS_CONTAINER.textContent = "--";
      return false;
    }

    const FIELDS = FORM.fields;
    const BIRTHDATE = createDate(
      FIELDS["year-field"].value(),
      FIELDS["month-field"].value(),
      FIELDS["day-field"].value()
    );

    if (!isValidDate(BIRTHDATE)) {
      for (const key in FIELDS) {
        const FIELD = FIELDS[key];

        if (key === "day-field") {
          showError(FIELD, "Must be a valid date");
          continue;
        }

        showError(FIELD, "");
      }

      YEARS_CONTAINER.textContent = "--";
      MONTHS_CONTAINER.textContent = "--";
      DAYS_CONTAINER.textContent = "--";

      return false;
    }

    for (const key in FIELDS) {
      const FIELD = FIELDS[key];

      hideError(FIELD);
    }

    console.log("Form is valid");

    const AGE = getAge(BIRTHDATE);

    YEARS_CONTAINER.textContent = AGE.getFullYear().toString();
    MONTHS_CONTAINER.textContent = AGE.getMonth().toString();
    DAYS_CONTAINER.textContent = AGE.getDate().toString();
  });
}

init();
