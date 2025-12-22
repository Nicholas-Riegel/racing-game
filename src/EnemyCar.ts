
export class EnemyCar{
    
    private enemyCar!: HTMLDivElement;
    private cleanupInterval: number | null = null;

    constructor(){
        this.createEnemyCar();
        this.startCleanupCheck();
    }

    private createEnemyCar(){
    
        this.enemyCar = document.createElement('div')
    
        this.enemyCar.classList.add('car', 'enemyCar')
    
        const left = Math.floor(Math.random() * 428)
    
        this.enemyCar.style.left = `${left}px`
    
        const road = document.getElementById('road')!
    
        road.prepend(this.enemyCar)
    
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

    public getElement(): HTMLDivElement {
        return this.enemyCar;
    }
}

export class EnemyCarFactory {
    public static createEnemyCar(): EnemyCar {
        return new EnemyCar();
    }
}