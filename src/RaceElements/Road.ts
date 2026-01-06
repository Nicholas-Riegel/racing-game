class Road {

    private linesContainerArray: NodeListOf<Element>;
    private readonly LINES_PER_CONTAINER = 4;

    constructor() {
        this.linesContainerArray = document.querySelectorAll('#road > div');
        this.createLines();
    }

    private createLines(): void {
        this.linesContainerArray.forEach(container => {
            for (let i = 0; i < this.LINES_PER_CONTAINER; i++) {
                const line = document.createElement('div');
                line.classList.add('lines');
                container.appendChild(line);
            }
        });
    }

    public resetLines(): void {
        // Could add methods to reset/modify road
    }

    public pauseAnimations(): void {
        document.getElementById('lines-container-2')!.classList.add('pause-animation');
        document.getElementById('lines-container-3')!.classList.add('pause-animation');
    }
}

export default Road;