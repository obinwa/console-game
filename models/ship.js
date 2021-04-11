let Position = require("./position");

class Ship {
  #alignment;
  #startPosition;
  #endPosition;
  #hits;
  #hitPositions
  /**
   * @param {number} alignment
   * @param {Position} startPosition
   * @param {Position} endPosition
   */
  constructor(alignment, startPosition, endPosition) {
    this.#alignment = alignment ; // 1 for vertical; 0 for horizontal
    this.#startPosition = startPosition;
    this.#endPosition = endPosition;
    this.#hits = 0;
    this.#hitPositions = [];

    if (!this.validateShipPosition()) {
      //(alignment,startX, endX,startY,endY)){
      throw new Error("Ship size is invalid!");
    }
  }

  validateShipPosition() {
    // alignment, startPosition, endPosition){
    let alignment = this.#alignment;

    let xDiff = Math.abs(this.#startPosition.getX() - this.#endPosition.getX());
    let yDiff = Math.abs(this.#startPosition.getY() - this.#endPosition.getY());

    if (alignment === 1) {
      //vertical alignment
      if (xDiff === 0 && yDiff === 2) return true;
    } else if (alignment === 0) {
      if (xDiff === 2 && yDiff === 0) return true;
    }
    return false;
  }

  /**
   * @param {Position} shot
   */
  resolveShot(shot) {
    let isHit = false;
    if (this.#alignment === 1) {
      // vertical alignment
      let yDiff1 = shot.getY() - this.#startPosition.getY();
      let yDiff2 = shot.getY() - this.#endPosition.getY();

      let direction = yDiff1 * yDiff2;

      if (this.#startPosition.getX() === shot.getX() && direction <= 0 ) {
        // shot hit ship in different location
        if(!shot.isAmong(this.#hitPositions)){
          this.#hits = this.#hits + 1;
          this.#hitPositions.push(shot);
        }
        isHit = true; 
      }
    } else if (this.#alignment === 0) {
      // horizontal alignment
      let xDiff1 = shot.getX() - this.#startPosition.getX();
      let xDiff2 = shot.getX() - this.#endPosition.getX();

      let direction = xDiff1 * xDiff2;
      if (this.#startPosition.getY() === shot.getY() && direction <= 0) {
        // shot hit ship in different location
        if(!shot.isAmong(this.#hitPositions)){
          this.#hits = this.#hits + 1;
          this.#hitPositions.push(shot);
        }
        isHit = true;
      }
    }

    return { isHit: isHit, numberOfHits: this.#hits };
  }

  getStartPosition() {
    return this.#startPosition;
  }

  getEndPosition() {
    return this.#endPosition;
  }

  getAlignment() {
    return this.#alignment;
  }

  getShipHits() {
    return this.#hits;
  }

  incrementHits() {
    this.#hits++;
  }

  getMidShipPosition(){
    let x = (this.#startPosition.getX() + this.#endPosition.getX())/2;
    let y = (this.#endPosition.getY() + this.#endPosition.getY())/2;

    return new Position(x,y);
  }

  toString() {
    return `{alignment = ${
      this.#alignment
    }, start position = ${this.#startPosition.toString()}, end position = ${this.#endPosition.toString()} }`;
  }
}

module.exports = Ship;
