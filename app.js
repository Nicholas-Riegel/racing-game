// -------------------------------------Constants & Variables--------------------------------------------

// Get the car element
const playerCar = document.getElementById('playerCar');

// Initial position
const computedStyle = getComputedStyle(playerCar);
// the 10 is the radix, base 10
let posX = parseInt(computedStyle.left, 10);
let posY = parseInt(computedStyle.top, 10);

// Arrow key initial states
let arrowUp = false;
let arrowDown = false;
let arrowLeft = false;
let arrowRight = false;

// boundaries
const topBoundry = -4;
const bottomBoundry = 661;
const leftBoundry = -2;
const rightBoundry = 428;

// car movement speed
const movementSpeed = 5;

// -------------------------------------Event Listeners--------------------------------------------------

// keystate true on keydown
document.addEventListener('keydown', function(event) {
  updateArrowKeys(event.key, true);
  moveCar();
});

// keystate false on keyup
document.addEventListener('keyup', function(event) {
  updateArrowKeys(event.key, false);
});

// -------------------------------------Functions--------------------------------------------------------

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
        posY -= movementSpeed;
        posX -= movementSpeed;
    } else if (arrowUp && arrowRight && posY > topBoundry && posX < rightBoundry) {
        posY -= movementSpeed;
        posX += movementSpeed;
    } else if (arrowDown && arrowLeft && posX > leftBoundry && posY < bottomBoundry) {
        posY += movementSpeed;
        posX -= movementSpeed;
    } else if (arrowDown && arrowRight && posX < rightBoundry && posY < bottomBoundry) {
        posY += movementSpeed;
        posX += movementSpeed;
    } else if (arrowUp && posY > topBoundry){
        posY -= movementSpeed;
    } else if (arrowDown && posY < bottomBoundry){
        posY += movementSpeed;
    } else if (arrowLeft && posX > leftBoundry){
        posX -= movementSpeed;
    } else if (arrowRight && posX < rightBoundry){
        posX += movementSpeed;
    }

    // Update car position
    playerCar.style.top = posY + 'px';
    playerCar.style.left = posX + 'px';
}

