let Ship = require('./ship');
let input = require('prompt-sync')();

let Board = require('./board');

//let newShip = new Ship(1,2,3,2,5);

let x = Number("7H");
console.log(x);
console.log(Number.isInteger(x))

let board = new Board(8,8);

let ship = board.produceShip();
console.log(ship.toString());

//let position = board.getPosition("Enter position  : ");
//console.log(position.toString());

// let name = input("what is your name : ");
// console.log(`your name is ${name}`);

// console.log(newShip.#alignment);
//console.log(newShip.getAlignemnt());
