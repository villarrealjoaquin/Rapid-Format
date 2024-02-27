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
    return `{\n${formatJsonForDisplay(JSON.parse(dataToConvert))}\n}`
  }
};

function formatJsonForDisplay(data: ObjectType, depth = 1): string {
  const spaces = " ".repeat(depth * 2);
  return Object.entries(data)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        const arr = `[${value.map((e) => JSON.stringify(e)).join(", ")}]`;
        return `${spaces}"${key}": ${arr},\n`;
      }
      if (typeof value === "object") {
        return `${spaces}"${key}": {\n${formatJsonForDisplay(
          value,
          depth + 1
        )}${spaces}},\n`;
      }
      return `${spaces}"${key}": "${value}",\n`;
    })
    .join("");
}

export const convertToObj = (dataToConvert: string): string => {
  try {
    if (!dataToConvert) return "{}";
    const jsonObject: ObjectType = JSON.parse(dataToConvert);
    return `{\n${formatObjectForDisplay(jsonObject)}\n}`;
  } catch (error) {
    return `{\n${formatObjectForDisplay(JSON.parse(serializator(dataToConvert)))}\n}`;
  }
}

export function formatObjectForDisplay(obj: ObjectType, depth = 1): string {
  const spaces = '  '.repeat(depth);
  return Object.entries(obj)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        const arrayString = `[${value.map(item => `"${item}"`).join(', ')}]`;
        return `${spaces}${key}: ${arrayString}`;
      }
      if (typeof value === 'object' && value !== null) {
        return `${spaces}${key}: {\n${formatObjectForDisplay(value, depth + 1)}\n${spaces}}`;
      }
      return `${spaces}${key}: ${typeof value === 'string' ? "\"" + value + "\"" : value}`;
    })
    .join(',\n');
}

export const convertToInterface = (dataToConvert: string): string => {
  const jsonObject: ObjectType = JSON.parse(serializator(dataToConvert.replace(';', ' ')));
  const copyJson = structuredClone(jsonObject);
  const interfaceString = `interface MyInterface ${formatInterfaceForDisplay(copyJson)}\n}`;
  return interfaceString.replace(/,/g, ';');
}

export const formatInterfaceForDisplay = (obj: ObjectType, depth = 1): string => {
  const spaces = '  '.repeat(depth);
  return `{\n${Object.entries(obj)
    .map(([key, value]) => {
      const type = getTypeString(value, depth + 1);
      const formattedKey = key.includes(' ') ? `"${key}"` : key;
      return `${spaces}${formattedKey}: ${type}`;
    })
    .join('\n')}${spaces}`;
}

export function getTypeString(value: Values, depth: number): string {
  const spaces = '  '.repeat(depth - 1);
  const typeMapping: Record<string, (value: ObjectType) => string> = {
    string: () => "string",
    number: () => "number",
    boolean: () => "boolean",
    object: (value) => {
      if (Array.isArray(value)) {
        return `${getTypeString(value[0], depth)}[]`;
      }
      if (typeof value === 'function') {
        return "string";
      }
      return `${formatInterfaceForDisplay(value, depth)}\n${spaces}}`;
    }
  };
  return typeMapping[typeof value](value as ObjectType);
}

export const serializator = (dataToConvert: string): string => {
  const trimmedQuery = dataToConvert.trim();
  const cleanedQuery = trimmedQuery.replace(/\s+/g, ' ');
  const commaRemovedQuery = cleanedQuery.replace(/,\s*}/g, '}');
  const result = commaRemovedQuery.replace(/(['"]?)(\w+)(['"]?):/g, '"$2":');
  return result;
}
