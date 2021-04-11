let {getAlphabetFromNumber} = require('../utility');

class Position {
  #x;
  #y;
  #mark;
  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    this.#x = x;
    this.#y = y;
    this.#mark = "E";;
    this.validate();
  }

  getMark(){
    return this.#mark;
  }
  
  /**
   * @param {string} mark
   */
  setMark(mark){
    this.#mark = mark;
  }

  getX() {
    return this.#x;
  }

  getY() {
    return this.#y;
  }

  validate() {
    if (!Number.isInteger(this.#x) || !Number.isInteger(this.#y)) {
      //console.log("Invalid position inputs");
      throw new Error("Invalid position input");
    }
  }

  /**
   * @param {Position} otherPosition
   */
  getDifference(otherPosition) {
    let xDiff = Math.abs(this.#x - otherPosition.getX());
    let yDiff = Math.abs(this.#y - otherPosition.getY());

    return [xDiff, yDiff];
  }

  getXasChar(){
    return getAlphabetFromNumber(this.#x);;
  }

  

  /**
   * @param {Position} position
   */
  isEqual(position){
    if(this.#x === position.getX() && this.#y === position.getY()){
      return true;
    }
    return false;
  }

  /**
   * @param {Position[]} positions
   */
  isAmong(positions){
    for(let position of positions){
      if(this.isEqual(position)){
        return true;
      }
    }
    return false;
  }

  toString() {
    return `{x = ${this.#x}; y = ${this.#y} }`;
  }
}

module.exports = Position;