// Get the car element
// code for moving car gotten from ChatGPT: changed const name and id
const playerCar = document.getElementById('playerCar');

// Initial position
// asked gpt for computed x and y values instead of hardcoding it
const computedStyle = getComputedStyle(playerCar);

// the 10 is the radix, base 10
let posX = parseInt(computedStyle.left, 10);
let posY = parseInt(computedStyle.top, 10);

// Move the car function
// Arrow key states
let arrowUp = false;
let arrowDown = false;
let arrowLeft = false;
let arrowRight = false;

const topBoundry = -4;
const bottomBoundry = 661;
const leftBoundry = -2;
const rightBoundry = 428;

// Update arrow key states
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

function moveCar() {
    if (arrowUp && arrowLeft && posY > topBoundry && posX > leftBoundry) {
        posY -= 7;
        posX -= 7;
    } else if (arrowUp && arrowRight && posY > topBoundry && posX < rightBoundry) {
        posY -= 7;
        posX += 7;
    } else if (arrowDown && arrowLeft && posX > leftBoundry && posY < bottomBoundry) {
        posY += 7;
        posX -= 7;
    } else if (arrowDown && arrowRight && posX < rightBoundry && posY < bottomBoundry) {
        posY += 7;
        posX += 7;
    } else if (arrowUp && posY > topBoundry){
        posY -= 5;
    } else if (arrowDown && posY < bottomBoundry){
        posY += 5;
    } else if (arrowLeft && posX > leftBoundry){
        posX -= 5;
    } else if (arrowRight && posX < rightBoundry){
        posX += 5;
    }

    // Update car position
    playerCar.style.top = posY + 'px';
    playerCar.style.left = posX + 'px';
    // console.clear()
    // console.log("car posX:", computedStyle.left);
    // console.log("car posY:", computedStyle.top);
}

// Event listeners for keyboard arrow keys
document.addEventListener('keydown', function(event) {
    updateArrowKeys(event.key, true);
    moveCar();
});

document.addEventListener('keyup', function(event) {
    updateArrowKeys(event.key, false);
});