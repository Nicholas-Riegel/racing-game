class Road {
    constructor() {
        this.LINES_PER_CONTAINER = 4;
        this.linesContainerArray = document.querySelectorAll('#road > div');
        this.createLines();
    }
    createLines() {
        this.linesContainerArray.forEach(container => {
            for (let i = 0; i < this.LINES_PER_CONTAINER; i++) {
                const line = document.createElement('div');
                line.classList.add('lines');
                container.appendChild(line);
            }
        });
    }
    pauseAnimations() {
        document.getElementById('lines-container-2').classList.add('pause-animation');
        document.getElementById('lines-container-3').classList.add('pause-animation');
    }
}
export default Road;
