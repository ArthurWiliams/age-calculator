import Field from "./field";

export type TElement<T extends Element> = T | null;
export type TValidator = (field: Field, fields: Fields) => boolean;

export interface Fields {
  [index: string]: Field;
}

export interface IRule {
  validator: TValidator;
  message: string;
}
