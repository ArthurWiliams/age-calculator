import Form from "./form";
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
    const FORM = new Form("birthdate-form");

    const EMPTY_ERROR_MESSAGE = "This field is required";
    const PAST_ERROR_MESSAGE = "Must be in the past";

    const YEARS_CONTAINER = <HTMLSpanElement>getElementById("years");
    const MONTHS_CONTAINER = <HTMLSpanElement>getElementById("months");
    const DAYS_CONTAINER = <HTMLSpanElement>getElementById("days");

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

    FORM.element.addEventListener("submit", function (event) {
      event.preventDefault();

      FORM.validate();

      if (!FORM.isValid()) {
        YEARS_CONTAINER.textContent = "- -";
        MONTHS_CONTAINER.textContent = "- -";
        DAYS_CONTAINER.textContent = "- -";
        return false;
      }

      const FIELDS = FORM.fields;

      const BIRTHDATE = createDate(
        FIELDS["year-field"].value,
        FIELDS["month-field"].value,
        FIELDS["day-field"].value
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
    throw error;
  }
}

init();
