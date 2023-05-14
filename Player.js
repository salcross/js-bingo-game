export default class PlayerObj {
    constructor() {
        this.name = "";
        this.active = false;
        this.playerCardNumbers = [];
        this.playerNumberSquares = [];
        this.playerChosenNumbers = [];
        this.playerNumberPositions = [12];
    }

    getPlayerName() {
        return this.name;
    }

    setPlayerName(string) {
        this.name = string;
    }

    getActiveStatus() {
        return this.active;
    }

    startGame() {
        this.active = true;
    }

    endGame() {
        this.active = false;
    }

    getPlayerCardNumbers() {
        return this.playerCardNumbers;
    }

    setPlayerCardNumbers(array) {
        this.playerCardNumbers = array;
    }

    getPlayerNumberSquares() {
        return this.playerNumberSquares;
    }

    setPlayerNumberSquares(array) {
        this.playerNumberSquares = array;
    }
    
    getPlayerChosenNumbers() {
        return this.playerChosenNumbers;
    }

    setPlayerChosenNumbers(array) {
        this.playerChosenNumbers = array;
    }
    
    getPlayerNumberPositions() {
        return this.playerNumberPositions;
    }

    setPlayerNumberPositions(array) {
        this.playerNumberPositions = array;
    }

}