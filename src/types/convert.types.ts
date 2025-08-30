export type ObjectType = Record<string, any>;

export type Values = string | number | boolean | ObjectType;

export enum ConversionKeys {
  OBJECT_TO_JSON = "Object-JSON",
  OBJECT_TO_INTERFACE = "Object-Interface",
  JSON_TO_OBJECT = "JSON-Object",
  JSON_TO_INTERFACE = "JSON-Interface",
}
