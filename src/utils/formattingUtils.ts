import { ObjectType, Values } from "@/types/convert.types";

export const serializator = (query: string) => {
  const trimmedQuery = query.trim();
  const cleanedQuery = trimmedQuery.replace(/\s+/g, ' ');
  const commaRemovedQuery = cleanedQuery.replace(/,\s*}/g, '}');
  const result = commaRemovedQuery.replace(/(\w+):/g, '"$1":');
  return result;
}

export const convertToJson = (query: string) => {
  if (!query) return "{}";
  const convert = JSON.parse(serializator(query.replace(/'/g, '"').replace(';', ' ')));
  return JSON.stringify(convert, null, 2);
}

export const convertToObj = (query: string): string => {
  const jsonObject: ObjectType = JSON.parse(query);
  return `{ \n${formatObjectForDisplay(jsonObject)}\n }`;
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
      return `${spaces}${key}: ${value}`;
    })
    .join(',\n');
}

export const convertToInterface = (query: string): string => {
  const jsonObject: ObjectType = JSON.parse(serializator(query.replace(';', ' ')));
  const copyJson = structuredClone(jsonObject);
  const interfaceString = `interface MyInterface ${formatObjectForInterface(copyJson)}\n}`;
  return interfaceString.replace(/,/g, ';');
}

export const formatObjectForInterface = (obj: ObjectType, depth = 1): string => {
  const spaces = '  '.repeat(depth);
  return `{\n${Object.entries(obj)
    .map(([key, value]) => {
      const type = getTypeString(value, depth + 1);
      const formattedKey = key.includes(' ') ? `"${key}"` : key;
      return `${spaces}${formattedKey}: ${type};`;
    })
    .join('\n')}${spaces}`;
}

export function getTypeString(value: Values, depth: number): string {
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
      return formatObjectForInterface(value, depth);
    },
  };
  return typeMapping[typeof value](value as ObjectType);
}
