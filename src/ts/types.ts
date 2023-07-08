import Field from "./field";

export type TValidator = (value: string, fields: TFields) => boolean;

export type TFields = Map<string, Field>;

export interface IRule {
  validator: TValidator;
  message: string;
}

export interface IDate {
  year: number;
  month: number;
  day: number;
}
