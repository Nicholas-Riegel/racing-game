class CollisionDetector {
    static checkCollisions(playerRect, onCollision, playerCar) {
        const enemyCars = document.querySelectorAll('.enemyCar');
        for (const enemyCar of enemyCars) {
            const enemyRect = enemyCar.getBoundingClientRect();
            if (this.isColliding(playerRect, enemyRect)) {
                this.handleCollision(playerRect, enemyRect);
                if (playerCar) {
                    playerCar.pause();
                }
                onCollision();
                return true;
            }
        }
        return false;
    }
    static isColliding(playerRect, enemyRect) {
        return playerRect.top < enemyRect.bottom
            && playerRect.left < enemyRect.right
            && playerRect.right > enemyRect.left
            && playerRect.bottom > enemyRect.top;
    }
    static handleCollision(playerRect, enemyRect) {
        // Pause enemy cars
        const enemyCars = document.querySelectorAll('.enemyCar');
        enemyCars.forEach(enemyCar => {
            enemyCar.classList.add('pause-animation');
        });
        // Pause road animations
        document.getElementById('lines-container-2').classList.add('pause-animation');
        document.getElementById('lines-container-3').classList.add('pause-animation');
        // Create crash spark at collision point
        this.createCrashSpark(playerRect, enemyRect);
    }
    static createCrashSpark(playerRect, enemyRect) {
        // Calculate the intersection rectangle of the two cars when they hit
        // left etc. relative to the viewport
        const intersectionLeft = Math.max(playerRect.left, enemyRect.left);
        const intersectionTop = Math.max(playerRect.top, enemyRect.top);
        const intersectionRight = Math.min(playerRect.right, enemyRect.right);
        const intersectionBottom = Math.min(playerRect.bottom, enemyRect.bottom);
        // Calculate the center of the intersection area
        const collisionX = intersectionLeft + (intersectionRight - intersectionLeft) / 2;
        const collisionY = intersectionTop + (intersectionBottom - intersectionTop) / 2;
        // Create spark
        const spark = document.createElement('div');
        spark.className = 'crash-spark';
        // Get the road container to append spark relative to it
        const roadContainer = document.getElementById('road');
        const roadRect = roadContainer.getBoundingClientRect();
        // Convert viewport coordinates to road-relative coordinates
        const relativeX = collisionX - roadRect.left;
        const relativeY = collisionY - roadRect.top;
        // Center the spark at the collision point (spark is 50x50px)
        spark.style.left = (relativeX - 25) + 'px';
        spark.style.top = (relativeY - 25) + 'px';
        roadContainer.appendChild(spark);
    }
}
export default CollisionDetector;
