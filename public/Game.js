class Game {
    constructor(roadFactory, playerCarFactory, enemyCarFactory, checkCollisions) {
        this.enemyCarFactory = enemyCarFactory;
        this.checkCollisions = checkCollisions;
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
        this.checkCollisionsInterval = setInterval(() => this.checkCollisions(this.playerCar.getPlayerCarDivElement().getBoundingClientRect(), () => this.stop(), this.playerCar), 10);
    }
    stop() {
        if (this.enemyCarInterval)
            clearInterval(this.enemyCarInterval);
        if (this.checkCollisionsInterval)
            clearInterval(this.checkCollisionsInterval);
    }
}
export default Game;
