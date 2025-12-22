export class EnemyCar {
    constructor() {
        this.cleanupInterval = null;
        this.createEnemyCar();
        this.startCleanupCheck();
    }
    createEnemyCar() {
        this.enemyCar = document.createElement('div');
        this.enemyCar.classList.add('car', 'enemyCar');
        const left = Math.floor(Math.random() * 428);
        this.enemyCar.style.left = `${left}px`;
        const road = document.getElementById('road');
        road.prepend(this.enemyCar);
    }
    // check position of enemy car and remove if off bottom of screen
    startCleanupCheck() {
        this.cleanupInterval = setInterval(() => {
            const topPosition = parseFloat(window.getComputedStyle(this.enemyCar).top);
            if (topPosition >= 700) {
                this.destroy();
            }
        }, 50);
    }
    destroy() {
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval);
        }
        const road = document.getElementById('road');
        if (this.enemyCar.parentNode === road) {
            road.removeChild(this.enemyCar);
        }
    }
    getElement() {
        return this.enemyCar;
    }
}
export class EnemyCarManager {
    static createEnemyCar() {
        return new EnemyCar();
    }
}
