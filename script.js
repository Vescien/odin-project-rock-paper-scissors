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
const versusText = document.querySelector(".versus-text");
const playerText = document.querySelector(".player-choice-text");
const computerText = document.querySelector(".computer-choice-text");

const rounds = 5;
let playerScore = 0;
let computerScore = 0;
let currentRound = 1;

const SVG_ATTRS = `xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"`;

const ICONS = {
    rock: `<svg ${SVG_ATTRS}>
        <path d="M8 4.5 L15 4 L20 8.5 L21 15 L16.5 20 L9 20.5 L3.5 15.5 L4 9 Z" />
    </svg>`,
    paper: `<svg ${SVG_ATTRS}>
        <path d="M6 3 H14 L19 8 V21 H6 Z M14 3 V8 H19 M9.5 12.5 H15.5 M9.5 15.5 H15.5 M9.5 18.5 H13" />
    </svg>`,
    scissors: `<svg ${SVG_ATTRS}>
        <circle cx="5.5" cy="6" r="2.6" />
        <circle cx="5.5" cy="18" r="2.6" />
        <path d="M8 7.5 L21 17.5 M8 16.5 L21 6.5" />
    </svg>`,
};

function showChoice(element, choice) {
    if (choice) {
        element.innerHTML = ICONS[choice];
    } else {
        element.textContent = "?";
    }
}

function getHumanChoice() {
    rock.addEventListener("click", () => playGame("rock"));
    paper.addEventListener("click", () => playGame("paper"));
    scissors.addEventListener("click", () => playGame("scissors"));
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
        playerText.textContent = player;
        computerText.textContent = computer;
        versusText.textContent = "Draw!";
    } else if (result === "player-win") {
        playerScore++;
        playerText.textContent = player;
        computerText.textContent = computer;
        versusText.textContent = "Player wins!";
    } else if (result === "computer-win") {
        computerScore++;
        playerText.textContent = player;
        computerText.textContent = computer;
        versusText.textContent = "Computer wins!";
    }

    showChoice(displayPlayerChoice, player);
    showChoice(displayComputerChoice, computer);
    round.textContent = `Round: ${currentRound} / ${rounds}`;
    displayPlayerScore.textContent = playerScore;
    displayComputerScore.textContent = computerScore;

    // updateHistory(player, computer);
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
        versusText.textContent = finalWinner;
    }

    
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    currentRound = 1;
    displayPlayerChoice.textContent = "?";
    displayComputerChoice.textContent = "?";
    playerText.textContent = "waiting";
    computerText.textContent = "ready";
    round.textContent = `Round: ${currentRound} / ${rounds}`;
    displayPlayerScore.textContent = playerScore;
    displayComputerScore.textContent = computerScore;

    buttons.forEach(button => {
        button.disabled = false;
    })

    displayWinner.textContent = "";
    roundWinner.textContent = "";
    // history.replaceChildren();
}

function updateHistory(playerInfo, computerInfo) {
    let roundInfo = `Round: ${currentRound} - Player ${playerInfo} x ${computerInfo} Computer`;
    let list = document.createElement("li");
    list.textContent = roundInfo;
    history.appendChild(list);
}

reset.addEventListener("click", resetGame);
getHumanChoice();
