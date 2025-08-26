import { ObjectType, Values } from "@/types/convert.types";

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
        const arrayString = `[${value.map((item) => `"${item}"`).join(", ")}]`;
        return `${spaces}${key}: ${arrayString}`;
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

export function getTypeString(value: Values, depth: number): string {
  const typeMapping: Record<string, (value: ObjectType) => string> = {
    string: () => "string",
    number: () => "number",
    boolean: () => "boolean",
    object: (value) => {
      if (Array.isArray(value)) {
        if (value.length === 0) return "any[]";
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
  return typeMapping[typeof value](value as ObjectType);
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
