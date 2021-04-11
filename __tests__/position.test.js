// @ts-nocheck
let Position = require("../models/position");

describe("isEqual()", () => {
  test("equal positions", () => {
    let startPosition = new Position(1, 1);
    let endPosition = new Position(1, 1);
    let isEqual = startPosition.isEqual(endPosition);
    expect(isEqual).toBe(true);
  });

  test("unequal positions", () => {
    let startPosition = new Position(1, 1);
    let endPosition = new Position(1, 1);
    let isEqual = startPosition.isEqual(endPosition);
    expect(isEqual).toBe(false);
  });
});

describe("getDifference()", () => {
  test("position 1 > position 2", () => {
    let startPosition = new Position(2, 5);
    let endPosition = new Position(1, 1);
    let [xDiff, yDiff] = startPosition.getDifference(endPosition);
    expect(xDiff).toBe(1);
    expect(yDiff).toBe(3);
  });

  test("position 1 < position 2", () => {
    let startPosition = new Position(1, 2);
    let endPosition = new Position(4, 6);
    let [xDiff, yDiff] = startPosition.getDifference(endPosition);
    expect(xDiff).toBe(3);
    expect(yDiff).toBe(4);
  });
});
