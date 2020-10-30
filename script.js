let currentRound = 0;
let computerScore = 0;
let playerScore = 0;

const pointIndicators = [
    document.getElementById("point1"), 
    document.getElementById("point2"),
    document.getElementById("point3"),
    document.getElementById("point4"),
    document.getElementById("point5")
];

const roundText = document.getElementById("round-text");
const playerMoveText = document.getElementById("player-move-text");
const computerMoveText = document.getElementById("computer-move-text");
const actionButtonParent = document.getElementById("move-selection");
const resultText = document.getElementById("result-text");
const endText = document.getElementById("end-text");
const endScreen = document.getElementById("game-end-screen");

const actions = ["rock", "paper", "scissors"];

document.getElementById("rock").addEventListener('click', () => playRound(0));
document.getElementById("paper").addEventListener('click', () => playRound(1));
document.getElementById("scissors").addEventListener('click', () => playRound(2));
document.getElementById("reset-button").addEventListener('click', () => resetGame());

function resetGame() {
    currentRound = 0;
    computerScore = 0;
    playerScore = 0;
    pointIndicators.forEach(
        (indicator) => indicator.style.backgroundColor = "rgb(216, 216, 216)"
    );

    actionButtonParent.style.visibility = "visible";
    endScreen.style.visibility = "hidden";
    
    roundText.textContent = "Round 1";
    playerMoveText.textContent = "Make your move.";
    computerMoveText.textContent = "It's best of 5.";
    resultText.textContent = "Good luck!";
}

function playRound(index) {
    let playerAction = actions[index];
    let computerAction = randomAction();

    playerMoveText.textContent = `You played ${playerAction}.`;
    computerMoveText.textContent = `Computer ${playerAction === computerAction ? "also " : ""}played ${computerAction}.`;
    let result = getResult(playerAction, computerAction);
    resultText.textContent = result;
    updateResultText(result);
    updateGameState(result);
}

function randomAction() {
    return actions[Math.floor(Math.random() * 3)];
}

function getResult(playerAction, computerAction) {
    if (playerAction === computerAction) {
        return "tie";
    }
    else if (playerAction === "rock") {
        return computerAction === "scissors" ? "win" : "lose";
    }
    else if (playerAction === "paper") {
        return computerAction === "rock" ? "win" : "lose";
    }
    else if (playerAction === "scissors") {
        return computerAction === "paper" ? "win" : "lose";
    }
}

function updateResultText(roundResult) {
    let newStatusMessage = "";

    switch (roundResult) {
        case "tie": 
            newStatusMessage = "You tied! That doesn't count."
            break;
        case "win":
            newStatusMessage = "You won this round!"
            playerScore++;
            break;
        case "lose":
            newStatusMessage = "You lost this round.";
            computerScore++;
            break;
        default:
            newStatusMessage = "ERROR";
            break;
    }

    resultText.textContent = newStatusMessage;
}

function updateGameState(roundResult) {
    if (roundResult !== "tie") {
        if (roundResult === "win") {
            pointIndicators[currentRound].style.backgroundColor = "#94db86";
        }
        else if (roundResult === "lose") {
            pointIndicators[currentRound].style.backgroundColor = "#db8686";
        }

        currentRound++;
        
    }

    if (playerScore >= 3) {
        endGame("player");
        return;
    }
    if (computerScore >= 3) {
        endGame("computer");
        return;
    }

    roundText.textContent = `Round ${currentRound+1}`;
}

function endGame(winner) {
    let endTextContent = "";

    if (winner === "player") {
        endTextContent = "Victory!";
    }
    else if (winner === "computer") {
        endTextContent = "You lost."
    }
    
    actionButtonParent.style.visibility = "hidden";
    endScreen.style.visibility = "visible";
    endText.textContent = endTextContent;
    
}