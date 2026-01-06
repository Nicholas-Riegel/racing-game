import Race from "./Race.js";

class Game {

    private currentRace: Race | null = null;
    private restartButton: HTMLButtonElement | null = null;
    
    constructor() {
        this.setupUI();
    }
    
    private setupUI(): void {
        // Setup restart button
        this.restartButton = document.querySelector('#restart-button') as HTMLButtonElement;
        if (this.restartButton) {
            this.restartButton.addEventListener('click', () => {
                this.start();
            });
        }
    }

    public start(): void {
        // Clean up previous race if it exists
        if (this.currentRace) {
            this.currentRace.cleanup();
        }
        
        // Create and start new race
        this.currentRace = new Race();
        this.currentRace.start();
    }

}

export default Game;