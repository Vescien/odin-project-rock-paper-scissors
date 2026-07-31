const rock = document.querySelector("#rock");
const paper = document.querySelector("#paper");
const scissors = document.querySelector("#scissors");
const round = document.querySelector(".round");
const roundWinner = document.querySelector(".round-winner");
const displayPlayerScore = document.querySelector(".player-score")
const displayComputerScore = document.querySelector(".computer-score")
const displayWinner = document.querySelector(".result");
const displayPlayerChoice = document.querySelector("#player-choice");
const displayComputerChoice = document.querySelector("#computer-choice");
const history = document.querySelector(".history-list");
const buttons = document.querySelectorAll(".buttons");
const reset = document.querySelector(".reset");

const rounds = 5;
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
        return "player-win"
    } else {
        return "computer-win"
    }
}

function playGame(playerChoice) {
    let player = playerChoice;
    let computer = getComputerChoice();
    let result = playRound(player, computer);

    if (player === computer) {
        roundWinner.textContent = "Draw!";
    } else if (result === "player-win") {
        playerScore++;
        roundWinner.textContent = "Player wins!";
    } else if (result === "computer-win") {
        computerScore++;
        roundWinner.textContent = "Computer wins!";
    }

    displayPlayerChoice.textContent = player;
    displayComputerChoice.textContent = computer;
    round.textContent = `Round: ${currentRound}`;
    displayPlayerScore.textContent = playerScore;
    displayComputerScore.textContent = computerScore;

    updateHistory(player, computer);
    currentRound++;

    let finalWinner = "";
    if (currentRound - 1 === rounds) {
        if (playerScore === computerScore) {
            finalWinner = "The game is a draw!";
        } else if (playerScore > computerScore) {
            finalWinner = "Player won the game!"
        } else {
            finalWinner = "Computer won the game!"
        }
        buttons.forEach(button => {
            button.disabled = true;
        })
    }

    displayWinner.textContent = finalWinner;
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    currentRound = 1;
    displayPlayerChoice.textContent = "";
    displayComputerChoice.textContent = "";
    round.textContent = `Round: ${currentRound}`;
    displayPlayerScore.textContent = playerScore;
    displayComputerScore.textContent = computerScore;

    buttons.forEach(button => {
        button.disabled = false;
    })

    displayWinner.textContent = "";
    roundWinner.textContent = "";
    history.replaceChildren();
}

function updateHistory(playerInfo, computerInfo) {
    let roundInfo = `Round: ${currentRound} - Player ${playerInfo} x ${computerInfo} Computer`;
    let list = document.createElement("li");
    list.textContent = roundInfo;
    history.appendChild(list);
}

reset.addEventListener("click", resetGame);

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
