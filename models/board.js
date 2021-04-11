let Ship = require('./ship');
let Position = require('./position');
let {getInput} = require('../get-input');
let {getAlphabetFromNumber} = require('../utility');

class Board {
  #ship;
  #dimensionX;
  #dimensionY;
  #grid
  
  /**
   * @param {number} dimensionX
   * @param {number} dimensionY
   * @param {Ship} ship
   */
  constructor(dimensionX, dimensionY, ship) {
    this.#dimensionX = dimensionX;
    this.#dimensionY = dimensionY;
    this.validate();
    this.#ship = ship ? ship : this.makeShip();
    this.#grid = this.generateGrid(dimensionX, dimensionY);
    this.markShip();
  }

  validate() {
    if (
      !Number.isInteger(this.#dimensionX) ||
      !Number.isInteger(this.#dimensionY)
    ) {
      throw new Error("Invalid dimension for board");
    }
  }

  getGrid(){
    return this.#grid;
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
        (shipAlignment === "1" || shipAlignment === "0")
      ) {
        foundRightAlignment = true;
      }
    }
    return Number(shipAlignment);
  }

  /**
   * @param {string} queryString
   * @param {number} alignment
   */
  getShipPositionFromInput(queryString,alignment) {
    let position = null;
    while (!position) {
      let inputString = getInput(queryString);
      position = this.parsePosition(inputString);
    }
    return position;
  }

  /**
   * @param {string} queryString
   */
  getPositionFromInput(queryString) {
    let position = null;
    while (!position) {
      let inputString = getInput(queryString);
      position = this.parsePosition(inputString);
    }
    return position;
  }

  /**
   * @param {string} queryString
   * @param {Position[]} positions
   */
  matchPositionFromInput(queryString, positions) {
    let match = false;
    let inputPosition = null;
    while (!match) {
      let inputString = getInput(queryString);
      inputPosition = this.parsePosition(inputString);

      if(!inputPosition){
        continue;
      }
      for(let position of positions){
        if(position.getX() === inputPosition.getX() && position.getY() === inputPosition.getY()){
          match = true;
          break;
        }
      }
    }
    return inputPosition;
  }

  /**
   * @param {string} positionString
   */
  parsePosition(positionString) {
    if (positionString === "exit") {
      throw new Error("Game Over!");
    }
    try {
      if(positionString.length !== 2){
        return null;
      }
      let regexString = `[A-${this.#getDimensionXchar()}][1-${this.#dimensionY}]`;
      let regex = new RegExp(regexString);
      //let regex = /[A-H][1-8]/;
      let [matchedPositionString] = positionString.match(regex);
      if (!matchedPositionString) {
        return null;
      }
      let y = Number(matchedPositionString[1]);
      let x = matchedPositionString[0].charCodeAt(0) - 64;

      if (!this.isPositionOnBoard(x, y)) {
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
        `Invalid input. Enter input from A1 to ${this.#getDimensionXchar()}${this.#dimensionY}; exit to quit game`
      );
      return null;
    }
  }

  // @ts-ignore
  #getDimensionXchar(){
    return getAlphabetFromNumber(this.#dimensionX);
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  isPositionOnBoard(x, y) {
    if (x >= 0 && x <= this.#dimensionX && y >= 0 && y <= this.#dimensionY) {
      return true;
    }
    return false;
  }

  makeShip() {
    let ship = this.getShipFromInput();
    while (!ship) {
      ship = this.getShipFromInput();
    }
    return ship;
  }

  getShipFromInput() {
    console.log(
      "\nShip should be of size 3, and with horizontal or vertical alignment. Enter 'exit' to end game!\n "
    );

    let shipAlignment = this.getShipAlignmentFromInput();
    let shipStartPosition = this.getPositionFromInput(
      "Enter ship starting position(e.g A2) : "
    );
    let shipEndPosition;
    let validEndPositions = this.getPossibleEndPosition(shipStartPosition, shipAlignment);
    if(validEndPositions.length === 0){
      console.log("Invalid start position");
      return null;
    }
    else if(validEndPositions.length === 1){
      shipEndPosition = validEndPositions[0];
    }
    else{
       shipEndPosition = this.matchPositionFromInput(
        `Enter ship end position  ${validEndPositions[0].getXasChar()}${validEndPositions[0].getY()} or ${validEndPositions[1].getXasChar()}${validEndPositions[1].getY()} : `,validEndPositions
      );
    }

    try {
      let ship = new Ship(shipAlignment, shipStartPosition, shipEndPosition);
      return ship;
    } catch (error) {
      console.log(error.stack);
      console.log(error.message);
      return null;
    }
  }

  /**
   * @param {Position} startPosition
   * @param {number} alignment
   */
  getPossibleEndPosition(startPosition, alignment) {
    let endPosition1;
    let endPosition2;
    if (alignment === 0) {
      endPosition1 = new Position(
        startPosition.getX() + 2,
        startPosition.getY()
      );
      endPosition2 = new Position(
        startPosition.getX() - 2,
        startPosition.getY()
      );
    } else if (alignment === 1) {
      endPosition1 = new Position(
        startPosition.getX(),
        startPosition.getY() + 2
      );
      endPosition2 = new Position(
        startPosition.getX(),
        startPosition.getY() - 2
      );
    }

    let arrayOfPositions = [endPosition1,  endPosition2];
    let validPositions = arrayOfPositions.filter((position) =>
        this.isWithinBound(position)
      );
    return validPositions;
  }

  /**
   * @param {Position} position
   */
  isWithinBound(position) {
    if (position.getX() > 8 || position.getX() < 1) {
      return false;
    }
    if (position.getY() > 8 || position.getY() < 1) {
      return false;
    }

    return true;
  }

  displayGrid(){
    //display header 
    let headerString = "  ";
    for(let i = 1; i <= this.#dimensionX; i++){
      headerString =  headerString.concat(` ${getAlphabetFromNumber(i)}`);
    }
    console.log(`${headerString} \n`);
    
    //display the rest of the grid with vertical index
    let gridString = "";
    for(let i = 1; i <= this.#dimensionX; i++){
      let rowString = `${i} `;
      for(let j = 1; j <= this.#dimensionY; j++){
        rowString = rowString.concat(` ${this.#grid[j][i].getMark()}`)
      }
      rowString = rowString.concat('\n');
      gridString = gridString.concat(rowString);
    }
    console.log(gridString);
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  generateGrid(x,y){
    let grid = [];
    for(let i = 1; i <= x; i++){
      let row = [];
      for(let j = 1; j <= y; j++){
        row[j] = new Position(i,j);
      }
      grid[i] = row;
    }
    return grid;
  }

  markShip(){
    let startXposition = this.#ship.getStartPosition().getX();
    let startYposition = this.#ship.getStartPosition().getY();
    let endXposition = this.#ship.getEndPosition().getX();
    let endYposition = this.#ship.getEndPosition().getY();
    let midXPosition = this.#ship.getMidShipPosition().getX();
    let midYposition = this.#ship.getMidShipPosition().getY();

    let boardGrid = this.#grid;
    boardGrid[startXposition][startYposition].setMark("S");
    boardGrid[midXPosition][midYposition].setMark("S");
    boardGrid[endXposition][endYposition].setMark("S");

  }
}

module.exports = Board;