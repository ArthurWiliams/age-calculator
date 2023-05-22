import Field from "./field";

export type TValidator = (value: string, fields: Fields) => boolean;

export interface Fields {
  [index: string]: Field;
}

export interface IRule {
  validator: TValidator;
  message: string;
}

export interface IDate {
  year: number;
  month: number;
  day: number;
}
