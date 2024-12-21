let confirm_btn = document.querySelector("#confirm");
let reset_btn = document.querySelector("#reset");
let switch_btn = document.querySelector("#switch");
let container = document.querySelector("#container");
let container_style = getComputedStyle(container);
let drawing_status = document.querySelector("#drawing-status");
let pen_down = false;

function reset() {
    let children = container.children;
    for (let i = 0; i < children.length; i++) {
        children[i].style.backgroundColor = "white";
        children[i].style.opacity = 0;
    }
}

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
    let opacity = event.target.style.opacity;
    if (event.target.className === "grid_divs" && pen_down) {
        if (switch_btn.textContent === "Randomize") {
            if (event.target.style.opacity == 0 ||
                            event.target.style.backgroundColor !== "white") {
                event.target.style.backgroundColor = "black";
            }
            event.target.style.opacity = parseFloat(opacity) + 0.1;
        } else {
            let rand_r = Math.floor(Math.random() * 253) + 1;
            let rand_g = Math.floor(Math.random() * 253) + 1;
            let rand_b = Math.floor(Math.random() * 253) + 1;
            
            if (event.target.style.opacity == 0 || 
                            event.target.style.backgroundColor === "black") {
                event.target.style.backgroundColor = 
                                    `rgb(${rand_r}, ${rand_g}, ${rand_b})`;
            }
            event.target.style.opacity = parseFloat(opacity) + 0.1;
        }
    }   
}

function is_drawing(event) {
    pen_down = !pen_down;
    let opacity = event.target.style.opacity;
    if (pen_down && switch_btn.textContent === "Randomize") {
        event.target.style.backgroundColor = "black";
        event.target.style.opacity = parseFloat(opacity) + 0.1;
    } else if (pen_down && switch_btn.textContent === "black") {
        let rand_r = Math.floor(Math.random() * 253) + 1;
        let rand_g = Math.floor(Math.random() * 253) + 1;
        let rand_b = Math.floor(Math.random() * 253) + 1;

        event.target.style.backgroundColor = 
                                `rgb(${rand_r}, ${rand_g}, ${rand_b})`;
        event.target.style.opacity = parseFloat(opacity) + 0.1;
    }

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

reset_btn.addEventListener("click", reset);
switch_btn.addEventListener("click", switch_colors);
container.addEventListener("mouseover", draw);
container.addEventListener("click", is_drawing);