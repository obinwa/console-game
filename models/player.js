const Board = require('./board');
const Position = require('./position');
const Ship = require('./ship');
let {getInput} = require('../app/get-input');

class Player {
  #board;
  #opponentBoard;
  #availablePositions;
  #hits;
  #miss;
  #name;

  /**
   * @param {string} playerName
   * @param {number} boardX
   * @param {number} boardY
   * @param {Ship} [ship]
   */
  constructor(playerName, boardX, boardY, ship) {
    this.#board = new Board(boardX, boardY, ship);
    this.#opponentBoard = new Board(boardX, boardY, "none");

    this.#hits = 0;
    this.#miss = 0;
    this.#name = playerName;
    this.#availablePositions = this.generateAllPositions(boardX, boardY);

    this.#board.displayGrid();
  }

  getBoard() {
    return this.#board;
  }

  getOpponentBoard() {
    return this.#opponentBoard;
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

  getAvailablePositions() {
    return this.#availablePositions;
  }

  /**
   * @param {Player} playerB
   * @param {Position} shotPosition
   */
  shoot(playerB, shotPosition) {
    //prettier-ignore
    console.log(` ${this.#name} fired a shot at ${shotPosition.getXasChar()}${shotPosition.getY()}`);

    let { isHit, numberOfHits } = playerB
      .getBoard()
      .getShip()
      .resolveShot(shotPosition);

    //Prevent use in random shot system
    playerB.removeFromAvailablePosition(shotPosition);

    if (isHit) {
      //Show the hit on the player's Opponent Board
      this.getOpponentBoard()
        .getGrid()
        [shotPosition.getX()][shotPosition.getY()].setMark("X");

      //Show the damaged ship on the opponent's board
      playerB
        .getBoard()
        .getGrid()
        [shotPosition.getX()][shotPosition.getY()].setMark("/");

      console.log("\n\n--------\n> HIT! <\n--------\n\n");
    } else {
      //Show miss on the player's Opponent Board
      this.getOpponentBoard()
        .getGrid()
        [shotPosition.getX()][shotPosition.getY()].setMark("O");

      //Show miss on the opponent's board
      playerB
        .getBoard()
        .getGrid()
        [shotPosition.getX()][shotPosition.getY()].setMark("O");
      console.log("\n\n--------\n> MISS <\n--------\n\n");
    }

    if (numberOfHits >= 3) {
      console.log(`${this.#name} has sunk ${playerB.getName()} battleship`);
      throw new Error("Game over!");
    }
    return numberOfHits;
  }

  /**
   * @param {Player} playerB
   */
  play(playerB) {
    //prettier-ignore
    let shootCommand = this.getShootInput(`${this.#name} type in 'x' to shoot randomly or a valid position to fire at that position or 'exit' to end the game : `);

    if (shootCommand === "random") {
      let shotPosition = this.generateRandomPosition(playerB);
      this.shoot(playerB, shotPosition);
    } else if (shootCommand === "exit") {
      throw new Error("Game Over!");
    } else {
      let shotPosition = this.getBoard().parsePosition(shootCommand);
      this.shoot(playerB, shotPosition);
    }
  }

  /**
   * @param {string} query
   */
  getShootInput(query) {
    let validInput = false;

    while (!validInput) {
      let shootInput = getInput(query);
      if (shootInput === "x" || shootInput === "X") {
        validInput = true;
        return "random";
      } else if (shootInput === "exit") {
        validInput = true;
        return "exit";
      } else if (this.getBoard().parsePosition(shootInput)) {
        let position = this.getBoard().parsePosition(shootInput);
        return shootInput;
      } else {
        //continue
      }
    }
  }

  /**
   * @param {Position} position
   */
  isPositionAvailable(position) {
    for (let availablePosition of this.#availablePositions) {
      if (availablePosition.isEqual(position)) {
        return true;
      }
    }
    return false;
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  generateAllPositions(x, y) {
    let arrayOfPositions = [];
    for (let i = 0; i < x; i++) {
      for (let j = 0; j < y; j++) {
        let index = i * x + j;
        arrayOfPositions[index] = new Position(i + 1, j + 1);
      }
    }
    return arrayOfPositions;
  }

  /**
   * @param {Player} player
   */
  generateRandomPosition(player) {
    let index = Math.floor(
      Math.random() * player.getAvailablePositions().length
    );
    return player.getAvailablePositions()[index];
  }

  /**
   * @param {Position} positionToRemove
   */
  //remove position from available positions for which a player can shoot randomly
  removeFromAvailablePosition(positionToRemove) {
    let seen = false;
    let x = positionToRemove.getX();
    let y = positionToRemove.getY();

    for (let i = 0; i < this.#availablePositions.length; i++) {
      let position = this.#availablePositions[i];
      if (position.getX() === x && position.getY() === y) {
        this.#availablePositions.splice(i, 1);
        seen = true;
        break;
      }
    }
    return seen;
  }
}

module.exports = Player;