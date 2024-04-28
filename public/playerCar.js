// while ChatGPT gave me the ideas for much of this code, as I do not know much about how to move divs in js (which is the main reason I wanted to do this project - in order to learn how to do it), ChatGPT's answers had to be heavily adapted and the answers from several queries combined to get the effect I wanted. The recursive use of the requestAnimationFrame function was key to getting the smooth movement of the player's car. 

// ------------------------------------------------Constants and variables--------------------------------------------

// get player car from html
const playerCar = document.getElementById('playerCar');

// get the computed style details for the car
const computedStyle = getComputedStyle(playerCar);

// get the starting position of the car
let x = parseInt(computedStyle.left, 10);
let y = parseInt(computedStyle.top, 10);

// set the speed of movement on keydowns
const speed = 5;

// arrow key activation
let [arrowUp, arrowDown, arrowLeft, arrowRight] = [false, false, false, false]

// game boundaries
const topBoundry = 4;
const bottomBoundry = 660;
const leftBoundry = 2;
const rightBoundry = 428;

// ------------------------------------------------Event Listeners----------------------------------------------------

document.addEventListener('keydown', (event) => {
    updateArrowKeys(event.key, true)
});

document.addEventListener('keyup', (event) => {
    updateArrowKeys(event.key, false)
});

// ------------------------------------------------Functions----------------------------------------------------------

// set status of keys
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

// move car when keys are true
function move() {
    
    if (arrowUp && arrowLeft && y > topBoundry && x > leftBoundry) {
        y -= speed;
        x -= speed;
    } else if (arrowUp && arrowRight && y > topBoundry && x < rightBoundry) {
        y -= speed;
        x += speed;
    } else if (arrowDown && arrowLeft && x > leftBoundry && y < bottomBoundry) {
        y += speed;
        x -= speed;
    } else if (arrowDown && arrowRight && x < rightBoundry && y < bottomBoundry) {
        y += speed;
        x += speed;
    } else if (arrowUp && y > topBoundry){
        y -= speed;
    } else if (arrowDown && y < bottomBoundry){
        y += speed;
    } else if (arrowLeft && x > leftBoundry){
        x -= speed;
    } else if (arrowRight && x < rightBoundry){
        x += speed;
    }
    
    playerCar.style.top = y + 'px';
    playerCar.style.left = x + 'px';

    requestAnimationFrame(move);
}

requestAnimationFrame(move);
