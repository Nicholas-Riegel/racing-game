import Road from "./Road.js";
import PlayerCar from "./PlayerCar.js";
import EnemyCarFactory from "./EnemyCar.js";
import CollisionDetector from "./CollisionDetector.js";

class Race {
    
    private road: Road | null = null;
    private playerCar: PlayerCar | null = null;
    private enemyCarInterval: number | null = null;
    private checkCollisionsInterval: number | null = null;

    constructor() {}

    public start(): void {
        // Create game elements
        this.road = new Road();
        this.playerCar = new PlayerCar();
        
        // Start enemy spawning
        this.enemyCarInterval = setInterval(() => EnemyCarFactory.createEnemyCar(), 1000);
        
        // Start player movement
        this.playerCar.startPlayerMovement();
        
        // Start collision detection
        this.checkCollisionsInterval = setInterval(() => 
            CollisionDetector.checkCollisions(
                this.playerCar!.getPlayerCarDivElement().getBoundingClientRect(), 
                () => this.stop(),
                this.playerCar!
            ), 10
        );
    }

    public stop(): void {
        if (this.enemyCarInterval) clearInterval(this.enemyCarInterval);
        if (this.checkCollisionsInterval) clearInterval(this.checkCollisionsInterval);
    }

    public cleanup(): void {
        console.log('Starting race cleanup...');
        
        // 1. Stop all intervals first
        this.stop();
        
        // 2. Clean up PlayerCar resources
        if (this.playerCar) {
            // PlayerCar creates event listeners that need to be removed
            // We need to add a cleanup method to PlayerCar
            this.playerCar.cleanup();
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
        
        console.log('Race cleanup complete');
    }

    public restart(): void {
        this.cleanup();
        this.start();
    }
}

export default Race;