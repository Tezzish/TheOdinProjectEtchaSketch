class Canvas{

    //constructor
    //takes the number of pixels each side as a parameter
    constructor(pix){
        //gets the canvas element
        this.canvasContainer = document.getElementById("canvasContainer");
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
        this.body.addEventListener("mousedown", () => {
            this.mousebool = true;
            console.log("started");
            event.preventDefault();
        });

        //stops drawing if the mouse button is not pressed
        this.body.addEventListener("mouseup", () => {
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
        canvasContainer.style.gridTemplateColumns = auto;

        this.resetb.onclick = ()=>{
            let yn = prompt("Are you sure you want to reset? (yes/no)");
            yn = yn.toLowerCase();
            if(yn == "yes" || yn == "y"){
                this.reset();
            }
        }

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

let canvas = new Canvas(16);
canvas.setUp();