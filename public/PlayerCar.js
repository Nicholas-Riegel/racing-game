class PlayerCar {
    constructor() {
        this.speed = 3;
        this.isPaused = false;
        this.arrowUp = false;
        this.arrowDown = false;
        this.arrowLeft = false;
        this.arrowRight = false;
        this.topBoundry = 4;
        this.bottomBoundry = 660;
        this.leftBoundry = 2;
        this.rightBoundry = 428;
        // Function to start player movement
        this.startPlayerMovement = () => {
            document.addEventListener('keydown', (e) => {
                this.updateArrowKeys(e.key, true);
            });
            document.addEventListener('keyup', (e) => {
                this.updateArrowKeys(e.key, false);
            });
            requestAnimationFrame(() => this.move());
        };
        this.playerCarDivElement = document.createElement('div');
        this.playerCarDivElement.setAttribute('id', 'playerCar');
        this.playerCarDivElement.setAttribute('class', 'car');
        document.querySelector('#road').appendChild(this.playerCarDivElement);
        this.playerCarX = parseInt(getComputedStyle(this.playerCarDivElement).left, 10);
        this.playerCarY = parseInt(getComputedStyle(this.playerCarDivElement).top, 10);
    }
    ;
    // Getter for playerCarDivElement
    getPlayerCarDivElement() {
        return this.playerCarDivElement;
    }
    updateArrowKeys(key, status) {
        switch (key) {
            case 'ArrowUp':
                this.arrowUp = status;
                break;
            case 'ArrowDown':
                this.arrowDown = status;
                break;
            case 'ArrowLeft':
                this.arrowLeft = status;
                break;
            case 'ArrowRight':
                this.arrowRight = status;
                break;
            default:
                break;
        }
    }
    // move player's car when keys are true within the boundaries of the road
    move() {
        if (this.isPaused) {
            return;
        }
        if (this.arrowUp
            && this.arrowLeft
            && this.playerCarY > this.topBoundry
            && this.playerCarX > this.leftBoundry) {
            this.playerCarY -= this.speed;
            this.playerCarX -= this.speed;
        }
        else if (this.arrowUp
            && this.arrowRight
            && this.playerCarY > this.topBoundry
            && this.playerCarX < this.rightBoundry) {
            this.playerCarY -= this.speed;
            this.playerCarX += this.speed;
        }
        else if (this.arrowDown
            && this.arrowLeft
            && this.playerCarX > this.leftBoundry
            && this.playerCarY < this.bottomBoundry) {
            this.playerCarY += this.speed;
            this.playerCarX -= this.speed;
        }
        else if (this.arrowDown
            && this.arrowRight
            && this.playerCarX < this.rightBoundry
            && this.playerCarY < this.bottomBoundry) {
            this.playerCarY += this.speed;
            this.playerCarX += this.speed;
        }
        else if (this.arrowUp
            && this.playerCarY > this.topBoundry) {
            this.playerCarY -= this.speed;
        }
        else if (this.arrowDown
            && this.playerCarY < this.bottomBoundry) {
            this.playerCarY += this.speed;
        }
        else if (this.arrowLeft
            && this.playerCarX > this.leftBoundry) {
            this.playerCarX -= this.speed;
        }
        else if (this.arrowRight
            && this.playerCarX < this.rightBoundry) {
            this.playerCarX += this.speed;
        }
        this.playerCarDivElement.style.top = this.playerCarY + 'px';
        this.playerCarDivElement.style.left = this.playerCarX + 'px';
        requestAnimationFrame(() => this.move());
    }
    pause() {
        this.isPaused = true;
    }
    resume() {
        this.isPaused = false;
    }
}
export default PlayerCar;
