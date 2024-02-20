// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ObjectType = Record<string, any>;

export const serializator = (query: string) => {
  const trimmedQuery = query.trim();
  const cleanedQuery = trimmedQuery.replace(/\s+/g, ' ');
  const commaRemovedQuery = cleanedQuery.replace(/,\s*}/g, '}');
  return commaRemovedQuery.replace(/(\w+):/g, '"$1":');
}

export const convertToJson = (query: string) => {
  const replace = query.replace(/'/g, '"');
  const convert = JSON.parse(serializator(replace));
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
  const jsonObject: ObjectType = JSON.parse(serializator(query));
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
    .join('\n')}\n${spaces}}`;
}

export function getTypeString(value: string | number | boolean | ObjectType, depth: number): string {
  const typeMapping: Record<string, (value: ObjectType) => string> = {
    string: () => "string",
    number: () => "number",
    boolean: () => "boolean",
    object: (value) => {
      if (Array.isArray(value)) {
        return `${getTypeString(value[0], depth)}[]`;
      } else if (typeof value === 'function') {
        return "string";
      } else {
        return formatObjectForInterface(value, depth);
      }
    },
  };
  return typeMapping[typeof value](value as ObjectType);
}
