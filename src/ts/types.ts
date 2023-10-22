import Field from "./field";

export type TValidator = (value: string, fields: Field[]) => boolean;

export type TMessageCallback = (fieldValue: string, fields: Field[]) => string;

export interface IValidator {
  validator: TValidator;
  message: string | TMessageCallback;
}

export interface IDate {
  year: number;
  month: number;
  day: number;
}
