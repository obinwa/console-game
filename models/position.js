
class Position {
  #x;
  #y;
  constructor(x,y){
    this.#x = x ;
    this.#y = y ;
    this.validate();
  }

  getX(){
    return this.#x;
  }

  getY(){
    return this.#y;
  }

  validate() {
    if(!Number.isInteger(this.#x) || !Number.isInteger(this.#y)){
      //console.log("Invalid position inputs");
      throw new Error("Invalid position input");
    }
  }

  getDifference(otherPosition){
    let xDiff = Math.abs(this.#x - otherPosition.getX());
    let yDiff = Math.abs(this.#y - otherPosition.getY());

    return [xDiff, yDiff];
  }

  toString(){
    return `{x = ${this.#x}; y = ${this.#y} }`
  }
}

module.exports = Position;