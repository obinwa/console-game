let Ship = require('./ship');
let input = require('prompt-sync')();

let Board = require('./board');

let Player = require("./player");

let player1 = new Player("player1", 8, 8, null);
let player2 = new Player("player2", 8, 8, null);

player1.play(player2);
player1.play(player2);
player1.play(player2);

//let newShip = new Ship(1,2,3,2,5);

// let x = Number("7H");
// console.log(x);
// console.log(Number.isInteger(x))

//  let board = new Board(8, 8, null);
//  console.log(board.getShip().getEndPosition().toString());
//  board.displayGrid();

// console.log(board.getShip().toString());

// let ship = board.makeShip();
// console.log(ship.toString());

//let position = board.getPosition("Enter position  : ");
//console.log(position.toString());

// let name = input("what is your name : ");
// console.log(`your name is ${name}`);

// console.log(newShip.#alignment);
//console.log(newShip.getAlignemnt());
