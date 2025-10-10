import { expect, test } from "@playwright/test";
import { convertToInterface } from "../../src/utils/formattingUtils";

test.describe("convertToInterface", () => {
  test("should handle array of objects with different properties", () => {
    const input = JSON.stringify({
      users: [
        { id: 1, name: "John", age: 30 },
        { id: 2, name: "Jane", email: "jane@example.com", active: true },
        { id: 3, name: "Bob", age: 25, department: "IT" },
      ],
    });

    const result = convertToInterface(input);

    expect(result).toContain("id: number");
    expect(result).toContain("name: string");
    expect(result).toContain("age?: number");
    expect(result).toContain("email?: string");
    expect(result).toContain("active?: boolean");
    expect(result).toContain("department?: string");


    expect(result).toContain("users: {");
    expect(result).toContain("}[]");
  });

  test("should handle nested arrays of objects", () => {
    const input = JSON.stringify({
      departments: [
        {
          name: "IT",
          employees: [
            { id: 1, name: "John", role: "Developer" },
            { id: 2, name: "Jane", role: "Manager", teamSize: 5 },
          ],
        },
        {
          name: "HR",
          employees: [{ id: 3, name: "Bob", role: "Recruiter", experience: 3 }],
        },
      ],
    });

    const result = convertToInterface(input);

    expect(result).toContain("name: string");
    expect(result).toContain("employees: {");

    expect(result).toContain("id: number");
    expect(result).toContain("name: string");
    expect(result).toContain("role: string");
    expect(result).toContain("teamSize?: number");
    expect(result).toContain("experience?: number");
  });

  test("should handle mixed types in same property", () => {
    const input = JSON.stringify({
      data: [
        { id: 1, value: "string" },
        { id: 2, value: 42 },
        { id: 3, value: true },
      ],
    });

    const result = convertToInterface(input);

    expect(result).toContain("id: number");
    expect(result).toContain("value: string");
  });

  test("should handle union types for same property with different types", () => {
    const input = JSON.stringify({
      products: [
        { id: 123, name: "martin" },
        { id: "123", name: 123, category: "electronics" },
      ],
    });

    const result = convertToInterface(input);

    expect(result).toContain("id: number | string");
    expect(result).toContain("name: string | number");
    expect(result).toContain("category?: string");
  });

  test("should handle mixed array and primitive types", () => {
    const input = JSON.stringify({
      products: [
        { id: 123, name: "martin" },
        { id: [123, 123], name: 123, category: "electronics" },
      ],
    });

    const result = convertToInterface(input);

    expect(result).toContain("id: number | number[]");
    expect(result).toContain("name: string | number");
    expect(result).toContain("category?: string");
  });
});
