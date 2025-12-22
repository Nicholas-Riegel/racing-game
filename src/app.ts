import "./Road.js"; // create road first
import { EnemyCarManager } from "./EnemyCar.js";
import { CollisionDetector } from "./CollisionDetector.js";
import { PlayerCar } from "./PlayerCar.js";

// Declare interval variables
let enemyCarInterval: number | null = null;
let checkCollisionsInterval: number | null = null;
export let gameActive = true;

// Function to stop the game from other modules
export const stopGame = () => {
    gameActive = false;
    if (enemyCarInterval) clearInterval(enemyCarInterval);
    if (checkCollisionsInterval) clearInterval(checkCollisionsInterval);
};

const playGame = () => {
    
    const playerCar = new PlayerCar();
    // create enemy cars at a random x position every second
    enemyCarInterval = setInterval(()=>EnemyCarManager.createEnemyCar(), 1000)
    
    // start player move loop
    playerCar.startPlayerMovement();
    
    // Periodically check for collisions
    checkCollisionsInterval = setInterval(()=>CollisionDetector.checkCollisions(playerCar), 10);
}

playGame()