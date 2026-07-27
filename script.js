const rock = document.querySelector("#rock");
const paper = document.querySelector("#paper");
const scissors = document.querySelector("#scissors");
const round = document.querySelector(".round");
const displayPlayerScore = document.querySelector(".player-score")
const displayComputerScore = document.querySelector(".computer-score")
const winner = document.querySelector(".result");
const displayPlayerChoice = document.querySelector("#player-choice");
const displayComputerChoice = document.querySelector("#computer-choice");

const rounds = 3;
let playerScore = 0;
let computerScore = 0;
let currentRound = 1;

function getHumanChoice() {
    rock.addEventListener("click", () => {
        playGame("✊");
    });
    paper.addEventListener("click", () => {
        playGame("🧻");
    });
    scissors.addEventListener("click", () => {
        playGame("✂");
    });
}

function getComputerChoice() {
    let computerChoice = Math.floor(Math.random() * 3)
    if (computerChoice === 0) {
        return "✊";
    } else if (computerChoice === 1) {
        return "🧻";
    } else {
        return "✂";
    }
}

function playRound(humanChoice, computerChoice) {
    if (humanChoice === computerChoice) {
        return "tie"
    } else if (humanChoice === "✊" && computerChoice === "✂") {
        return "player-win"
    } else if (humanChoice === "🧻" && computerChoice === "✊") {
        return "player-win"
    } else if (humanChoice === "✂" && computerChoice === "🧻") {
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

    displayPlayerChoice.textContent = player;
    displayComputerChoice.textContent = computer;
    round.textContent = `Round: ${currentRound}`;
    displayPlayerScore.textContent = playerScore;
    displayComputerScore.textContent = computerScore;
    currentRound++;

    let finalWinner = "";
    if (currentRound - 1 === rounds) {
        if (playerScore === computerScore) {
            finalWinner = "It's a tie!";
        } else if (playerScore > computerScore) {
            finalWinner = "Player won!"
        } else {
            finalWinner = "Computer won!"
        }

        playerScore = 0;
        computerScore = 0;
        currentRound = 1;
    }
    winner.textContent = finalWinner;
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
