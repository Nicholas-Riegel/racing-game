interface IPlayerCar {
    startPlayerMovement(): void;
    pause(): void;
    getPlayerCarDivElement(): HTMLDivElement
}

interface IcheckCollisions {
    (playerRect: DOMRect, onCollision: () => void, playerCar?: { pause(): void }): boolean;
}

class Game {

    private playerCar: IPlayerCar;
    private enemyCarInterval: number | null = null;
    private checkCollisionsInterval: number | null = null;

    constructor(
        roadFactory: () => void, 
        playerCarFactory: () => IPlayerCar,
        private enemyCarFactory: () => void,
        private checkCollisions: IcheckCollisions
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
            this.checkCollisions(
                this.playerCar.getPlayerCarDivElement().getBoundingClientRect(), 
                () => this.stop(),
                this.playerCar
            ), 10
        );
    }

    public stop(): void {
        if (this.enemyCarInterval) clearInterval(this.enemyCarInterval);
        if (this.checkCollisionsInterval) clearInterval(this.checkCollisionsInterval);
    }
}

export default Game;