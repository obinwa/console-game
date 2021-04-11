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
    let endPosition = new Position(1, 3);
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
    expect(yDiff).toBe(4);
  });

  test("position 1 < position 2", () => {
    let startPosition = new Position(1, 2);
    let endPosition = new Position(4, 6);
    let [xDiff, yDiff] = startPosition.getDifference(endPosition);
    expect(xDiff).toBe(3);
    expect(yDiff).toBe(4);
  });
});

describe("getXasChar()", () => {
  test("position x value ", () => {
    let position = new Position(4, 6);
    let xAlphabet = position.getXasChar();
    expect(xAlphabet).toBe("D");
  });
});

describe("isAmong(positions) ", () => {
  test("among positions", () => {
    let position = new Position(1, 1);
    let positions = [
      new Position(6, 1),
      new Position(2, 5),
      new Position(1, 1),
    ];
    let isAmong = position.isAmong(positions);
    expect(isAmong).toBe(true);
  });

  test("not among positions", () => {
    let position = new Position(1, 1);
    let positions = [
      new Position(6, 1),
      new Position(2, 5),
      new Position(3, 1),
    ];
    let isAmong = position.isAmong(positions);
    expect(isAmong).toBe(false);
  });
});
