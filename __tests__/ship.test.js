// @ts-nocheck
let Board = require("../models/board");
let Ship = require("../models/ship");
let Position = require("../models/position");

describe("validateShipPosition()", () => {
  let startPosition = new Position(1, 1);
  let endPosition1 = new Position(1, 3);
  let endPosition2 = new Position(1, 4);
  let ship1 = new Ship(1, startPosition, endPosition1);

  test("valid ship position and size", () => {
    let isValid = ship1.validateShipPosition();
    expect(isValid).toBe(true);
  });

  test("invalid ship position and size", () => {
    expect(() => {
      let ship2 = new Ship(1, startPosition, endPosition2);
    }).toThrow("Ship size is invalid!");
  });
});

describe("resolveShot()", () => {
  let startPosition = new Position(1, 1);
  let endPosition1 = new Position(1, 3);
  let ship1 = new Ship(1, startPosition, endPosition1);

  test("shot hit ship", () => {
    let shotPosition = new Position(1, 2);
    let { isHit, numberOfHits } = ship1.resolveShot(shotPosition);
    expect(isHit).toBe(true);
  });

  test("shot hit ship  in the same place", () => {
    let shotPosition = new Position(1, 2);
    ship1.resolveShot(shotPosition);
    ship1.resolveShot(shotPosition);
    ship1.resolveShot(shotPosition);
    let { isHit, numberOfHits } = ship1.resolveShot(shotPosition);
    expect(isHit).toBe(true);
    expect(numberOfHits).toBe(1);
  });

  test("shot hit ship  in the different place", () => {
    let shotPosition1 = new Position(1, 2);
    let shotPosition2 = new Position(1, 3);
    ship1.resolveShot(shotPosition1);
    let { isHit, numberOfHits } = ship1.resolveShot(shotPosition2);
    expect(isHit).toBe(true);
    expect(numberOfHits).toBe(2);
  });

  test("shot did not hit ship", () => {
    let shotPosition = new Position(1, 6);
    let { isHit, numberOfHits } = ship1.resolveShot(shotPosition);
    expect(isHit).toBe(false);
  });
});
