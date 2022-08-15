const canvasContainer = document.getElementById("canvasContainer");

let prev_colour = "black";
let colour = "black";

let eraserBool = false;

//gets the number of cells on each side of the canvas
let cells = prompt("How many pixels for each side");
//squares the number of cells on each side of the canvas to get the total number of cells
let nocells = Math.pow(cells, 2);
//sets wh to the maximum width/height of the cells
let wh = 720/nocells;

//eraser for the cells
const eraser = document.getElementById("eraser");

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

//turns wh into a string
wh = toString(wh);
let str = "background-color: white; " + "min-width: " + wh + "; " + "min-height: " + wh + ";";

let auto = "";

for(var i = 0; i < cells; i++){
    if(i == cells-1){
        auto += "auto";
    }
    else{
        auto += "auto ";
    }
}

console.log(auto);

canvasContainer.style.gridTemplateColumns = auto;

//creates the cells of the canvas 
for(var i=0; i<nocells; i++) {
    const child = document.createElement("div");
    child.style.cssText += str;
    const list = child.classList;
    list.add("grid-item");
    let id = "item" + i;
    child.id = id;
    canvasContainer.appendChild(child);
}



const divs = document.querySelectorAll("div.grid-item");

divs.forEach((child)=>{
    child.addEventListener("mousedown", () =>{
        child.style.backgroundColor = colour;
    })
})
