export default class GameObj {
    constructor() {
        this.active = false;
        this.players = [];
        this.numberOfPlayers = 1;
        this.remainingNumbers = [];
        this.winningPositions = [ 
            // vertical lines 
            [ 0,  1,  2,  3,  4],
            [ 5,  6,  7,  8,  9],
            [10, 11, 12, 13, 14],
            [15, 16, 17, 18, 19],
            [20, 21, 22, 23, 24],
            // horizontal lines
            [0, 5, 10, 15, 20],
            [1, 6, 11, 16, 21],
            [2, 7, 12, 17, 22],
            [3, 8, 13, 18, 23],
            [4, 9, 14, 19, 24],
            // diagonal lines
            [0, 6, 12, 18, 24],
            [4, 8, 12, 16, 20]
    ];
    }

    getActiveStatus() {
        return this.active;
    }

    getPlayers() {
        return this.players;
    }

    setPlayers(array) {
        this.players = array;
    }

    getNumberOfPlayers() {
        return this.numberOfPlayers;
    }

    setNumberOfPlayers(int) {
        this.numberOfPlayers = int;
    }

    startGame() {
        this.active = true;
    }

    endGame() {
        this.active = false;
    }

    getPossibleNumbers() {
        this.possibleNumbers = [
            1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 
           11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 
           21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
           31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 
           41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
           51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
           61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
           71, 72, 73, 74, 75
        ];
        return this.possibleNumbers;
    }

    getRemainingNumbers() {
        return this.remainingNumbers;
    }

    setRemainingNumbers(array) {
        this.remainingNumbers = array;
    }

    getWinningPositions() {
        return this.winningPositions;
    }

}