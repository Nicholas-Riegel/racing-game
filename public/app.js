import Road from "./Road.js";
import EnemyCarFactory from "./EnemyCar.js";
import CollisionDetector from "./CollisionDetector.js";
import PlayerCar from "./PlayerCar.js";
export class Game {
    constructor() {
        this.enemyCarInterval = null;
        this.checkCollisionsInterval = null;
        new Road();
        this.playerCar = new PlayerCar();
    }
    start() {
        // Start enemy spawning
        this.enemyCarInterval = setInterval(() => EnemyCarFactory.createEnemyCar(), 1000);
        // Start player movement
        this.playerCar.startPlayerMovement();
        // Start collision detection
        this.checkCollisionsInterval = setInterval(() => CollisionDetector.checkCollisions(this.playerCar.getBoundingClientRect(), () => this.stop()), 10);
    }
    stop() {
        if (this.enemyCarInterval)
            clearInterval(this.enemyCarInterval);
        if (this.checkCollisionsInterval)
            clearInterval(this.checkCollisionsInterval);
    }
    restart() {
        this.stop();
        // Could add reset logic here
        this.start();
    }
}
// Initialize and start the game
const game = new Game();
game.start();
