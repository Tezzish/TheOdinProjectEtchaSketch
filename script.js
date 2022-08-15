//all the elements that we need for now
const canvasContainer = document.getElementById("canvasContainer");
const bodyarr = document.getElementsByTagName("body");
const body = bodyarr.item(0);
const eraser = document.getElementById("eraser");
const resetb = document.getElementById("reset");

//checks if the mouse is pressed on the body and allows the user to draw
let mousebool = false;

body.addEventListener("mousedown", () => {
    mousebool = true;
    console.log("started");
    event.preventDefault();
});
body.addEventListener("mouseup", () => {
    mousebool = false;
    console.log("ended");
});


//used for the erase to allow it to be toggled
let prev_colour = "black";
let colour = "black";
let eraserBool = false;

//gets the number of cells on each side of the canvas
let cells = 16;
//squares the number of cells on each side of the canvas to get the total number of cells
let nocells = Math.pow(cells, 2);
//sets wh to the maximum width/height of the cells
let wh = 720/nocells;

//eraser for the cells

eraser.onclick = () => {
    if(eraserBool){
        colour = prev_colour;
        eraserBool = !eraserBool;
    }
    else{
        colour = "white";
        eraserBool = !eraserBool;
    }
}

//arranges the cells in the canvas
let auto = "";

for(var i = 0; i < cells; i++){
    if(i == cells-1){
        auto += "auto";
    }
    else{
        auto += "auto ";
    }
}

canvasContainer.style.gridTemplateColumns = auto;

//creates the cells of the canvas 
for(var i=0; i<nocells; i++) {
    const child = document.createElement("div");
    const list = child.classList;
    list.add("grid-item");
    let id = "item" + i;
    child.id = id;
    canvasContainer.appendChild(child);
}

const divs = document.querySelectorAll("div.grid-item");

divs.forEach((child)=>{
    child.addEventListener("mouseover", () =>{
        if(mousebool){
            console.log("should be working");
            child.style.backgroundColor = colour;
        }
    })
    child.addEventListener("mousedown", () =>{
        child.style.backgroundColor = colour;
    });
})

function reset(){
    divs.forEach((child)=>{
        child.style.backgroundColor = "white";
    })
}

resetb.onclick = ()=>{
    let yn = prompt("Are you sure you want to reset? (yes/no)");
    yn = yn.toLowerCase();
    if(yn == "yes" || yn == "y"){
        reset();
    }
}