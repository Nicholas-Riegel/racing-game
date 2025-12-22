class Game {
    constructor(roadFactory, // Just call it, don't store it
    playerCarFactory, enemyCarFactory, collisionChecker) {
        this.enemyCarFactory = enemyCarFactory;
        this.collisionChecker = collisionChecker;
        this.enemyCarInterval = null;
        this.checkCollisionsInterval = null;
        roadFactory();
        this.playerCar = playerCarFactory();
    }
    start() {
        // Start enemy spawning
        this.enemyCarInterval = setInterval(this.enemyCarFactory, 1000);
        // Start player movement
        this.playerCar.startPlayerMovement();
        // Start collision detection
        this.checkCollisionsInterval = setInterval(() => this.collisionChecker(this.playerCar.getBoundingClientRect(), () => this.stop()), 10);
    }
    stop() {
        if (this.enemyCarInterval)
            clearInterval(this.enemyCarInterval);
        if (this.checkCollisionsInterval)
            clearInterval(this.checkCollisionsInterval);
    }
}
export default Game;
