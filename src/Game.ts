
// Define interfaces for what Game needs (no imports required)
interface IPlayerCar {
    startPlayerMovement(): void;
    getBoundingClientRect(): DOMRect;
}

class Game {

    private playerCar: IPlayerCar;
    private enemyCarInterval: number | null = null;
    private checkCollisionsInterval: number | null = null;

    constructor(
        roadFactory: () => void,  // Just call it, don't store it
        playerCarFactory: () => IPlayerCar,
        private enemyCarFactory: () => void,
        private collisionChecker: (playerRect: DOMRect, onCollision: () => void) => boolean
    ) {
        roadFactory();
        this.playerCar = playerCarFactory();
    }

    public start(): void {
        
        // Start enemy spawning
        this.enemyCarInterval = setInterval(this.enemyCarFactory, 1000);
        
        // Start player movement
        this.playerCar.startPlayerMovement();
        
        // Start collision detection
        this.checkCollisionsInterval = setInterval(() => 
            this.collisionChecker(
                this.playerCar.getBoundingClientRect(), 
                () => this.stop()
            ), 10
        );
    }

    public stop(): void {
        if (this.enemyCarInterval) clearInterval(this.enemyCarInterval);
        if (this.checkCollisionsInterval) clearInterval(this.checkCollisionsInterval);
    }
}

export default Game;