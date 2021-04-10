let Ship = require('./ship');
let Position = require('./position');
let {getInput} = require('../get-input');

class Board {
  #ship;
  #dimensionX;
  #dimensionY;

  constructor(dimensionX, dimensionY, ship) {
    if (!Number.isInteger(dimensionX || Number.isInteger(dimensionY))) {
      throw new Error("Invalid dimension for board");
    }
    this.#dimensionX = dimensionX;
    this.#dimensionY = dimensionY;
    this.#ship = ship ? ship : this.makeShip();
  }

  getShip() {
    return this.#ship;
  }

  getXdimension() {
    return this.#dimensionX;
  }

  getYdimension() {
    return this.#dimensionY;
  }

  getShipAlignmentFromInput() {
    let foundRightAlignment = false;
    let shipAlignment;
    while (!foundRightAlignment) {
      shipAlignment = getInput(
        "Enter ship alignment. 1 for Vertical, 0 for horizontal : "
      );
      if (shipAlignment === "exit") {
        throw new Error("Game Over!");
      }
      if (
        Number.isInteger(Number(shipAlignment)) &&
        (shipAlignment === "1" || shipAlignment === "2")
      ) {
        foundRightAlignment = true;
      }
    }
    return shipAlignment;
  }

  getPositionFromInput(queryString) {
    let position = null;
    while (!position) {
      let inputString = getInput(queryString);
      position = this.parsePosition(inputString);
    }
    return position;
  }

  parsePosition(positionString) {
    if (positionString === "exit") {
      throw new Error("Game Over!");
    }
    try {
      let regex = /[A-H][1-8]/;
      let [matchedPositionString] = positionString.match(regex);
      if (!matchedPositionString) {
        return null;
      }
      let y = Number(matchedPositionString[1]);
      let x = matchedPositionString[0].charCodeAt() - 64;

      if (!this.#isPositionOnBoard(x, y)) {
        console.log(
          `Values cannot be located on ${this.#dimensionX} * ${
            this.#dimensionY
          } board`
        );
        return null;
      }

      let position = new Position(x, y);
      return position;
    } catch (error) {
      console.log(
        `Invalid input. Enter input from A1 to ${String.fromCharCode(
          64 + this.#dimensionX
        )}${this.#dimensionY}; exit to quit game`
      );
      return null;
    }
  }

  #isPositionOnBoard(x, y) {
    if (x >= 0 && x <= this.#dimensionX && y >= 0 && y <= this.#dimensionY) {
      return true;
    }
    return false;
  }

  makeShip() {
    let ship = this.#getShipFromInput();
    while (!ship) {
      ship = this.#getShipFromInput();
    }
    return ship;
  }

  #getShipFromInput() {
    console.log(
      "\n Ship should be of size 3, and with horizontal or vertical alignemnt. Enter 'exit' to end game!\n "
    );

    let shipAlignment = this.getShipAlignmentFromInput();
    let shipStartPosition = this.getPositionFromInput(
      "Enter ship starting position(e.g A2) : "
    );
    let shipEndPositon = this.getPositionFromInput("Enter ship end position e.g(A4) : ");

    try {
      let ship = new Ship(shipAlignment, shipStartPosition, shipEndPositon);
      return ship;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

}

module.exports = Board;