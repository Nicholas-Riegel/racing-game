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
    if (arrowUp && arrowLeft && posY > -4 && posX > -2) {
        posY -= 7;
        posX -= 7;
    } else if (arrowUp && arrowRight && posY > -4 && posX < 428) {
        posY -= 7;
        posX += 7;
    } else if (arrowDown && arrowLeft && posX > -2 && posY < 661) {
        posY += 7;
        posX -= 7;
    } else if (arrowDown && arrowRight && posX < 428 && posY < 661) {
        posY += 7;
        posX += 7;
    } else if (arrowUp && posY > -4){
        posY -= 5;
    } else if (arrowDown && posY < 661){
        posY += 5;
    } else if (arrowLeft && posX > -2){
        posX -= 5;
    } else if (arrowRight && posX < 428){
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

// Event listener for keyboard arrow keys
// document.addEventListener('keydown', function(event) {
//   moveCar(event.key);
// });
