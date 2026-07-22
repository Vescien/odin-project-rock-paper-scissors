/*
Write a rock, paper, scissors program that the human can play against 
the computer, no need for GUI, results should be displayed in the browser's
console, no need to reprompt user in case of invalid input, the program
should keep track of both player and computer scores and after 5 rounds
show who the winner is

- Get computer choice and return it, function getComputerChoice()
    - Generate random number between 0-2 and convert each value to
    to rock, paper or scissors
- Get human choice and return it, function getHumanChoice()
    - Prompt the user for input, convert to lower case for easier
    comparison with computer choice
- Compare human choice against computer choice, function playRound()
    - if both pick same it's a tie, return value
    - if human picks rock and computer picks scissor, player wins, return value
    - if human picks paper and compuer picks rock, player wins, return value
    - if human picks scissor and ocmpuer picks paper, player wins, return value
    - else computer wins, return value
- Keep track of overall score and best of 5 wins, function playGame()
*/

function getComputerChoice() {
    let computerChoice = Math.floor(Math.random() * 3)
    if (computerChoice === 0) {
        return "rock";
    } else if (computerChoice === 1) {
        return "paper";
    } else {
        return "scissors";
    }
}

function getHumanChoice() {
    let humanChoice = prompt("Type: Rock, Paper or Scissors.").toLowerCase();
    return humanChoice;
}

function playRound(humanChoice, computerChoice) {
    if (humanChoice === computerChoice) {
        return "tie"
    } else if (humanChoice === "rock" && computerChoice === "scissors") {
        return "player-win"
    } else if (humanChoice === "paper" && computerChoice === "rock") {
        return "player-win"
    } else if (humanChoice === "scissors" && computerChoice === "paper") {
        return "player win"
    } else {
        return "computer-win"
    }
}

function playGame() {
    const rounds = 5;
    let playerScore = 0;
    let computerScore = 0;
    let currentRound = 0;

    for (let i = 0; i < rounds; i++) {
        let player = getHumanChoice();
        let computer = getComputerChoice();
        let result = playRound(player, computer);
        if (result === "tie") {
            currentRound++;
            console.log(`Round: ${currentRound} - Tie!`);
        } else if (result === "player-win") {
            currentRound++;
            playerScore++;
            console.log(`Round: ${currentRound} - Player wins!`);
        } else {
            currentRound++;
            computerScore++;
            console.log(`Round: ${currentRound} - Computer wins!`);
        }

        console.log(`Player: ${player}`);
        console.log(`Computer: ${computer}`);
        console.log("");
    }

    console.log(`Player score: ${playerScore}`);
    console.log(`Computer score: ${computerScore}`);

    if (playerScore === computerScore) {
        console.log("It's a tie!");
    } else if (playerScore > computerScore) {
        console.log("Player won!");
    } else {
        console.log("Computer won!");
    }
}

playGame();