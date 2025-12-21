"use strict";
// create white lines
// #road > div selects all direct child div elements of the element with ID "road"
// This targets: lines-container-1, lines-container-2, and lines-container-3
const linesContainerArray = document.querySelectorAll('#road > div');
linesContainerArray.forEach(x => {
    for (let i = 0; i < 4; i++) {
        const line = document.createElement('div');
        line.classList.add('lines');
        x.appendChild(line);
    }
});
