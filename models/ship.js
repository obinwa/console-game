let PositionInput = require('./position');

class Ship {
  #alignment;
  #startPosition;
  #endPosition;
  #hits;
  constructor(alignment, startPosition, endPosition) {
    this.#alignment = alignment % 2; // 1 for vertical; 0 for horizontal
    this.#startPosition = startPosition;
    this.#endPosition = endPosition;
    this.#hits = 0;

    if (!this.validateShipPosition()) {
      //(alignment,startX, endX,startY,endY)){
      throw new Error("Ship size is invalid!");
    }
  }

  validateShipPosition() {
    // alignment, startPosition, endPosition){
    let alignment = this.#alignment;
    let startPosition = this.#startPosition;
    let endPosition = this.#endPosition;

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

  resolveShot(shot) {
    let isHit = false;

    if (this.#alignment === 1) {
      // vertical alignment
      let yDiff1 = shot.getY() - this.#startPosition.getY();
      let yDiff2 = shot.getY() - this.#endPosition.getY();

      let direction = yDiff1 * yDiff2;
      if (this.#startPosition.getX() === shot.getX() && direction <= 0) {
        // shot hit ship
        this.#hits = this.#hits + 1;
        isHit = true;
      }
    } else if (this.#alignment === 0) {
      // horizontal alignemnt
      let xDiff1 = shot.getX() - this.#startPosition.getX();
      let xDiff2 = shot.getX() - this.#endPosition.getX();

      let direction = xDiff1 * xDiff2;
      if (this.#startPosition.getY() === shot.getY() && direction <= 0) {
        // shot hit ship
        this.#hits = this.#hits + 1;
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

  getAlignemnt() {
    return this.#alignment;
  }

  getShipHits() {
    return this.#hits;
  }

  incrementHits() {
    this.#hits++;
  }

  toString() {
    return `{alignment = ${
      this.#alignment
    }, start position = ${this.#startPosition.toString()}, end position = ${this.#endPosition.toString()} }`;
  }
}

module.exports = Ship;