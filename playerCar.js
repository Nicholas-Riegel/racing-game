const playerCar = document.getElementById('playerCar');
const computedStyle = getComputedStyle(playerCar);

let x = parseInt(computedStyle.left, 10);
let y = parseInt(computedStyle.top, 10);
const speed = 5;
let [arrowUp, arrowDown, arrowLeft, arrowRight] = [false, false, false, false]
let moving = false;

const topBoundry = 4;
const bottomBoundry = 660;
const leftBoundry = 2;
const rightBoundry = 428;

document.addEventListener('keydown', (event) => {
    moving = true;
    updateArrowKeys(event.key, true)
});

document.addEventListener('keyup', (event) => {
    moving = false;
    updateArrowKeys(event.key, false)
});

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
function move() {
    if (moving) {
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
    
        // Update car position
        playerCar.style.top = y + 'px';
        playerCar.style.left = x + 'px';

        // console.log(object);
    }

    requestAnimationFrame(move);
}

// Start the animation loop
requestAnimationFrame(move);
