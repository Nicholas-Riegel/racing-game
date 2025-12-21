import { createEnemyCars } from "./enemy.js";
import { checkCollisions } from "./collision.js";
import "./road.js";
import { startPlayerMovement } from "./player.js";

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
    
    // create enemy cars at a random x position every second
    enemyCarInterval = setInterval(createEnemyCars, 1000)
    
    // start player move loop
    startPlayerMovement();
    
    // Periodically check for collisions
    checkCollisionsInterval = setInterval(checkCollisions, 10);
}

playGame()