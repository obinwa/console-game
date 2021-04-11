let Player = require("../models/player");
let player1Name = "player1";
let player2Name = "player2";

try {
  console.log(`\t\t ${player1Name} details`);
  let player1 = new Player(player1Name, 8, 8);

  console.log(`\t\t ${player2Name} details`);
  let player2 = new Player(player2Name, 8, 8);

  let players = [player1, player2];

  for (let i = 0; ; i++) {
    let turn = i % 2;
    let activePlayer = players[turn];
    let passivePlayer = players[(turn + 1) % 2];

    activePlayer.play(passivePlayer);
    passivePlayer.getBoard().displayGrid();
  }
} catch (error) {
  console.log("GAME OVER!");
}
