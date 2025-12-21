let enemyCarInterval: number | null = null;

const createEnemyCars = () => {
    
    const enemyCar = document.createElement('div')
    
    enemyCar.classList.add('car')
    
    enemyCar.classList.add('enemyCar')
    
    const left = Math.floor(Math.random() * 428)
    
    enemyCar.style.left = `${left}px`
    
    const road = document.getElementById('road')!
    
    road.prepend(enemyCar)
    
    checkPositionAndRemove(enemyCar)
}

// check position of enemy car and remove if off bottom of screen
const checkPositionAndRemove = (enemyCar: HTMLDivElement) => {
    
    const checkInterval = setInterval(() => {

        const topPosition = parseFloat(window.getComputedStyle(enemyCar).top);

        if (topPosition >= 700) {
            
            const road = document.getElementById('road')!;
            
            road.removeChild(enemyCar);
            
            clearInterval(checkInterval);  
        }
    
    }, 50);  

};

export {createEnemyCars, enemyCarInterval}