export type ObjectType = Record<string, any>;

export type Values = string | number | boolean | ObjectType;

export enum ConversionKeys {
  OBJECT_TO_JSON = "Object-JSON",
  OBJECT_TO_INTERFACE = "Object-Interface",
  JSON_TO_OBJECT = "JSON-Object",
  JSON_TO_INTERFACE = "JSON-Interface",
}

export type TypeExpr =
  | { kind: "any" }
  | { kind: "null" }
  | { kind: "undefined" }
  | { kind: "boolean" }
  | { kind: "number" }
  | { kind: "string" }
  | { kind: "array"; elem: TypeExpr }
  | { kind: "object"; props: Record<string, TypeExpr>; optional: Set<string> }
  | { kind: "union"; types: TypeExpr[] };