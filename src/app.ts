import Road from "./Road.js"; 
import EnemyCarFactory from "./EnemyCar.js";
import CollisionDetector from "./CollisionDetector.js";
import PlayerCar from "./PlayerCar.js";

export class Game {
    
    private enemyCarInterval: number | null = null;
    private checkCollisionsInterval: number | null = null;
    private playerCar: PlayerCar;

    constructor() {
        new Road();
        this.playerCar = new PlayerCar();
    }

    public start(): void {
        
        // Start enemy spawning
        this.enemyCarInterval = setInterval(() => 
            EnemyCarFactory.createEnemyCar(), 1000
        );
        
        // Start player movement
        this.playerCar.startPlayerMovement();
        
        // Start collision detection
        this.checkCollisionsInterval = setInterval(() => 
            CollisionDetector.checkCollisions(
                this.playerCar.getBoundingClientRect(), 
                () => this.stop()
            ), 10
        );
    }

    public stop(): void {
        if (this.enemyCarInterval) clearInterval(this.enemyCarInterval);
        if (this.checkCollisionsInterval) clearInterval(this.checkCollisionsInterval);
    }

    public restart(): void {
        this.stop();
        // Could add reset logic here
        this.start();
    }
}

// Initialize and start the game
const game = new Game();
game.start();