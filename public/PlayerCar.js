class PlayerCar {
    constructor() {
        this.speed = 3;
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
        this.playerCar = document.createElement('div');
        this.playerCar.setAttribute('id', 'playerCar');
        this.playerCar.setAttribute('class', 'car');
        document.querySelector('#road').appendChild(this.playerCar);
        this.playerCarX = parseInt(getComputedStyle(this.playerCar).left, 10);
        this.playerCarY = parseInt(getComputedStyle(this.playerCar).top, 10);
    }
    ;
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
        this.playerCar.style.top = this.playerCarY + 'px';
        this.playerCar.style.left = this.playerCarX + 'px';
        requestAnimationFrame(() => this.move());
    }
    getBoundingClientRect() {
        return this.playerCar.getBoundingClientRect();
    }
}
export default PlayerCar;
