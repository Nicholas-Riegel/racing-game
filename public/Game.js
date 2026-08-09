import Race from "./Race.js";
class Game {
    constructor() {
        this.currentRace = null;
        this.restartButton = null;
        this.highScore = 0;
        this.setupUI();
    }
    setupUI() {
        // Setup restart button
        this.restartButton = document.querySelector('#restart-button');
        if (this.restartButton) {
            this.restartButton.addEventListener('click', () => {
                this.start();
            });
        }
    }
    start() {
        // Clean up previous race if it exists
        if (this.currentRace) {
            this.currentRace.cleanup();
        }
        // Create and start new race
        this.currentRace = new Race(this);
        this.currentRace.start();
    }
}
export default Game;
