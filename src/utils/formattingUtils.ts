import { ObjectType, TypeExpr } from "@/types/convert.types";

export const convertToJson = (dataToConvert: string): string => {
  if (!dataToConvert) return "{}";
  try {
    const clearStr = serializator(
      dataToConvert.replace(/'/g, '"').replace(";", " ")
    );
    const convert = JSON.parse(clearStr);
    return `{\n${formatJsonForDisplay(convert)}}`;
  } catch (error) {
    return `{\n${formatJsonForDisplay(JSON.parse(dataToConvert))}\n}`;
  }
};

function formatJsonForDisplay(data: ObjectType, depth = 1): string {
  const spaces = " ".repeat(depth * 2);
  const entries = Object.entries(data);
  return entries
    .map(([key, value], index) => {
      const isLast = index === entries.length - 1;
      const comma = isLast ? "" : ",";

      if (Array.isArray(value)) {
        const arr = `[${value.map((e) => JSON.stringify(e)).join(", ")}]`;
        return `${spaces}"${key}": ${arr}${comma}\n`;
      }
      if (typeof value === "object") {
        return `${spaces}"${key}": {\n${formatJsonForDisplay(
          value,
          depth + 1
        )}${spaces}}${comma}\n`;
      }
      return `${spaces}"${key}": "${value}"${comma}\n`;
    })
    .join("");
}

export const convertToObj = (dataToConvert: string): string => {
  try {
    if (!dataToConvert) return "{}";
    const jsonObject: ObjectType = JSON.parse(dataToConvert);
    return `{\n${formatObjectForDisplay(jsonObject)}\n}`;
  } catch (error) {
    return `{\n${formatObjectForDisplay(
      JSON.parse(serializator(dataToConvert))
    )}\n}`;
  }
};

export function formatObjectForDisplay(obj: ObjectType, depth = 1): string {
  const spaces = "  ".repeat(depth);
  return Object.entries(obj)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        const formatArray = `[${value
          .map((item) => {
            if (Array.isArray(item)) {
              return `${formatArrayForDisplay(item, depth)}`;
            }

            if (typeof item === "object" && item !== null) {
              const itemSpaces = " ".repeat(depth + 2);
              return `\n${itemSpaces}{\n${formatObjectForDisplay(
                item,
                depth + 1
              )}\n${itemSpaces}}`;
            }

            return `"${item}"`;
          })
          .join(", ")}]`;
        return `${spaces}${key}: ${formatArray}`;
      }
      if (typeof value === "object" && value !== null) {
        return `${spaces}${key}: {\n${formatObjectForDisplay(
          value,
          depth + 1
        )}\n${spaces}}`;
      }
      return `${spaces}${key}: ${
        typeof value === "string" ? '"' + value + '"' : value
      }`;
    })
    .join(",\n");
}

function formatArrayForDisplay<T extends object>(
  arr: T[],
  depth: number
): string {
  const spaces = "  ".repeat(depth);
  const innerSpaces = "  ".repeat(depth + 1);

  if (arr.every((item) => typeof item !== "object" || item === null)) {
    return `[${arr.map((item) => JSON.stringify(item)).join(", ")}]`;
  }

  const items = arr
    .map((item) => {
      if (Array.isArray(item)) {
        return `\n${innerSpaces}${formatArrayForDisplay(item, depth + 1)}`;
      }
      if (typeof item === "object" && item !== null) {
        return `\n${innerSpaces}{\n${formatObjectForDisplay(
          item,
          depth + 2
        )}\n${innerSpaces}}`;
      }
      return `\n${innerSpaces}${JSON.stringify(item)}`;
    })
    .join(", ");

  return `\n${spaces}[${items}\n${spaces}]`;
}

export const convertToInterface = (dataToConvert: string): string => {
  let jsonObject: ObjectType;

  try {
    jsonObject = JSON.parse(dataToConvert);
  } catch (error) {
    try {
      jsonObject = JSON.parse(serializator(dataToConvert.replace(";", " ")));
    } catch (serializatorError) {
      throw new SyntaxError("Invalid JSON or object format");
    }
  }

  const copyJson = structuredClone(jsonObject);
  const interfaceString = `interface MyInterface ${formatInterfaceForDisplay(
    copyJson
  )}`;
  return interfaceString.replace(/,(\n)/g, ";$1");
};

const ANY: TypeExpr = { kind: "any" };

function inferType(v: unknown): TypeExpr {
  if (v === undefined) return { kind: "undefined" };
  if (v === null) return { kind: "null" };
  const t = typeof v;
  if (t === "string") return { kind: "string" };
  if (t === "number") return { kind: "number" };
  if (t === "boolean") return { kind: "boolean" };

  if (Array.isArray(v)) {
    let elem: TypeExpr | null = null;
    for (const x of v) {
      elem = elem ? unionType(elem, inferType(x)) : inferType(x);
    }
    return { kind: "array", elem: elem ?? ANY };
  }

  if (t === "object") {
    const props: Record<string, TypeExpr> = {};
    const optional = new Set<string>();
    for (const [k, val] of Object.entries(v as object)) {
      props[k] = inferType(val);
    }
    return { kind: "object", props, optional };
  }

  return ANY;
}

function unionType(a: TypeExpr, b: TypeExpr): TypeExpr {
  if (a.kind === "any" || b.kind === "any") return ANY;

  const flatten = (t: TypeExpr): TypeExpr[] =>
    t.kind === "union" ? t.types.flatMap(flatten) : [t];

  if (a.kind === "object" && b.kind === "object") {
    const keys = new Set([...Object.keys(a.props), ...Object.keys(b.props)]);
    const props: Record<string, TypeExpr> = {};
    const optional = new Set<string>([...a.optional, ...b.optional]);

    for (const k of keys) {
      const ta = a.props[k];
      const tb = b.props[k];
      if (ta && tb) {
        props[k] = unionType(ta, tb);
      } else {
        props[k] = (ta ?? tb)!;
        optional.add(k);
      }
    }
    return { kind: "object", props, optional };
  }

  if (a.kind === "array" && b.kind === "array") {
    return { kind: "array", elem: unionType(a.elem, b.elem) };
  }

  if (JSON.stringify(a) === JSON.stringify(b)) return a;

  const items = [...flatten(a), ...flatten(b)];
  const uniq = Array.from(
    new Map(items.map((t) => [JSON.stringify(t), t])).values()
  );

  return uniq.length === 1 ? uniq[0] : { kind: "union", types: uniq };
}

function typeToString(t: TypeExpr, depth = 1): string {
  const sp = (n: number) => "  ".repeat(n);

  switch (t.kind) {
    case "any":
    case "null":
    case "undefined":
    case "boolean":
    case "number":
    case "string":
      return t.kind;
    case "array": {
      const elemStr = typeToString(t.elem, depth);
      return t.elem.kind === "union" ? `(${elemStr})[]` : `${elemStr}[]`;
    }
    case "object": {
      const entries = Object.entries(t.props);
      if (entries.length === 0) return "{}";
      const inner = entries
        .map(
          ([k, v]) =>
            `${sp(depth)}${k}${t.optional.has(k) ? "?" : ""}: ${typeToString(
              v,
              depth + 1
            )};`
        )
        .join("\n");
      return `{\n${inner}\n${sp(depth - 1)}}`;
    }
    case "union":
      return t.types.map((x) => typeToString(x, depth)).join(" | ");
  }
}


export const formatInterfaceForDisplay = (
  obj: ObjectType,
  depth = 1
): string => {
  const t = inferType(obj);

  return typeToString(t, depth);
};


export function getTypeString<T extends object>(
  value: T,
  depth: number
): string {
  return typeToString(inferType(value), depth);
}

export const serializator = (dataToConvert: string): string => {
  let result = dataToConvert.trim();

  // Handle new Date() and other constructors
  result = result.replace(/new\s+Date\([^)]*\)/g, '"date"');
  result = result.replace(/new\s+\w+\([^)]*\)/g, '"object"');

  // Handle unquoted property names (more specific)
  result = result.replace(
    /([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)(\s*:)/g,
    '$1"$2"$3'
  );

  // Clean up trailing commas
  result = result.replace(/,(\s*[}\]])/g, "$1");

  return result;
};
