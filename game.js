let Player = require("./models/player");

try {
  let player1 = new Player("palyer1", 8, 8);
  let player2 = new Player("player2", 8, 8);

  let players = [player1, player2];

  for (let i = 0; ; i++) {
    let turn = i % 2;
    let activePlayer = players[turn];
    let passivePlayer = players[(turn + 1) % 2];

    activePlayer.play(passivePlayer);
  }
  
} catch (error) {
  console.log("GAME OVER!")
}

