import Road from "./Road.js"; 
import EnemyCarFactory from "./EnemyCar.js";
import CollisionDetector from "./CollisionDetector.js";
import PlayerCar from "./PlayerCar.js";

// Declare interval variables
let enemyCarInterval: number | null = null;
let checkCollisionsInterval: number | null = null;

// Function to stop the game from other modules
export const stopGame = () => {
    if (enemyCarInterval) clearInterval(enemyCarInterval);
    if (checkCollisionsInterval) clearInterval(checkCollisionsInterval);
};

const playGame = () => {

    // Create road instance
    new Road(); 
    
    // Create player car
    const playerCar = new PlayerCar();
    
    // Create enemy cars at a random x position every second
    enemyCarInterval = setInterval(
        ()=>EnemyCarFactory.createEnemyCar(), 
        1000
    )
    
    // Start player move loop
    playerCar.startPlayerMovement();
    
    // Periodically check for collisions
    checkCollisionsInterval = setInterval(
        ()=>CollisionDetector.checkCollisions(playerCar.getBoundingClientRect(), stopGame), 
        10
    );
}

playGame()