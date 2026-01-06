class PlayerCar {
    
    private playerCarDiv: HTMLDivElement;
    private playerCarLeft: number;
    private playerCarTop: number;
    private speed: number = 4;
    private isPaused: boolean = false;
    
    private arrowUp: boolean = false;
    private arrowDown: boolean = false;
    private arrowLeft: boolean = false;
    private arrowRight: boolean = false;
    
    private readonly topBoundry: number = 4;
    private readonly bottomBoundry: number = 640;
    private readonly leftBoundry: number = 2;
    private readonly rightBoundry: number = 420;
        
    constructor(){
        this.playerCarDiv = document.createElement('div');
        this.playerCarDiv.setAttribute('id', 'playerCar');
        this.playerCarDiv.setAttribute('class', 'car');
        document.querySelector('#road')!.appendChild(this.playerCarDiv);
        this.playerCarLeft = parseInt(getComputedStyle(this.playerCarDiv).left, 10);
        this.playerCarTop = parseInt(getComputedStyle(this.playerCarDiv).top, 10);
    };
    
    // Getter for playerCarDiv
    public getPlayerCarDivElement(): HTMLDivElement {
        return this.playerCarDiv
    }

    public updateArrowKeys(key: string, status: boolean): void {
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
    public move(): void {
        
        if (this.isPaused) {
            return;
        }
        
        if (
            this.arrowUp && this.arrowLeft 
            && this.playerCarTop > this.topBoundry 
            && this.playerCarLeft > this.leftBoundry
        ) {
            this.playerCarTop -= this.speed;
            this.playerCarLeft -= this.speed;
        } else if (
            this.arrowUp && this.arrowRight 
            && this.playerCarTop > this.topBoundry 
            && this.playerCarLeft < this.rightBoundry
        ) {
            this.playerCarTop -= this.speed;
            this.playerCarLeft += this.speed;
        } else if (
            this.arrowDown && this.arrowLeft 
            && this.playerCarLeft > this.leftBoundry 
            && this.playerCarTop < this.bottomBoundry
        ) {
            this.playerCarTop += this.speed;
            this.playerCarLeft -= this.speed;
        } else if (
            this.arrowDown && this.arrowRight 
            && this.playerCarLeft < this.rightBoundry 
            && this.playerCarTop < this.bottomBoundry
        ) {
            this.playerCarTop += this.speed;
            this.playerCarLeft += this.speed;
        } else if (
            this.arrowUp 
            && this.playerCarTop > this.topBoundry
        ){
            this.playerCarTop -= this.speed;
        } else if (
            this.arrowDown 
            && this.playerCarTop < this.bottomBoundry
        ){
            this.playerCarTop += this.speed;
        } else if (
            this.arrowLeft 
            && this.playerCarLeft > this.leftBoundry
        ){
            this.playerCarLeft -= this.speed;
        } else if (
            this.arrowRight 
            && this.playerCarLeft < this.rightBoundry
        ){
            this.playerCarLeft += this.speed;
        }
        
        this.playerCarDiv.style.top = this.playerCarTop + 'px';
        this.playerCarDiv.style.left = this.playerCarLeft + 'px';

        // Arrow function preserves 'this' binding - without it, 'this' would be undefined
        // when requestAnimationFrame calls the function later
        requestAnimationFrame(() => this.move());
    }

    public pause(): void {
        this.isPaused = true;
    }
    
    public resume(): void {
        this.isPaused = false;
    }
    
    private keydownHandler = (e: KeyboardEvent) => {
        this.updateArrowKeys(e.key, true);
    };

    private keyupHandler = (e: KeyboardEvent) => {
        this.updateArrowKeys(e.key, false);
    };

    // Update the startPlayerMovement method:
    public startPlayerMovement = () => {
        document.addEventListener('keydown', this.keydownHandler);
        document.addEventListener('keyup', this.keyupHandler);
        requestAnimationFrame(() => this.move());
    }

    // Add the cleanup method:
    public cleanup(): void {
        console.log('Cleaning up PlayerCar...');
        
        // Stop the animation loop
        this.pause();
        
        // Remove event listeners using the stored function references
        document.removeEventListener('keydown', this.keydownHandler);
        document.removeEventListener('keyup', this.keyupHandler);
        
        // Remove DOM element (though Race.cleanup() will also do this)
        if (this.playerCarDiv && this.playerCarDiv.parentNode) {
            this.playerCarDiv.remove();
        }
        
        console.log('PlayerCar cleanup complete');
    }
}

export default PlayerCar;