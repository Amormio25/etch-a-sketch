let confirm_btn = document.querySelector("#confirm");
let reset_btn = document.querySelector("#reset");
let switch_btn = document.querySelector("#switch");
let container = document.querySelector("#container");
let container_style = getComputedStyle(container);
let drawing_status = document.querySelector("#drawing-status");
let pen_down = false;

function switch_colors() {
    if (switch_btn.textContent === "Randomize") {
        switch_btn.textContent = "Black";
        switch_btn.style.backgroundColor = "black";
    } else {
        switch_btn.textContent = "Randomize";
        switch_btn.style.backgroundColor = "lightseagreen";
    }
}

function draw(event) {
    if (event.target.className === "grid_divs" 
                                && switch_btn.textContent === "Randomize"
                                && pen_down) {
        event.target.style.backgroundColor = "black";
        let opacity = event.target.style.opacity;
        event.target.style.opacity = parseFloat(opacity) + 0.1;
    }
}

function is_drawing(event) {
    pen_down = !pen_down;
    event.target.style.backgroundColor = "black";
    let opacity = event.target.style.opacity;
    event.target.style.opacity = parseFloat(opacity) + 0.1;

    if (pen_down) 
        drawing_status.textContent = "Click to stop drawing!";
    else 
        drawing_status.textContent = "Click to draw!";
}

for (let i = 0; i < 100; i++) {
    let innerDiv = document.createElement("div");
    innerDiv.classList.add("grid_divs")
    innerDiv.style.width = `${parseFloat(container_style.width) / 10}px`;
    innerDiv.style.height = `${parseFloat(container_style.height) / 10}px`;
    innerDiv.style.opacity = 0;
    container.appendChild(innerDiv);
}

switch_btn.addEventListener("click", switch_colors);
container.addEventListener("mouseover", draw);
container.addEventListener("click", is_drawing);