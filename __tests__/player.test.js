// @ts-nocheck
let Board = require("../models/board");
let Ship = require("../models/ship");
let Position = require("../models/position");
let Player = require("../models/player");

describe("shoot()", () => {
  let startPosition1 = new Position(1, 1);
  let endPosition1 = new Position(1, 3);
  let ship1 = new Ship(1, startPosition1, endPosition1);
  let player1 = new Player("player1", 8, 8, ship1);

  let startPosition2 = new Position(1, 2);
  let endPosition2 = new Position(1, 4);
  let ship2 = new Ship(1, startPosition2, endPosition2);
  let player2 = new Player("player1", 8, 8, ship2);

  test("shoot in wrong place", () => {
    let newPosition = new Position(1, 7);
    let hits = player1.shoot(player2, newPosition);
    expect(hits).toBe(0);
  });

  test("shot hit ship in same place", () => {
    let newPosition1 = new Position(1, 2);
    let newPosition2 = new Position(1, 2);
    let newPosition3 = new Position(1, 2);
    let newPosition4 = new Position(1, 2);

    player1.shoot(player2, newPosition1);
    player1.shoot(player2, newPosition2);
    player1.shoot(player2, newPosition3);
    let hits = player1.shoot(player2, newPosition4);
    expect(hits).toBe(1);
  });

  test("shot hit ship in different place", () => {
    let newPosition1 = new Position(1, 2);
    let newPosition2 = new Position(1, 3);

    player1.shoot(player2, newPosition1);
    let hits = player1.shoot(player2, newPosition2);
    expect(hits).toBe(2);
  });

  test("ship sunk", () => {
    expect(() => {
      let newPosition1 = new Position(1, 2);
      let newPosition2 = new Position(1, 3);
      let newPosition3 = new Position(1, 4);

      player1.shoot(player2, newPosition1);
      player1.shoot(player2, newPosition2);
      player1.shoot(player2, newPosition3);
    }).toThrow("Game over!");
  });
});
