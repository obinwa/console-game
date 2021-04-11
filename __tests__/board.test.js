// @ts-nocheck
let Board = require("../models/board");
let Ship = require("../models/ship");
let Position = require("../models/position");

describe("parsePosition()", () => {
  let startPosition = new Position(1, 1);
  let endPosition = new Position(1, 3);
  let ship = new Ship(1, startPosition, endPosition);
  let board = new Board(8, 8, ship);

  test("position out of board grid", () => {
    expect(() => {
      let position = board.parsePosition("A9");
    }).toThrow(TypeError);
  });

  test("position in board grid", () => {
    let position = board.parsePosition("A8");
    expect(position).toBeTruthy();
  });

  test("valid position dimensions ", () => {
    let position = board.parsePosition("A8");
    expect(position.getX()).toBe(1);
    expect(position.getY()).toBe(8);
  });
});
