// -------------------------------------Constants & Variables--------------------------------------------

// -------------------------------------Event Listeners--------------------------------------------------

// -------------------------------------Functions--------------------------------------------------------

const createEnemyCars = () => {
    const enemyCar = document.createElement('div')
    enemyCar.classList.add('car')
    enemyCar.classList.add('enemyCar')
    const left = Math.floor(Math.random() * 428)
    enemyCar.style.left = `${left}px`
    const road = document.getElementById('road')
    road.prepend(enemyCar)
    
    checkPositionAndRemove(enemyCar)
}

const checkPositionAndRemove = (enemyCar) => {
    const checkInterval = setInterval(() => {
        const topPosition = parseFloat(window.getComputedStyle(enemyCar).top);

        // Check if car is off the bottom of the screen
        if (topPosition >= 700) {
            const road = document.getElementById('road');
            road.removeChild(enemyCar);
            clearInterval(checkInterval);  // Stop the interval
        }
    }, 50);  // Check position every 50 milliseconds
};

setInterval(createEnemyCars, 1000)