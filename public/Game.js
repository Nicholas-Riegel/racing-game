class Game {
    constructor(roadFactory, playerCarFactory, enemyCarFactory, 
    // This will be CollisionDetector.checkCollisions
    collisionChecker) {
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
        this.checkCollisionsInterval = setInterval(() => this.collisionChecker(this.playerCar.getPlayerCarDivElement().getBoundingClientRect(), () => this.stop(), this.playerCar), 10);
    }
    stop() {
        if (this.enemyCarInterval)
            clearInterval(this.enemyCarInterval);
        if (this.checkCollisionsInterval)
            clearInterval(this.checkCollisionsInterval);
    }
}
export default Game;
