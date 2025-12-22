import Road from "./Road.js"; 
import EnemyCarFactory from "./EnemyCar.js";
import CollisionDetector from "./CollisionDetector.js";
import PlayerCar from "./PlayerCar.js";
import Game from "./Game.js";

// Create game with dependencies injected
const game = new Game(
    () => new Road(),  
    () => new PlayerCar(),  
    () => EnemyCarFactory.createEnemyCar(),
    (playerRect, onCollision, playerCar) => CollisionDetector.checkCollisions(playerRect, onCollision, playerCar)
);

game.start();