class PlayerCar {
    
    private playerCarDivElement: HTMLDivElement;
    private playerCarX: number;
    private playerCarY: number;
    private speed: number = 3;
    private isPaused: boolean = false;
    
    private arrowUp: boolean = false;
    private arrowDown: boolean = false;
    private arrowLeft: boolean = false;
    private arrowRight: boolean = false;
    
    private readonly topBoundry: number = 4;
    private readonly bottomBoundry: number = 660;
    private readonly leftBoundry: number = 2;
    private readonly rightBoundry: number = 428;
        
    constructor(){
        this.playerCarDivElement = document.createElement('div');
        this.playerCarDivElement.setAttribute('id', 'playerCar');
        this.playerCarDivElement.setAttribute('class', 'car');
        document.querySelector('#road')!.appendChild(this.playerCarDivElement);
        
        this.playerCarX = parseInt(getComputedStyle(this.playerCarDivElement).left, 10);
        this.playerCarY = parseInt(getComputedStyle(this.playerCarDivElement).top, 10);
    };
    
    // Getter for playerCarDivElement
    public getPlayerCarDivElement(): HTMLDivElement {
        return this.playerCarDivElement
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
            this.arrowUp 
            && this.arrowLeft 
            && this.playerCarY > this.topBoundry 
            && this.playerCarX > this.leftBoundry
        ) {
            this.playerCarY -= this.speed;
            this.playerCarX -= this.speed;
        } else if (
            this.arrowUp 
            && this.arrowRight 
            && this.playerCarY > this.topBoundry 
            && this.playerCarX < this.rightBoundry
        ) {
            this.playerCarY -= this.speed;
            this.playerCarX += this.speed;
        } else if (
            this.arrowDown 
            && this.arrowLeft 
            && this.playerCarX > this.leftBoundry 
            && this.playerCarY < this.bottomBoundry
        ) {
            this.playerCarY += this.speed;
            this.playerCarX -= this.speed;
        } else if (
            this.arrowDown 
            && this.arrowRight 
            && this.playerCarX < this.rightBoundry 
            && this.playerCarY < this.bottomBoundry
        ) {
            this.playerCarY += this.speed;
            this.playerCarX += this.speed;
        } else if (
            this.arrowUp 
            && this.playerCarY > this.topBoundry
        ){
            this.playerCarY -= this.speed;
        } else if (
            this.arrowDown 
            && this.playerCarY < this.bottomBoundry
        ){
            this.playerCarY += this.speed;
        } else if (
            this.arrowLeft 
            && this.playerCarX > this.leftBoundry
        ){
            this.playerCarX -= this.speed;
        } else if (
            this.arrowRight 
            && this.playerCarX < this.rightBoundry
        ){
            this.playerCarX += this.speed;
        }
        
        this.playerCarDivElement.style.top = this.playerCarY + 'px';
        this.playerCarDivElement.style.left = this.playerCarX + 'px';

        requestAnimationFrame(() => this.move());
    }

    public pause(): void {
        this.isPaused = true;
    }
    
    public resume(): void {
        this.isPaused = false;
    }
    
    // Function to start player movement
    public startPlayerMovement = () => {
        
        document.addEventListener('keydown', (e) => {
            this.updateArrowKeys(e.key, true)
        });

        document.addEventListener('keyup', (e) => {
            this.updateArrowKeys(e.key, false)
        });

        requestAnimationFrame(() => this.move());
    }
}

export default PlayerCar;