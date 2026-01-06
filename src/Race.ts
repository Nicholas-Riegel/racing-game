import Road from "./RaceElements/Road.js";
import PlayerCar from "./RaceElements/PlayerCar.js";
import EnemyCarFactory from "./RaceElements/EnemyCar.js";

class Race {

    private road: Road | null = null;
    private playerCar: PlayerCar | null = null;
    private enemyCarInterval: number | null = null;
    private checkCollisionsInterval: number | null = null;
    private backgroundMusic: HTMLAudioElement | null = null;

    public start(): void {
        
        // Create game elements
        this.road = new Road();
        this.playerCar = new PlayerCar();
        
        // Start music
        this.startBackgroundMusic();
        
        // Start enemy spawning
        this.enemyCarInterval = setInterval(() => EnemyCarFactory.createEnemyCar(), 1000);
        
        // Start player movement
        this.playerCar.startPlayerMovement();

        // Start collision detection
        this.checkCollisionsInterval = setInterval(() => {
            if (this.checkCollisions()) {
                this.stop();
            }
        }, 10);

    }

    public stop(): void {
        if (this.enemyCarInterval) clearInterval(this.enemyCarInterval);
        if (this.checkCollisionsInterval) clearInterval(this.checkCollisionsInterval);
    }

    private startBackgroundMusic(): void {
        this.backgroundMusic = new Audio('./dance_around.wav');
        this.backgroundMusic.loop = true;
        this.backgroundMusic.volume = 0.5; // 50% volume
        this.backgroundMusic.play().catch(e => {
            console.log('Audio play failed:', e);
        });
    }

    public cleanup(): void {
        
        // 1. Stop all intervals first
        this.stop();
        
        // 2. Clean up PlayerCar resources
        if (this.playerCar) {
            // PlayerCar creates event listeners that need to be removed
            // We need to add a cleanup method to PlayerCar
            this.playerCar.cleanup();
        }
        
        // Clean up audio
        if (this.backgroundMusic) {
            this.backgroundMusic.pause();
            this.backgroundMusic = null;
        }

        // 3. Clean up all enemy cars (they have their own cleanup intervals)
        const enemyCars = document.querySelectorAll('.enemyCar');
        enemyCars.forEach(enemyCarElement => {
            // Find the EnemyCar instance and call destroy
            // Since we can't easily track instances, we'll force remove
            enemyCarElement.remove();
        });
        
        // 4. Remove player car DOM element
        const playerCarElement = document.querySelector('#playerCar');
        if (playerCarElement) {
            playerCarElement.remove();
        }
        
        // 5. Remove crash spark if it exists
        const spark = document.querySelector('.crash-spark');
        if (spark) {
            spark.remove();
        }
        
        // 6. Clean up road lines (Road creates DOM elements)
        const containers = document.querySelectorAll('#road > div');
        containers.forEach(container => {
            container.innerHTML = ''; // Remove all line elements
        });
        
        // 7. Remove any pause-animation classes that might be stuck
        containers.forEach(container => {
            container.classList.remove('pause-animation');
        });
        
        // 8. Reset references
        this.road = null;
        this.playerCar = null;
        this.enemyCarInterval = null;
        this.checkCollisionsInterval = null;
        
    }

    // Collision detection
    private isColliding(playerRect: DOMRect, enemyRect: DOMRect): boolean {
        return playerRect.top < enemyRect.bottom 
            && playerRect.left < enemyRect.right
            && playerRect.right > enemyRect.left
            && playerRect.bottom > enemyRect.top; 
    }

    private checkCollisions(): boolean {
        
        if (!this.playerCar) return false;
        
        const playerRect = this.playerCar.getPlayerCarDivElement().getBoundingClientRect();
        const enemyCars = document.querySelectorAll('.enemyCar');
        
        for (const enemyCar of enemyCars) {
            const enemyRect = enemyCar.getBoundingClientRect();
            if (this.isColliding(playerRect, enemyRect)) {
                this.handleCollision(playerRect, enemyRect);
                return true;
            }
        }
        return false;
    }
    
    private handleCollision(playerRect: DOMRect, enemyRect: DOMRect): void {
        
        // Pause the player car first!
        if (this.playerCar) {
            this.playerCar.pause();
        }

        // Stop background music
        if (this.backgroundMusic) {
            this.backgroundMusic.pause();
        }
        
        // Pause enemy cars
        const enemyCars = document.querySelectorAll('.enemyCar');
        enemyCars.forEach(enemyCar => {
            enemyCar.classList.add('pause-animation');
        });
        
        // Pause road animations
        document.getElementById('lines-container-2')!.classList.add('pause-animation');
        document.getElementById('lines-container-3')!.classList.add('pause-animation');
        
        // Create crash spark at collision point
        this.createCrashSpark(playerRect, enemyRect);
    }

    private createCrashSpark(playerRect: DOMRect, enemyRect: DOMRect): void {
        
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
        const roadContainer = document.getElementById('road')!;
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

export default Race;