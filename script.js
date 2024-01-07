//Creates the canvas element with the cells
class Canvas{

    //constructor
    //takes the number of pixels each side as a parameter
    constructor(pix){
        //holds the canvas
        this.holder = document.getElementById("papa");
        //deletes any previous canvases in the big div
        if(this.holder.hasChildNodes()){
            //removes the last child since the holder can't have more than one child already
            //and the canvas is held in the last child of the nodelist
            this.holder.removeChild(this.holder.lastChild);
        }
        //creates the canvas element
        this.canvasContainer = document.createElement("div");
        //takes on the class grid container
        this.canvasContainer.className = "grid-container";
        //takes on the id canvasContainer
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
        //true if eraser mode is enabled
        this.eraserBool = false;
        //the HTMLCollection for the cells that gets defined in the divsSetUp
        this.divs;
        //colour picker
        this.colourPicker = document.getElementById("colourPicker");
        //rainbow mode button
        this.rainbowButton = document.getElementById("rainbowButton");
        //rainbow boolean which is true if rainbow mode is active and false if it isn't
        this.rainbowBool = false;
        //to go back to rainbow mode after the eraser is used
        this.erBool = false;
    }

    //sets up the canvas with the buttons 
    setUp(){

        //checks if the mouse is pressed on the body and allows the user to draw
        //starts drawing if the mouse button is pressed
        this.canvasContainer.addEventListener("mousedown", () => {
            this.mousebool = true;
            event.preventDefault();
        });

        //stops drawing if the mouse button is not pressed
        this.canvasContainer.addEventListener("mouseup", () => {
            this.mousebool = false;
        });
    
        //eraser logic for the button
        this.eraser.onclick = () => {
            //if the eraser mode was already on
            if(this.eraserBool){
                this.colour = this.prev_colour; //changes the colour back to the previous colour
                this.eraserBool = false; //turns off the eraser mode
                if(this.erBool){ //checks if the rainbow mode was on before the eraser mode was turned on
                    this.rainbowBool = true;
                }
                else{
                    this.rainbowBool = false;
                }
                this.erBool = false; 
            }

            //eraser mode turned on
            else{
                if(this.rainbowBool) {
                    //rainbow mode is turned off for the moment
                    this.rainbowBool = !this.rainbowBool;
                    //makes sure the rainbow mode is turned on after the eraser mode is turned off
                    this.erBool = true;
                }
                this.colour = "white";
                this.eraserBool = true;
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
            try{
                yn = yn.toLowerCase();
                if(yn == "yes" || yn == "y"){
                    this.reset();
                }
            }
            catch(err){
                console.log("User cancelled the prompt");
            }
        }
        //sets up the cells in the canvas
        this.divsSetUp();

        this.colourPicker.onchange = () => {
            this.colour = this.colourPicker.value;
        }

        this.rainbowStyle();

        //the colour turns into a random colour
        this.rainbowButton.onclick = () => {
            this.rainbowBool = !this.rainbowBool;
            this.erBool = false;
        }
    }

    //adds the function to draw to the cells
    divsSetUp(){
        this.divs = document.querySelectorAll("div.grid-item");
    
        this.divs.forEach((child)=>{
            child.addEventListener("mouseover", () =>{
                if(this.mousebool){
                    if(this.rainbowBool){
                        let randcolour = Math.floor(Math.random() * 16777215);
                        randcolour = randcolour.toString(16);
                        randcolour = "#" + randcolour;
                        child.style.backgroundColor = randcolour;
                    }
                    else{
                        child.style.backgroundColor = this.colour;
                    }
                } 
            })
            child.addEventListener("mousedown", () =>{
                if(this.rainbowBool){
                    let randcolour = Math.floor(Math.random() * 16777215);
                    randcolour = randcolour.toString(16);
                    randcolour = "#" + randcolour;
                    child.style.backgroundColor = randcolour;
                }
                else{
                    child.style.backgroundColor = this.colour;
                }
            });
        });
    }

    //resets the canvas to white
    reset(){
        this.divs.forEach((child)=>{
            child.style.backgroundColor = "white";
        })
        this.rainbowBool = false;
    }

    rainbowStyle(){
        const colours = ["red", "orange", "yellow", "green", "blue", "indigo", "violet", "pink"];
        let rainbowText = document.getElementsByClassName("rainbow").item(0).children;
        for(var i = 0; i < rainbowText.length; i++){
            let index = i % colours.length;
            rainbowText.item(i).style.color = colours[index];
        }

    }
}

//creates canvases when changing the size
class canvasHandler{
    
    //empty constructor
    constructor(){
        //the slider element
        this.slider = document.getElementsByClassName("slider").item(0);
        //initializes the canvas with the value in the slider
        this.slider.oninput = () => {
            this.handleCanvas(this.slider.value);
        }
        //the text element for the slider
        this.pixelCount = document.getElementById("pixelCount");
    }

    //function that initializes the canvas
    handleCanvas(pix){
        let canvas = new Canvas(pix);
        canvas.setUp();
        canvas.reset();
        this.updatePixels();
    }

    //updates the text for the slider
    updatePixels(){
        let str = this.slider.value + " x " + this.slider.value;
        this.pixelCount.textContent = str;
    }
}

//this part acts as the main
let c = new canvasHandler();
//the default size is 16
c.handleCanvas(16);