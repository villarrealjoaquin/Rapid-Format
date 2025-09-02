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

    // Verificar que todas las propiedades están presentes
    expect(result).toContain("id: number");
    expect(result).toContain("name: string");
    expect(result).toContain("age: number");
    expect(result).toContain("email: string");
    expect(result).toContain("active: boolean");
    expect(result).toContain("department: string");

    // Verificar que la estructura del array es correcta
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

    // Verificar propiedades del departamento
    expect(result).toContain("name: string");
    expect(result).toContain("employees: {");

    // Verificar propiedades de empleados (combinadas de todos los objetos)
    expect(result).toContain("id: number");
    expect(result).toContain("name: string");
    expect(result).toContain("role: string");
    expect(result).toContain("teamSize: number");
    expect(result).toContain("experience: number");
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

    // Verificar que se maneja la unión de tipos
    expect(result).toContain("id: number");
    expect(result).toContain("value: string");
    // Nota: En la implementación actual, se mantiene el último tipo encontrado
    // Para una implementación más robusta, se podría generar union types
  });

  test("should handle union types for same property with different types", () => {
    const input = JSON.stringify({
      sarasa: [
        { pepe: 123, pato: "martin" },
        { pepe: "123", pato: 123, matusalen: "alf" },
      ],
    });

    const result = convertToInterface(input);

    // Verificar que se generan union types para propiedades con tipos diferentes
    expect(result).toContain("pepe: string | number");
    expect(result).toContain("pato: string | number");
    expect(result).toContain("matusalen: string");
  });

  test("should handle mixed array and primitive types", () => {
    const input = JSON.stringify({
      sarasa: [
        { pepe: 123, pato: "martin" },
        { pepe: [123, 123], pato: 123, matusalen: "alf" },
      ],
    });

    const result = convertToInterface(input);

    // Verificar que se maneja correctamente la unión entre array y primitivo
    expect(result).toContain("pepe: number | number[]");
    expect(result).toContain("pato: string | number");
    expect(result).toContain("matusalen: string");
  });
});
