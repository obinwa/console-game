let input = require('prompt-sync')();

function getInput(queryString){
  let value = input(queryString);
  return value;
}

module.exports.getInput = getInput;