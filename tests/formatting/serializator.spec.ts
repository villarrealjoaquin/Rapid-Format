import { test, expect } from '@playwright/test';
import { serializator } from '../../src/utils/formattingUtils';

test.describe(('serializator test'), () => {
  test('should replace commas in objects', () => {
    const inputQuery = '{ key1: "value1", key2: "value2" }';
    const expectedOutput = '{ "key1": "value1", "key2": "value2" }';

    const actualOutput = serializator(inputQuery);
    expect(actualOutput).toEqual(expectedOutput);
  });

  test('should replace commas in nested objects', () => {
    const inputQuery = '{ key1: { nested1: "value1", nested2: "value2" }, key2: "value3" }';
    const expectedOutput = '{ "key1": { "nested1": "value1", "nested2": "value2" }, "key2": "value3" }';

    const actualOutput = serializator(inputQuery);
    expect(actualOutput).toEqual(expectedOutput);
  });

 
})