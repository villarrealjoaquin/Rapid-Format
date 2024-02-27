import { test, expect } from '@playwright/test';
import { convertToJson } from '../../src/utils/formattingUtils';

test.describe('convertToJson test', () => {
  test('should handle empty input', async () => {
    const input = '';
    const expectedOutput = '{}';

    const result = convertToJson(input);

    expect(result).toEqual(expectedOutput);
  });

  test('should handle valid JSON string', async () => {
    const input = '{"key": "value", "array": [1, 2, 3]}';
    const expectedOutput = '{\n  "key": "value",\n  "array": [1, 2, 3]\n}';

    const result = convertToJson(input);

    expect(result).toEqual(expectedOutput);
  });

  test('should handle string with escaped characters', () => {
    const input = '{"key": "Hello \\"world\\""}';
    const expectedOutput = '{\n  "key": "Hello \"world\"\"\n}';

    const result = convertToJson(input);

    expect(result).toEqual(expectedOutput);
  });

  test('should handle invalid JSON string', () => {
    const input = '{ "key": "value"'; 

    expect(() => convertToJson(input)).toThrowError();
  });

  test('should handle empty string after cleaning (regression test)', () => {
    const input = '';
    const expectedOutput = '{}'; 
    const result = convertToJson(input);

    expect(result).toEqual(expectedOutput);
  });
});