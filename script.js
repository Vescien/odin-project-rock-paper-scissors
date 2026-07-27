const rock = document.querySelector(".rock");
const paper = document.querySelector(".paper");
const scissors = document.querySelector(".scissors");

const rounds = 3;
let playerScore = 0;
let computerScore = 0;
let currentRound = 1;

function getHumanChoice() {
    rock.addEventListener("click", () => {
        playGame("rock");
    });
    paper.addEventListener("click", () => {
        playGame("paper");
    });
    scissors.addEventListener("click", () => {
        playGame("scissors");
    });
}

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

function playGame(playerChoice) {
    let player = playerChoice;
    let computer = getComputerChoice();
    let result = playRound(player, computer);

    // Update round and score
    if (result === "tie") {
        console.log(`Round: ${currentRound} - Tie!`);
    } else if (result === "player-win") {
        playerScore++;
        console.log(`Round: ${currentRound} - Player wins!`);
    } else {
        computerScore++;
        console.log(`Round: ${currentRound} - Computer wins!`);
    }
    currentRound++;

    // Capitilize choice's first letter
    player = player.charAt(0).toUpperCase() + player.slice(1);
    computer = computer.charAt(0).toUpperCase() + computer.slice(1);

    // Display round choice
    console.log(`Player: ${player}`);
    console.log(`Computer: ${computer}`);
    console.log("\n");

    // Display final result
    // console.log(`Player score: ${playerScore}`);
    // console.log(`Computer score: ${computerScore}`);
    // console.log("\n");

    if (currentRound - 1 === rounds) {

        if (playerScore === computerScore) {
            console.log("It's a tie!");
        } else if (playerScore > computerScore) {
            console.log("Player won!");
        } else {
            console.log("Computer won!");
        }
        console.log("\n");

        playerScore = 0;
        computerScore = 0;
        currentRound = 1;
    }
}

getHumanChoice();

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
