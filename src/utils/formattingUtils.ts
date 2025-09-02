import { ObjectType } from "@/types/convert.types";

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

export const formatInterfaceForDisplay = (
  obj: ObjectType,
  depth = 1
): string => {
  const spaces = "  ".repeat(depth);
  const closingSpaces = depth > 1 ? "  ".repeat(depth - 1) : "";
  const entries = Object.entries(obj);
  return `{\n${entries
    .map(([key, value], index) => {
      const type = getTypeString(value, depth + 1);
      const formattedKey = key.includes(" ") ? `"${key}"` : key;
      const isLast = index === entries.length - 1;
      const punctuation = isLast ? ";" : ",";
      return `${spaces}${formattedKey}: ${type}${punctuation}`;
    })
    .join("\n")}\n${closingSpaces}}`;
};

export function getTypeString<T extends object>(
  value: T,
  depth: number
): string {
  const typeMapping: Record<string, (value: any) => string> = {
    string: (value) => {
      if (typeof value !== "string") return "";
      if (value === "date") return "Date";
      if (typeof value === "string" && value.includes(" | ")) {
        return value;
      }
      return "string";
    },
    number: () => "number",
    boolean: () => "boolean",
    object: (value) => {
      if (Array.isArray(value)) {
        if (value.length === 0) return "any[]";

        if (
          value.every(
            (item) =>
              typeof item === "object" && item !== null && !Array.isArray(item)
          )
        ) {
          const combinedObject = combineArrayObjects(value);
          return `${formatInterfaceForDisplay(combinedObject, depth)}[]`;
        }

        return `${getTypeString(value[0], depth)}[]`;
      }
      if (value === null) {
        return "null";
      }
      if (typeof value === "function") {
        return "string";
      }
      return formatInterfaceForDisplay(value, depth);
    },
  };
  return typeMapping[typeof value](value as T);
}

function combineArrayObjects<T extends object>(array: T[]): ObjectType {
  const combined: ObjectType = {};
  const typeTracker: Record<string, Set<string>> = {};

  const track = (k: string, t: string) =>
    (typeTracker[k] ??= new Set<string>()).add(t);

  const unionFrom = (types: Set<string>) => {
    const t = Array.from(types);
    if (t.length === 2 && t.includes("string") && t.includes("number"))
      return "string | number";
    if (t.length === 2 && t.includes("string") && t.includes("boolean"))
      return "string | boolean";
    if (t.length === 2 && t.includes("number") && t.includes("boolean"))
      return "number | boolean";
    return "any";
  };

  for (const obj of array) {
    if (!obj || typeof obj !== "object" || Array.isArray(obj)) continue;

    for (const [key, value] of Object.entries(obj)) {
      if (!(key in combined)) {
        combined[key] = value;
        track(key, typeof value);
        continue;
      }

      const prev = combined[key];
      const prevType = typeof prev;
      const nextType = typeof value;
      const prevIsArr = Array.isArray(prev);
      const nextIsArr = Array.isArray(value);

      track(key, prevType);
      track(key, nextType);

      if (prevIsArr !== nextIsArr) {
        const arrType = getTypeString(prevIsArr ? prev : value, 1);
        const nonType = getTypeString(prevIsArr ? value : prev, 1);
        combined[key] = prevIsArr
          ? `${arrType} | ${nonType}`
          : `${nonType} | ${arrType}`;
        continue;
      }

      if (prevType !== nextType) {
        combined[key] =
          typeTracker[key].size > 1 ? unionFrom(typeTracker[key]) : value;
        continue;
      }

      if (prevIsArr && nextIsArr) {
        combined[key] = combineArrayTypes(
          prev as unknown[],
          value as unknown[]
        );
      } else if (prev !== null && value !== null && prevType === "object") {
        combined[key] = combineArrayObjects([prev as object, value as object]);
      } else {
        combined[key] = value;
      }
    }
  }

  return combined;
}

function combineArrayTypes(arr1: any[], arr2: any[]): any[] {
  if (arr1.length === 0) return arr2;
  if (arr2.length === 0) return arr1;

  const type1 = typeof arr1[0];
  const type2 = typeof arr2[0];

  if (type1 !== type2) {
    return [...new Set([...arr1, ...arr2])];
  }

  if (type1 === "object" && arr1[0] !== null && arr2[0] !== null) {
    const combined = combineArrayObjects([...arr1, ...arr2]);
    return [combined];
  }

  return [...new Set([...arr1, ...arr2])];
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
