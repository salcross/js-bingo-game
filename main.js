import GameObj from "./Game.js";
import PlayerObj from "./Player.js";

const Game = new GameObj();

const initApp = () => {
    createBoard();
    updateNames();
    listenForStartGame();
    listenForReset();
    listenForNameChange();
    document.getElementById("startButton").focus();
}

document.addEventListener("DOMContentLoaded", initApp);

const createBoard = () => {
    Game.setPlayers([]);
    Game.setRemainingNumbers(Game.getPossibleNumbers())
    const startButton = document.getElementById("startButton");
    startButton.textContent = "Start Game";
    for (let i = 0; i <= 3; i++) {
        const Player = new PlayerObj();
        Game.getPlayers().push(Player);
        const player = Game.getPlayers()
        const cardNumbers = generateBingoNumbers();
        player[i].setPlayerCardNumbers(cardNumbers);
        const numberSquares = document.querySelectorAll(`.p${i + 1} .number`);
        player[i].setPlayerNumberSquares(numberSquares);
        for (let i = 0; i <= 23; i++) {
            numberSquares[i].classList.remove("selected-number", "winning-number");
            numberSquares[i].textContent = `${cardNumbers[i]}`;
        };
    };
    Game.startGame();
}

const generateBingoNumbers = () => {
    const numbers = [];
    for (let i = 0; i <= 4; i++) {
        const n = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        for (let j = 0; j <= 4; j++) {
            const number = Math.floor(Math.random() * (n.length));
            numbers.push(n[number] + (i * 15));
            n.splice(number, 1);
        };
    };
    numbers.splice(12, 1);
    return numbers;
}

const updateNames = () => {
    for (let i = 1; i <= 4; i++) {
        const label = document.getElementById(`p${i}Label`);
        const input = document.getElementById(`p${i}Name`);
        const name = localStorage.getItem(`p${i} name`) || "";
        label.textContent = name;
        if (name === "") {
            label.textContent = `Player ${i}`;
        }
        input.placeholder = label.textContent;
    }
}

const listenForStartGame = () => {
    const startButton = document.getElementById("startButton");
        startButton.addEventListener("click", (event) => {
        if (!Game.getActiveStatus()) return;
        Game.setNumberOfPlayers(Game.getPlayers().length);
        changeFreeSpaces();
        startButton.textContent = "Draw Number";
        toggleSettings(0);
        startGameFlow();
    })
}

const listenForReset = () => {
    const resetButton = document.getElementById("resetButton");
    resetButton.addEventListener("click", (event) => {
        if (Game.getActiveStatus()) return;
        resetBoard();
        createBoard();
    })
}

const listenForNameChange = () => {
    for (let i = 1; i <= 4; i++) {
        const input = document.getElementById(`p${i}Name`);
        const label = document.getElementById(`p${i}Label`);
        input.addEventListener("input", (event) => {
        label.textContent = event.target.value;
        if (label.textContent.length === 0) {
            label.textContent = `Player ${i}`;
        }
        localStorage.setItem(`p${i} name`, label.textContent);
        input.placeholder = label.textContent;
        })
    }
}

const toggleSettings = (state) => {
    const settings = document.getElementById("settings").children;
    for (let i = 0; i <= (settings.length - 1); i++) {
        state === 0 ?
        settings[i].classList.add("hidden")
        : settings[i].classList.remove("hidden");
    }
}

const changeFreeSpaces = () => {
    const freeSpaces = document.getElementsByClassName("free-space");
    for (let i = 1; i <= (Game.getNumberOfPlayers()); i++) {
        freeSpaces[i - 1].classList.add(`selected-number-p${i}`);
    }
}

const startGameFlow = () => {
    const newNumber = drawNumber();
    updateCurrentNumber(newNumber);
    updatePlayerCards(newNumber);
    checkForWinner();
}

const updateCurrentNumber = (newNumber) => {
    const numberDisplay = document.getElementById("currentNumber");
    const letter = 
        newNumber <= 15
        ? "B" 
        : newNumber >= 16 && newNumber <= 30
        ? "I" 
        : newNumber >= 31 && newNumber <= 45
        ? "N" 
        : newNumber >= 46 && newNumber <= 60
        ? "G"
        : "O";
    numberDisplay.textContent = `${letter} ${newNumber}`;
}

const drawNumber = () => {
    const numberPool = Game.getRemainingNumbers();
    const index = Math.floor(Math.random() * (numberPool.length));
    const newNumber = numberPool[index];
    numberPool.splice(index, 1);
    return newNumber;
}

const updatePlayerCards = (number) => {
    for (let i = 1; i <= (Game.getNumberOfPlayers()); i++) {
        const player = Game.getPlayers()[i - 1];
        if (player.playerCardNumbers.includes(number)) {
            player.playerChosenNumbers.push(number);
            let positionIndex = player.playerCardNumbers.indexOf(number);
            const selectedSquare = player.playerNumberSquares[positionIndex];
            if (positionIndex >= 12) {
                positionIndex++;
            }
            player.playerNumberPositions.push(positionIndex);
            selectedSquare.classList.add(`selected-number-p${i}`);
        }
    }
}

const checkForWinner = () => {
    for (let i = 1; i <= (Game.getNumberOfPlayers()); i++) {
        const player = Game.getPlayers()[i - 1];
        const numPositions = player.getPlayerNumberPositions();
        const winningPositions = Game.getWinningPositions();
        for (let j = 0; j <= 11; j++) {
            if (winningPositions[j].every(n => numPositions.includes(n))) {
            displayWinner(j, i);
            }
        }
    }
}

const displayWinner = (n, player) => {
    const winningSquarePositions = Game.getWinningPositions()[n];
    const squares = document.getElementById(`p${player}Squares`).children;
    for (let i = 0; i <= 4; i++) {
        const winningSquare = squares[winningSquarePositions[i]];
        winningSquare.classList.add("winning-number");
    }
    const label = document.getElementById(`p${player}Wins`);
    label.textContent = " Wins!";
    const label2 =  document.getElementById(`announceP${player}Win`);
    const name = document.getElementById(`p${player}Label`).textContent;
    label2.textContent =  name + " Wins!";
    if (Game.getActiveStatus()) {
        setTimeout(() => {
            toggleButtons();
            document.getElementById("resetButton").focus();
        }, 1000);
    }
    Game.endGame();
}

const toggleButtons = () => {
    const resetButton = document.getElementById("resetButton");
    resetButton.classList.toggle("hidden");
    const startButton = document.getElementById("startButton");
    startButton.classList.toggle("hidden");
}

const resetBoard = () => {
    for (let i = 1; i <= (Game.getNumberOfPlayers()); i++) {
        const squares = document.getElementById(`p${i}Squares`).children;
        for (let j = 0; j <= 24; j++) {
            squares[j].classList.remove(`selected-number-p${i}`, "winning-number");
        }
        const label = document.getElementById(`p${i}Wins`);
        label.textContent = "";
        const label2 = document.getElementById(`announceP${i}Win`);
        label2.textContent = "";
    }
    const numberDisplay = document.getElementById("currentNumber");
    numberDisplay.textContent= "";
    toggleButtons();
    toggleSettings(1);
    document.getElementById("startButton").focus();
}