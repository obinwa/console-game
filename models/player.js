const Board = require('./board');
const Position = require('./position');
const Ship = require('./ship');
let {getInput} = require('../get-input');

class Player {
  #board;
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
    this.#hits = 0;
    this.#miss = 0;
    this.#name = playerName;
    this.#availablePositions = this.generateAllPositions(boardX, boardY);

    this.#board.displayGrid();
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

    
  /**
   * @param {Player} playerB
   * @param {Position} shotPosition
   */
  shoot(playerB, shotPosition) {
    //let shotPosition = this.generateRandomPosition();
    console.log(
      `${this.#name} fired a shot at ${shotPosition.getXasChar()}${shotPosition.getY()}`
    );
    let { isHit, numberOfHits } = playerB
      .getBoard()
      .getShip()
      .resolveShot(shotPosition);

    if (isHit) {
      playerB.removeFromAvailablePosition(shotPosition); //SHOUTING!!! should this be modified or the passive player's available positions
      playerB.getBoard().getGrid()[shotPosition.getX()][shotPosition.getY()].setMark("X")
      console.log("HIT!");
    } else {
      playerB.getBoard().getGrid()[shotPosition.getX()][shotPosition.getY()].setMark("O")
      console.log("MISS");
    }

    playerB.getBoard().displayGrid();

    if (numberOfHits >= 3) {
      console.log(`${this.#name} has sunk ${playerB.getName()} battleship`);
      throw new Error("Game over!");
    }
  }

  /**
   * @param {Player} playerB
   */
  play(playerB) {
    let shootCommand = this.getShootInput(playerB,
      `${this.#name} type in x to shoot randomly, type in a valid position (e.g A7) to fire a shot at position and exit to stop game : `
    );
    if(shootCommand === "random"){
      let shotPosition = this.generateRandomPosition();
      this.shoot(playerB, shotPosition);
    }
    else if (shootCommand === "exit") {
      throw new Error("Game Over!");
    }
    else{
      let shotPosition = this.getBoard().parsePosition(shootCommand);
      this.shoot(playerB, shotPosition);
    }
    //this.shoot(playerB);
  }

  /**
   * @param {string} query
   * @param {Player} playerB
   */
  getShootInput(playerB,query){
    let validInput = false;

    while(!validInput){
      let shootInput = getInput(query);
      if(shootInput === "x" || shootInput === "X"){
        validInput = true;
        return "random";
      }
      else if(shootInput === "exit"){
        validInput = true;
        return "exit";
      }
      else if(this.getBoard().parsePosition(shootInput)){
        let position = this.getBoard().parsePosition(shootInput);
        return shootInput;
      }
      else{
        //continue
      }
    }
  }

  /**
   * @param {Position} position
   */
  isPositionAvailable(position){
    for(let availablePosition of this.#availablePositions){
      if(availablePosition.isEqual(position)){
        return true;
      }
    }
    return false;
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  generateAllPositions(x,y){
    let arrayOfPositions = [];
    for(let i = 0; i < x; i++){
      for(let j = 0; j < y; j++){
        let index = (i * x) + j;
        arrayOfPositions[index] = new Position(i+1,j+1);
      }
    }
    return arrayOfPositions
  }

  generateRandomPosition() {
    let index =  Math.floor(Math.random() * this.#availablePositions.length);
    return this.#availablePositions[index];
  }

  /**
   * @param {Position} positionToRemove
   */
  removeFromAvailablePosition(positionToRemove){
    let seen = false;
    let x = positionToRemove.getX();
    let y = positionToRemove.getY();
    
    for(let i = 0; i < this.#availablePositions.length; i++){
      let position = this.#availablePositions[i];
      if(position.getX() === x && position.getY() === y){
        this.#availablePositions.splice(i,1);
        seen = true;
        break;
      }
    }
    return seen;
  }
}

module.exports = Player;