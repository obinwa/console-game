const Board = require('./board');
const Position = require('./position');
let {getInput} = require('../get-input');

class Player {
  #board;
  #hits;
  #miss;
  #name;
  constructor(playerName, boardX, boardY, ship) {
    this.#board = new Board(boardX, boardY, ship);
    this.#hits = 0;
    this.#miss = 0;
    this.#name = playerName;
  }

  generateRandomPosition() {
    let x = 1 + Math.floor(Math.random() * this.#board.getXdimension());
    let y = 1 + Math.floor(Math.random() * this.#board.getYdimension());

    return new Position(x, y);
  }

  getBoard() {
    return this.#board;
  }

  getHits() {
    return this.#hits;
  }

  getMiss() {
    return this.#miss;
  }

  getName() {
    return this.#name;
  }

  #shoot(playerB) {
    let shotPosition = this.generateRandomPosition();
    console.log(
      `${this.#name} fired a shot at ${String.fromCharCode(
        shotPosition.getX() + 64
      )}${shotPosition.getY()}`
    );
    let { isHit, numberOfHits } = playerB
      .getBoard()
      .getShip()
      .resolveShot(shotPosition);

    if (isHit) {
      console.log("HIT!");
    } else {
      console.log("MISS");
    }

    if (numberOfHits >= 3) {
      console.log(`${this.#name} has sunk ${playerB.getName()} battleship`);
      throw new Error("Game over!");
    }
  }

  play(playerB) {
    let shootCommand = getInput(
      `${this.#name} type in any command to shoot : `
    );
    if (shootCommand === "exit") {
      throw new Error("Game Over!");
    }
    this.#shoot(playerB);
  }
}

module.exports = Player;