import { stopGame } from "./app.js";
import { PlayerCar } from "./PlayerCar.js";

export class CollisionDetector{

    public static checkCollisions(playerCar: PlayerCar): boolean {

        const playerRect = playerCar.getBoundingClientRect();
        const enemyCars = document.querySelectorAll('.enemyCar');
        // let enemyRect = null;    
        
        // let collisionDetected = false;
        
        for (const enemyCar of enemyCars){
            const enemyRect = enemyCar.getBoundingClientRect();
            if (this.isColliding(playerRect, enemyRect)){
                this.handleCollision(playerRect)
                return true
            }
        }
        return false
    }

    private static isColliding(playerRect: DOMRect, enemyRect: DOMRect): boolean {
        
        return playerRect.top < enemyRect.bottom 
            && playerRect.left < enemyRect.right
            && playerRect.right > enemyRect.left
            && playerRect.bottom > enemyRect.top; 
    }

    private static handleCollision(playerRect: DOMRect): void {
        // Pause enemy cars
        const enemyCars = document.querySelectorAll('.enemyCar');
        enemyCars.forEach(enemyCar => {
            enemyCar.classList.add('pause-animation');
        });
        
        // Pause road animations
        document.getElementById('lines-container-2')!.classList.add('pause-animation');
        document.getElementById('lines-container-3')!.classList.add('pause-animation');
        
        // Create crash spark
        this.createCrashSpark(playerRect);
        
        // Stop game
        stopGame();
    }

    private static createCrashSpark(playerRect: DOMRect): void {
        const playerCenterX = playerRect.left + (playerRect.width / 2);
        const playerCenterY = playerRect.top + (playerRect.height / 2);

        const sparkStar = document.createElement('div');
        sparkStar.className = 'crash-spark';
        sparkStar.style.left = playerCenterX + 'px';
        sparkStar.style.top = playerCenterY + 'px';
        document.body.appendChild(sparkStar);
    }
}
