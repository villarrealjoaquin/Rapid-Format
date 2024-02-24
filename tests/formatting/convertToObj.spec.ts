import { test, expect } from '@playwright/test';
import { convertToObj } from '../../src/utils/formattingUtils';


test.describe('convertToObj', () => {
  test('the parameter should be a string', () => {
    const expectedParameter = '{"key1": "value1", "key2": "value2"}';
    expect(convertToObj(expectedParameter)).toBeTruthy();
  });

  test('should return an empty object for an empty string', () => {
    const input = '';
    const expectedOutput = '{}';
    const actualOutput = convertToObj(input);
    expect(actualOutput).toEqual(expectedOutput.replace(/\s/g, ''));
  });

  test('should return a string with object shape', () => {
    const input = '{"key1": "value1", "key2": "value2"}';
    const expectedOutput = '{key1: "value1", key2: "value2"}'; 
    const actualOutput = convertToObj(input);
  
    expect(typeof actualOutput).toBe("string");
    expect(actualOutput.replace(/\s/g, '')).toEqual(expectedOutput.replace(/\s/g, ''));
  });

  test('should handle nested objects and arrays', () => {
    const input = '{"key1": "value1", "key2": {"key2_1": "value2_1", "key2_2": [1, 2, 3]}}';
    const expectedOutput = '{key1: "value1", key2: {key2_1: "value2_1", key2_2: ["1", "2", "3"]}}';
    const actualOutput = convertToObj(input);

    expect(typeof actualOutput).toBe("string");
    expect(actualOutput.replace(/\s/g, '')).toEqual(expectedOutput.replace(/\s/g, ''));
  });
})