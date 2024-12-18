// create variables for html elements with qSelector

// reset should simply reset grid to white, but not remove grid size
// randomize should switch text each time from randomize to black

// grid
// allow only up to 100x100 grid
// for num in input, create nxn grid after confirming
//      doesn't do anything if input is null
// should color on hover
// after hovering off and hovering back on, it shouldn't
// change to random color, it should remain but get darker (more opacity)
// until it becomes black (10 hovers)

let confirm_btn = document.querySelector("#confirm");
let reset_btn = document.querySelector("#reset");
let switch_btn = document.querySelector("#switch");

function switch_colors() {
    if (switch_btn.textContent == "Randomize") {
        switch_btn.textContent = "Black";
        switch_btn.style.backgroundColor = "black";
    } else {
        switch_btn.textContent = "Randomize"
        switch_btn.style.backgroundColor = "lightseagreen";
    }
}

// function button_hover() {

// }
switch_btn.addEventListener("click", switch_colors);
