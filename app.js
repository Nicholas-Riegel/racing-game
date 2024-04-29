
// ------------------------------------------------Constants and variables--------------------------------------------

// create white lines
const linesContainerArray = document.querySelectorAll('#road > div')
linesContainerArray.forEach(x => {
    for (let i = 0; i < 4; i++){
        const line = document.createElement('div')
        line.classList.add('lines')
        x.appendChild(line)
    }
})

// create player car
const playerCar = document.createElement('div')
playerCar.setAttribute('id', 'playerCar')
playerCar.setAttribute('class', 'car')
document.querySelector('#road').appendChild(playerCar)

// get the computed style details for the car
const computedStyle = getComputedStyle(playerCar);

// get the starting position of the car
let x = parseInt(computedStyle.left, 10);
let y = parseInt(computedStyle.top, 10);

// set the speed of movement on keydowns
const speed = 3;

// arrow key activation
let [arrowUp, arrowDown, arrowLeft, arrowRight] = [false, false, false, false]

// game boundaries
const topBoundry = 4;
const bottomBoundry = 660;
const leftBoundry = 2;
const rightBoundry = 428;

let enemyCarInterval = null;
let checkCollisionsInterval = null;
let gameActive = true;

// ------------------------------------------------Event Listeners----------------------------------------------------

document.addEventListener('keydown', (event) => {
    updateArrowKeys(event.key, true)
});

document.addEventListener('keyup', (event) => {
    updateArrowKeys(event.key, false)
});

// ------------------------------------------------Functions----------------------------------------------------------

// create enemy cars
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

// check position of enemy car and remove if off bottom of screen: code adapeted from ChatGPT
const checkPositionAndRemove = (enemyCar) => {
    
    const checkInterval = setInterval(() => {

        const topPosition = parseFloat(window.getComputedStyle(enemyCar).top);

        if (topPosition >= 700) {
            
            const road = document.getElementById('road');
            
            road.removeChild(enemyCar);
            
            clearInterval(checkInterval);  
        }
    
    }, 50);  

};

// set status of players key presses
function updateArrowKeys(key, status) {
    switch (key) {
        case 'ArrowUp':
            arrowUp = status;
            break;
        case 'ArrowDown':
            arrowDown = status;
            break;
        case 'ArrowLeft':
            arrowLeft = status;
            break;
        case 'ArrowRight':
            arrowRight = status;
            break;
        default:
            break;
    }
}

// move player's car when keys are true within the boundaries of the road
function move() {
    
    if (
        arrowUp 
        && arrowLeft 
        && y > topBoundry 
        && x > leftBoundry
    ) {
        y -= speed;
        x -= speed;
    } else if (
        arrowUp 
        && arrowRight 
        && y > topBoundry 
        && x < rightBoundry
    ) {
        y -= speed;
        x += speed;
    } else if (
        arrowDown 
        && arrowLeft 
        && x > leftBoundry 
        && y < bottomBoundry
    ) {
        y += speed;
        x -= speed;
    } else if (
        arrowDown 
        && arrowRight 
        && x < rightBoundry 
        && y < bottomBoundry
    ) {
        y += speed;
        x += speed;
    } else if (
        arrowUp 
        && y > topBoundry
    ){
        y -= speed;
    } else if (
        arrowDown 
        && y < bottomBoundry
    ){
        y += speed;
    } else if (
        arrowLeft 
        && x > leftBoundry
    ){
        x -= speed;
    } else if (
        arrowRight 
        && x < rightBoundry
    ){
        x += speed;
    }
    
    playerCar.style.top = y + 'px';
    playerCar.style.left = x + 'px';

    if (gameActive) requestAnimationFrame(move);
}

// Collision detection
const checkCollisions = () => {

    const playerRect = playerCar.getBoundingClientRect();
    const enemyCars = document.querySelectorAll('.enemyCar');
    
    enemyCars.forEach(enemyCar => {
        const enemyRect = enemyCar.getBoundingClientRect();
        
        if (
            playerRect.top < enemyRect.bottom 
            && playerRect.left < enemyRect.right
            && playerRect.right > enemyRect.left
            && playerRect.bottom > enemyRect.top 
        ) {
            // pause game
            enemyCars.forEach(enemyCar => {
                enemyCar.classList.add('pause-animation')
            })
            document.getElementById('lines-container-2').classList.add('pause-animation')
            document.getElementById('lines-container-3').classList.add('pause-animation')
            clearInterval(enemyCarInterval)
            clearInterval(checkCollisionsInterval)
            gameActive = false
        }
    });
};

const playGame = () => {
    
    // create enemy cars at a random x position every second
    enemyCarInterval = setInterval(createEnemyCars, 1000)
    
    // start player move loop
    requestAnimationFrame(move);
    
    // Periodically check for collisions
    checkCollisionsInterval = setInterval(checkCollisions, 10);
}

playGame()