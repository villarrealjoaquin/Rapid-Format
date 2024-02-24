import { test, expect } from '@playwright/test';

function bubbleSort(arr: number[]) {
  if (!Array.isArray(arr)) return [];
  if (arr.length < 2) return arr;
  if (arr.some(e => typeof e !== 'number')) return [];

  let temp: number;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

test.describe('bubble sort', () => {
  test('should be a function', () => {
    expect(bubbleSort).toBeInstanceOf(Function);
  })

  test('the first parameter should be a array', () => {
    expect(bubbleSort([1, 2, 3])).toEqual([1, 2, 3]);
  })

  test('if the list is empty should return an empty array', () => {
    const list = [];
    const expectedOutput = [];
    const result = bubbleSort(list);
    expect(result).toEqual(expectedOutput);
  })

  test('if the array provided his length is less than 2 should return the same array', () => {
    expect(bubbleSort([1])).toEqual([1]);
  })

  test('should return an empty array if any element is not a number', () => {
    const invalidList = [1, 10, "", 2] as number[];
    const expectedOutput = [];
    expect(bubbleSort(invalidList)).toEqual(expectedOutput);
  })

  test('should sort the array in ascending order', () => {
    const list = [10, 20, 30, 5, 25, 35, 40];
    const expectedOutput = [5, 10, 20, 25, 30, 35, 40];
    expect(bubbleSort(list)).toEqual(expectedOutput);
  })
})