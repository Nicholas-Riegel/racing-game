// Player car will be created when initializePlayer is called
let playerCar;
// get the starting position of the car
// getComputedStyle() gets the actual computed CSS values (e.g., "50px")
// parseInt() converts the string "50px" to the number 50 (base 10)
// These positions are relative to the #road container (top-left corner = 0,0)
// since the car has position: absolute and #road has position: relative
let playerCarX;
let playerCarY;
// Initialize player car after road is set up
export const initializePlayer = () => {
    playerCar = document.createElement('div');
    playerCar.setAttribute('id', 'playerCar');
    playerCar.setAttribute('class', 'car');
    document.querySelector('#road').appendChild(playerCar);
    playerCarX = parseInt(getComputedStyle(playerCar).left, 10);
    playerCarY = parseInt(getComputedStyle(playerCar).top, 10);
};
// set the speed of movement on keydowns
const speed = 3;
// arrow key activation
let [arrowUp, arrowDown, arrowLeft, arrowRight] = [false, false, false, false];
// game boundaries
// Top: 4px from top of road, Bottom: 660px from top of road
// Left: 2px from left of road, Right: 428px from left of road
const topBoundry = 4;
const bottomBoundry = 660;
const leftBoundry = 2;
const rightBoundry = 428;
document.addEventListener('keydown', (e) => {
    updateArrowKeys(e.key, true);
});
document.addEventListener('keyup', (e) => {
    updateArrowKeys(e.key, false);
});
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
    if (arrowUp
        && arrowLeft
        && playerCarY > topBoundry
        && playerCarX > leftBoundry) {
        playerCarY -= speed;
        playerCarX -= speed;
    }
    else if (arrowUp
        && arrowRight
        && playerCarY > topBoundry
        && playerCarX < rightBoundry) {
        playerCarY -= speed;
        playerCarX += speed;
    }
    else if (arrowDown
        && arrowLeft
        && playerCarX > leftBoundry
        && playerCarY < bottomBoundry) {
        playerCarY += speed;
        playerCarX -= speed;
    }
    else if (arrowDown
        && arrowRight
        && playerCarX < rightBoundry
        && playerCarY < bottomBoundry) {
        playerCarY += speed;
        playerCarX += speed;
    }
    else if (arrowUp
        && playerCarY > topBoundry) {
        playerCarY -= speed;
    }
    else if (arrowDown
        && playerCarY < bottomBoundry) {
        playerCarY += speed;
    }
    else if (arrowLeft
        && playerCarX > leftBoundry) {
        playerCarX -= speed;
    }
    else if (arrowRight
        && playerCarX < rightBoundry) {
        playerCarX += speed;
    }
    playerCar.style.top = playerCarY + 'px';
    playerCar.style.left = playerCarX + 'px';
    requestAnimationFrame(move);
}
// Function to start player movement
export const startPlayerMovement = () => {
    initializePlayer(); // Create player car first
    requestAnimationFrame(move);
};
export { playerCar };
