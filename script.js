let confirmBtn = document.querySelector("#confirm");
let resetBtn = document.querySelector("#reset");
let switchBtn = document.querySelector("#switch");
let container = document.querySelector("#container");
let containerStyle = getComputedStyle(container);
let drawingStatus = document.querySelector("#drawing-status");
let penDown = false;

function reset() {
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
    if (event.target.className === "gridDivs" && penDown) {
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

for (let i = 0; i < 100; i++) {
    let innerDiv = document.createElement("div");
    innerDiv.classList.add("gridDivs")
    innerDiv.style.width = `${parseFloat(containerStyle.width) / 10}px`;
    innerDiv.style.height = `${parseFloat(containerStyle.height) / 10}px`;
    innerDiv.style.opacity = 0;
    container.appendChild(innerDiv);
}

resetBtn.addEventListener("click", reset);
switchBtn.addEventListener("click", switchColors);
container.addEventListener("mouseover", draw);
container.addEventListener("click", isDrawing);