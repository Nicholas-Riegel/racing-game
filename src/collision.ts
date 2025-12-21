import { playerCar } from "./player.js";
import { stopGame } from "./app.js";

// Collision detection
const checkCollisions = () => {

    const playerRect = playerCar.getBoundingClientRect();
    const enemyCars = document.querySelectorAll('.enemyCar');
    let enemyRect = null;    
    
    let collisionDetected = false;
    
    enemyCars.forEach(enemyCar => {
        enemyRect = enemyCar.getBoundingClientRect();
        
        if (
            playerRect.top < enemyRect.bottom 
            && playerRect.left < enemyRect.right
            && playerRect.right > enemyRect.left
            && playerRect.bottom > enemyRect.top 
        ) {
            collisionDetected = true;            
            // pause game
            enemyCars.forEach(enemyCar => {
                enemyCar.classList.add('pause-animation')
            })
            document.getElementById('lines-container-2')!.classList.add('pause-animation')
            document.getElementById('lines-container-3')!.classList.add('pause-animation')
            stopGame();
        }
    });

    if (collisionDetected) {
        // Calculate the center of the player car
        const playerCenterX = playerRect.left + (playerRect.width / 2);
        const playerCenterY = playerRect.top + (playerRect.height / 2);

        // Calculate the center of the enemy car
        // const enemyCenterX = enemyRect.left + (enemyRect.width / 2);
        // const enemyCenterY = enemyRect.top + (enemyRect.height / 2);

        // Calculate the center of the line between the centers of the two cars
        // const centerX = (playerCenterX + enemyCenterX) / 2;
        // const centerY = (playerCenterY + enemyCenterY) / 2;

        // Create and position the crash-spark element
        const sparkStar = document.createElement('div');
        sparkStar.className = 'crash-spark';
        sparkStar.style.left = playerCenterX + 'px';
        sparkStar.style.top = playerCenterY + 'px';
        document.body.appendChild(sparkStar);
    }
};

export {checkCollisions}