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
    let position = board.parsePosition("A9");
    expect(position).not.toBeTruthy();
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

describe("isPositionOnBoard(x, y)", () => {
  let startPosition = new Position(1, 1);
  let endPosition = new Position(1, 3);
  let ship = new Ship(1, startPosition, endPosition);
  let board = new Board(8, 8, ship);

  test("points out of board grid", () => {
    let position = board.isPositionOnBoard(1, 9);
    expect(position).toBe(false);
  });

  test("points on board grid", () => {
    let position = board.isPositionOnBoard(1, 8);
    expect(position).toBe(true);
  });
});

describe("getPossibleEndPosition(startPosition, alignment)", () => {
  let shipStartPosition = new Position(1, 1);
  let endPosition = new Position(1, 3);
  let ship = new Ship(1, shipStartPosition, endPosition);
  let board = new Board(8, 8, ship);

  test("one valid end position", () => {
    let position = new Position(2, 1);
    let positions = board.getPossibleEndPosition(position, 1);
    expect(positions.length).toBe(1);
  });

  test("two valid end position", () => {
    let position = new Position(2, 4);
    let positions = board.getPossibleEndPosition(position, 1);
    expect(positions.length).toBe(2);
  });
});

describe("markShip() in constructor", () => {
  let shipStartPosition = new Position(1, 1);
  let endPosition = new Position(1, 3);
  let ship = new Ship(1, shipStartPosition, endPosition);
  let board = new Board(8, 8, ship);

  test("marked ship position", () => {
    let position1 = board.getShip().getStartPosition();
    let position2 = board.getShip().getMidShipPosition();
    let position3 = board.getShip().getEndPosition();

    let p1 = board.getGrid()[position1.getX()][position1.getY()];
    let p2 = board.getGrid()[position2.getX()][position2.getY()];
    let p3 = board.getGrid()[position3.getX()][position3.getY()];

    expect(p1.getMark()).toBe("S");
    expect(p2.getMark()).toBe("S");
    expect(p3.getMark()).toBe("S");
  });
});
