class EnemyCar{
    
    private enemyCar!: HTMLDivElement;
    private cleanupInterval: number | null = null;
    private static readonly CAR_WIDTH = 35; // From your CSS: width: 35px
    private static readonly ROAD_PADDING = 20; // Safe padding from road edges

    constructor(){
        this.createEnemyCar();
        this.startCleanupCheck();
    }

    private createEnemyCar() {

        this.enemyCar = document.createElement('div');
        this.enemyCar.classList.add('car', 'enemyCar');
        
        const road = document.getElementById('road')!;
        const roadWidth = road.offsetWidth; // Gets actual computed width
        
        const minLeft = EnemyCar.ROAD_PADDING;
        const maxLeft = roadWidth - EnemyCar.CAR_WIDTH - EnemyCar.ROAD_PADDING;
        const spawnRange = maxLeft - minLeft;
        
        const left = minLeft + Math.floor(Math.random() * spawnRange);
        this.enemyCar.style.left = `${left}px`;
        
        road.prepend(this.enemyCar);
    }

    // check position of enemy car and remove if off bottom of screen
    private startCleanupCheck(): void {
    
        this.cleanupInterval = setInterval(() => {

            const topPosition = parseFloat(window.getComputedStyle(this.enemyCar).top);

            if (topPosition >= 700) {
                this.destroy()                
            }
        
        }, 50)
    }

    public destroy(): void {
        if (this.cleanupInterval){
            clearInterval(this.cleanupInterval)
        }

        const road = document.getElementById('road')!
        if (this.enemyCar.parentNode === road){
            road.removeChild(this.enemyCar)
        }
    }

}

class EnemyCarFactory {
    public static createEnemyCar(): EnemyCar {
        return new EnemyCar();
    }
}

export default EnemyCarFactory