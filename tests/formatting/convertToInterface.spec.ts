import { expect, test } from "@playwright/test";
import { convertToInterface } from "../../src/utils/formattingUtils";

test.describe("convertToInterface test", () => {
  test("should convert simple JSON to TypeScript interface", () => {
    const input = '{"name": "John", "age": 30}';
    const expectedOutput =
      "interface MyInterface {\n  name: string;\n  age: number;\n}";

    const result = convertToInterface(input);

    expect(result).toEqual(expectedOutput);
  });

  test("should handle JSON with arrays", () => {
    const input = '{"name": "John", "hobbies": ["reading", "gaming"]}';
    const expectedOutput =
      "interface MyInterface {\n  name: string;\n  hobbies: string[];\n}";

    const result = convertToInterface(input);

    expect(result).toEqual(expectedOutput);
  });

  test("should handle empty arrays", () => {
    const input = '{"name": "John", "items": []}';
    const expectedOutput =
      "interface MyInterface {\n  name: string;\n  items: any[];\n}";

    const result = convertToInterface(input);

    expect(result).toEqual(expectedOutput);
  });

  test("should handle nested objects", () => {
    const input = '{"user": {"name": "John", "age": 30}}';
    const expectedOutput =
      "interface MyInterface {\n  user: {\n    name: string;\n    age: number;\n  };\n}";

    const result = convertToInterface(input);

    expect(result).toEqual(expectedOutput);
  });
});
