//Get canvas
let cvs = document.getElementById("interactive-text");

//If there is no canvas, get the <int-text> tag
if (cvs == null || undefined) {
	//All of the tags, get the first
    let allOfThem = document.getElementsByTagName("int-text")
    let item = allOfThem.item(0);
	
	//Create canvas inside it
    item.innerHTML = "<canvas id=\"interactive-text\">"
	
	//Get canvas
    let ccvs = item.children[0];
	
	//Set all of the attributes
    ccvs.setAttribute("width", item.getAttribute("width") || "320");
    ccvs.setAttribute("height", item.getAttribute("height") || "320");
    ccvs.setAttribute("text", item.getAttribute("text") || "A");
    ccvs.setAttribute("font-size", item.getAttribute("font-size") || "12");
    ccvs.setAttribute("color", item.getAttribute("color") || "#ffffff");
    ccvs.setAttribute("color-h", item.getAttribute("color-h") || "#8934f9");
	
	//Re-get canvas
    cvs = document.getElementById("interactive-text");
}
//Canvas Context
const ctx = cvs.getContext("2d");

//All of the particles
let particleArray = [];

//Add paramters
if (cvs.getAttribute("text") == null || undefined) {
    cvs.setAttribute("text", "A");
}
if (cvs.getAttribute("font-size") == null || undefined) {
    cvs.setAttribute("font-size", "12");
}
if (cvs.getAttribute("color") == null || undefined) {
    cvs.setAttribute("color", "#ffffff");
}
if (cvs.getAttribute("color-h") == null || undefined) {
    cvs.setAttribute("color-h", "#8934f9");
}

//Mouse (for the cool effect)
const mouse = {
    x: null,
    y: null,
    radius: 200
};

//Set mouse!
window.addEventListener("mousemove", function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

//Draw the text, then get the pixel coordinates (and then delete the text)
ctx.font = "30px Verdana";
ctx.fillText(cvs.getAttribute("text"), 0, 30);
const txtCoord = ctx.getImageData(0, 0, cvs.width, cvs.height);

//Particle ES6 Class
class Particle {
    constructor(x, y) {
		//Set the position
        this.x = x + 100;
        this.y = y;
		
		//Particle size and base
        this.size = 3;
        this.baseX = this.x;
        this.baseY = this.y;
		
		//Density
        this.density = (Math.random() * 30) + 1;
		//Color given by the Canvas
        this.color = cvs.getAttribute("color");
    }
	
	//Draw the particle
    draw() {
		//Set the color to the color
        ctx.fillStyle = this.color;
		
		//Create a circle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
		//Draw it
        ctx.fill();
    }
    update() {
		//The Effect Working!
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        let fdirX = dx / dist;
        let fdirY = dy / dist;
        let maxDist = mouse.radius;
        let f = (maxDist - dist) / maxDist;
        let dirX = fdirX * f * this.density;
        let dirY = fdirY * f * this.density;
        if(dist < mouse.radius) {
            this.color = cvs.getAttribute("color-h");
            this.x -= dirX;
            this.y -= dirY;
        } else {
            if (this.color !== cvs.getAttribute("color"))
                this.color = cvs.getAttribute("color");
            if(this.x !== this.baseX) {
                let dx = this.x - this.baseX;
                this.x -= dx/10;
            }
            if(this.y !== this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy/10;
            }
        }
    }
}

function init() {
	//Initiate all particles with right positions and font size
    particleArray = [];
    for(let y = 0, y2 = txtCoord.height; y < y2; y++) {
        for(let x = 0, x2 = txtCoord.width; x < x2; x++) {
            if(txtCoord.data[(y * 4 * txtCoord.width) + (x * 4) + 3] > 128) {
                let posX = x;
                let posY = y;
                particleArray.push(new Particle(posX * parseInt(cvs.getAttribute("font-size")), posY * parseInt(cvs.getAttribute("font-size"))));
            }
        }
    }
}
init();

function animate() {
	//Clear the canvas
    ctx.clearRect(0, 0, cvs.width, cvs.height);
	
	//Draw and update particles
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].draw();
        particleArray[i].update();
    }
	
	//Connect then (constellation) if it is possible
    connect();
	
	//Loop the thing
    requestAnimationFrame(animate);
}

function connect() {
	//It is 7? If it is, make the constellation!
    if(parseInt(cvs.getAttribute("font-size")) >= 7) {
		//Looks complicated
        for (let a = 0; a < particleArray.length; a++) {
            for (let b = a; b < particleArray.length; b++) {
				//Calculate distance
                let dx = particleArray[a].x - particleArray[b].x;
                let dy = particleArray[a].y - particleArray[b].y;
                let dist = Math.sqrt(dx * dx + dy * dy);
				//Check the distance (if the distance is good for the font size + 10
                if(dist < parseInt(cvs.getAttribute("font-size")) + 10) 
					//Actually draw the lines/stars
                    ctx.strokeStyle = particleArray[a].color;
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(particleArray[a].x, particleArray[a].y);
                    ctx.lineTo(particleArray[b].x, particleArray[b].y);
                    ctx.closePath();
                    ctx.stroke();
                }
            }
        }
    }
}

//Start a loop
requestAnimationFrame(animate);