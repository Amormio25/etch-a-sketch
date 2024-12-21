let chooseSize = document.querySelector("#size");
let confirmBtn = document.querySelector("#confirm");
let resetBtn = document.querySelector("#reset");
let switchBtn = document.querySelector("#switch");
let container = document.querySelector("#container");
let containerStyle = getComputedStyle(container);
let drawingStatus = document.querySelector("#drawing-status");
let gridSet = false;
let penDown = false;

function createGrid() {
    reset();
    let length = parseInt(chooseSize.value);
    let area = length * length;
    chooseSize.value = null;

    const squareLength = parseFloat(containerStyle.width) / length;
    if (length !== null && length >= 1 && 
                            length <= 100) {
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < area; i++) {
            let innerDiv = document.createElement("div");
            innerDiv.classList.add("gridDivs")
            innerDiv.style.width = 
                            `${squareLength}px`;
            innerDiv.style.height = 
                            `${squareLength}px`;
            innerDiv.style.opacity = 0;
            fragment.appendChild(innerDiv);
        }
        container.appendChild(fragment);
        gridSet = true;
    }
}

function reset() {
    container.innerHTML = '';
}

function eraseGrid() {
    let children = container.children;
    for (let i = 0; i < children.length; i++) {
        children[i].style.backgroundColor = "white";
        children[i].style.opacity = 0;
    }
}

function switchColors() {
    if (switchBtn.textContent === "Randomize") {
        switchBtn.textContent = "Black";
        switchBtn.style.backgroundColor = "black";
    } else {
        switchBtn.textContent = "Randomize";
        switchBtn.style.backgroundColor = "lightseagreen";
    }
}

function draw(event) {
    let opacity = event.target.style.opacity;
    if (gridSet && event.target.className === "gridDivs" && penDown) {
        if (switchBtn.textContent === "Randomize") {
            if (event.target.style.opacity == 0 ||
                            event.target.style.backgroundColor !== "white") {
                event.target.style.backgroundColor = "black";
            }
            event.target.style.opacity = parseFloat(opacity) + 0.1;
        } else {
            let randR = Math.floor(Math.random() * 253) + 1;
            let randG = Math.floor(Math.random() * 253) + 1;
            let randB = Math.floor(Math.random() * 253) + 1;
            
            if (event.target.style.opacity == 0 || 
                            event.target.style.backgroundColor === "black") {
                event.target.style.backgroundColor = 
                            `rgb(${randR}, ${randG}, ${randB})`;
            }
            event.target.style.opacity = parseFloat(opacity) + 0.1;
        }
    }   
}

function isDrawing(event) {
    if (gridSet) {
        penDown = !penDown;
        let opacity = event.target.style.opacity;
        if (penDown && switchBtn.textContent === "Randomize") {
            event.target.style.backgroundColor = "black";
            event.target.style.opacity = parseFloat(opacity) + 0.1;
        } else if (penDown && switchBtn.textContent === "black") {
            let randR = Math.floor(Math.random() * 253) + 1;
            let randG = Math.floor(Math.random() * 253) + 1;
            let randB = Math.floor(Math.random() * 253) + 1;

            event.target.style.backgroundColor = 
                            `rgb(${randR}, ${randG}, ${randB})`;
            event.target.style.opacity = parseFloat(opacity) + 0.1;
        }

        if (penDown) 
            drawingStatus.textContent = "Click to stop drawing!";
        else 
            drawingStatus.textContent = "Click to draw!";
    }
}

confirmBtn.addEventListener("click", createGrid);
resetBtn.addEventListener("click", eraseGrid);
switchBtn.addEventListener("click", switchColors);
container.addEventListener("mouseover", draw);
container.addEventListener("click", isDrawing);