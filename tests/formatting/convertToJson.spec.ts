import { test, expect } from '@playwright/test';
import { convertToJson } from '../../src/utils/formattingUtils';

test.describe(('convertToJson test'), () => {
  test(('if the first parameter is not valid should return an object'), () => {

  })

  // test('the first parameter should be a string', () => {
  //   const parameter = '{ key1: "value1", key2: "value2" }';

  //   expect(() => {
  //     convertToJson(parameter);
  //   }).toThrow('The first parameter must be a string');
  // })

  // test('should replace simple quotes for double quotes', () => {
  //   const inputQuery = "{ 'key1': 'value1', 'key2': 'value2' }";
  //   const expectedOutput = '{ "key1": "value1", "key2": "value2" }';
  //   expect(convertToJson(inputQuery)).toEqual(expectedOutput);
  // })
})