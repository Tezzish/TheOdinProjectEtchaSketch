class Canvas{

    //constructor
    //takes the number of pixels each side as a parameter
    constructor(pix){
        //holds the canvas
        this.holder = document.getElementById("papa");
        if(this.holder.hasChildNodes()){
            this.holder.removeChild(this.holder.firstChild);
        }
        //creates the canvas element
        this.canvasContainer = document.createElement("div");
        this.canvasContainer.className = "grid-container";
        this.canvasContainer.id = "canvasContainer";
        //appends the canvas to the holder
        this.holder.appendChild(this.canvasContainer);
        //gets the body element
        this.body = document.getElementsByTagName("body").item(0);
        //gets the eraser button
        this.eraser = document.getElementById("eraser");
        //gets the reset button
        this.resetb = document.getElementById("reset");
        //number of cells on each side
        this.cells = pix;
        //sets the mouse boolean to false because it is currently not being clicked
        this.mousebool = false;
        //used for the eraser function
        this.prev_colour = "black";
        this.colour = "black";
        this.eraserBool = false;
        this.divs;
    }

    //sets up the canvas with the buttons 
    setUp(){

        //checks if the mouse is pressed on the body and allows the user to draw

        //starts drawing if the mouse button is pressed
        this.canvasContainer.addEventListener("mousedown", () => {
            this.mousebool = true;
            console.log("started");
            event.preventDefault();
        });

        //stops drawing if the mouse button is not pressed
        this.canvasContainer.addEventListener("mouseup", () => {
            this.mousebool = false;
            console.log("ended");
        });
    
        //eraser logic for the button
        this.eraser.onclick = () => {
            if(this.eraserBool){
                this.colour = this.prev_colour;
                this.eraserBool = !this.eraserBool;
            }
            else{
                this.colour = "white";
                this.eraserBool = !this.eraserBool;
            }
        }

        //squares the number to get the total number of cells in the canvas
        let nocells = Math.pow(this.cells, 2);

        //creates the cells of the canvas 
        for(var i=0; i<nocells; i++) {
            const child = document.createElement("div");
            const list = child.classList;
            list.add("grid-item");
            let id = "item" + i;
            child.id = id;
            canvasContainer.appendChild(child);
        }

        //arranges the cells in the canvas
        let auto = "";
        for(var i = 0; i < this.cells; i++){
            if(i == this.cells-1){
                auto += "auto";
            }
            else{
                auto += "auto ";
            }
        }
        //makes the cells in the canvas arrange into a square
        canvasContainer.style.gridTemplateColumns = auto;

        this.resetb.onclick = ()=>{
            let yn = prompt("Are you sure you want to reset? (yes/no)");
            yn = yn.toLowerCase();
            if(yn == "yes" || yn == "y"){
                this.reset();
            }
        }
        //sets up the cells in the canvas
        this.divsSetUp();
    }

    //adds the function to draw to the cells
    divsSetUp(){
        this.divs = document.querySelectorAll("div.grid-item");
    
        this.divs.forEach((child)=>{
            child.addEventListener("mouseover", () =>{
                if(this.mousebool){
                    child.style.backgroundColor = this.colour;
                } 
            })
            child.addEventListener("mousedown", () =>{
                child.style.backgroundColor = this.colour;
            });
        });
    }

    //resets the canvas to white
    reset(){
        this.divs.forEach((child)=>{
            child.style.backgroundColor = "white";
        })
    }
}

class canvasHandler{
    
    //empty constructor
    constructor(){
        console.log(document.getElementsByClassName("slider").item(0));
        this.slider = document.getElementsByClassName("slider").item(0);
        this.slider.oninput = () => {
            this.handleCanvas(this.slider.value);
        }
        this.pixelCount = document.getElementById("pixelCount");
    }

    //function that initializes the canvas
    handleCanvas(pix){
        let canvas = new Canvas(pix);
        canvas.setUp();
        canvas.reset();
        this.updatePixels();
    }

    updatePixels(){
        let str = this.slider.value + " x " + this.slider.value;
        this.pixelCount.textContent = str;
    }
}

//this part acts as the main
let c = new canvasHandler();
//the default size is 16
c.handleCanvas(16);