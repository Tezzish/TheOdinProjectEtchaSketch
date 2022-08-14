const canvasContainer = document.getElementById("canvasContainer");
canvasContainer.style = "background-color: red;"

//gets the number of cells on each side of the canvas
let cells = prompt("How many pixels for each side");
//squares the number of cells on each side of the canvas to get the total number of cells
let nopixels = Math.pow(cells, 2);
//sets wh to the maximum width/height of the cells
let wh = 720/nopixels;

console.log(typeof(wh));
//turns wh into a string
wh = toString(wh);
console.log(typeof(wh));
console.log(wh);
let str = "background-color: blue; " + "min-width: " + wh + "; " + "min-height: " + wh + ";";
let columns;

for(var i = 0; i <cells; i++) {

}

for(var i=0; i<nopixels; i++) {
    const child = document.createElement("div");
    child.style= str;
    const list = child.classList;
    list.add("grid-item");
    child.textContent = i;
    canvasContainer.appendChild(child);
}
