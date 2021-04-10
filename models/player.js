const Ship = require('./ship');
const Board = require('./board');
const Position = require('./position');

class Player{
  #board;
  #hits;
  #miss;
  constructor(playerName, boardX, boardY){
    console.log(`\t\t\t ${playerName}`)
    this.#board = new Board(boardX,boardY);
    this.#hits = 0;
    this.#miss = 0;
  }

  generateRandomPosition(){
    let x = Math.floor(Math.random() * this.#board.getXdimension());
    let y = Math.floor(Math.random() * this.#board.getYdimension());

    return new Position(x,y);
  }

  getBoard(){
    return this.#board;
  }

  getHits(){
    return this.#hits;
  }

  getMiss(){
    return this.#miss;
  }

  shoot(playerB){
    let shotPosition = this.generateRandomPosition();
    playerB.getBoard().getShip
  }

}