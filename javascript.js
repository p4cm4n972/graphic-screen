/* FOR THE DRAWING APPLICATION */
/* =========================== */

var canvasMouse, contextMouse;

var started = false;
var x, y;

function initMouse() {

	// Get the drawing canvas
	canvasMouse = document.getElementById('drawing');
	contextMouse = canvasMouse.getContext('2d');
    
    contextMouse.strokeStyle = '#000';
    contextMouse.lineWidth = '1';
    
	// Add some event listeners so we can figure out what's happening
	// and run a few functions when they are executed.
	canvasMouse.addEventListener('mousemove', mousemovement, false);
	canvasMouse.addEventListener('mousedown', mouseclick, false);
	canvasMouse.addEventListener('mouseup', mouseunclick, false);

}

function mouseclick() {
	// When the mouse is clicked. Change started to true and move
	// the initial position to the position of the mouse
	contextMouse.beginPath();
	contextMouse.moveTo(x, y);
	started = true;
	
}

// For getting the mouse position, basically. This gets the position
// of the canvas element, so we can use it to calculate the mouse 
// position on the canvas
function getOffset(e) {
    var cx = 0;
    var cy = 0;
    
    while(e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop)) {
        cx += e.offsetLeft - e.scrollLeft;
        cy += e.offsetTop - e.scrollTop;
        e = e.offsetParent;
    }
    return { top: cy, left: cx };
}

function mousemovement(e) {
	
	// Get mouse position
	
	if(e.offsetX || e.offsetY) {
		x = e.pageX - getOffset(document.getElementById('drawing')).left - window.pageXOffset;
		y = e.pageY - getOffset(document.getElementById('drawing')).top - window.pageYOffset;
	}
	else if(e.layerX || e.layerY) {
		x = (e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft)
		- getOffset(document.getElementById('drawing')).left - window.pageXOffset;
		y = (e.clientY + document.body.scrollTop + document.documentElement.scrollTop)
		- getOffset(document.getElementById('drawing')).top;
	}	
		
	// If started is true, then draw a line
	if(started) {
		contextMouse.lineTo(x, y);
		contextMouse.stroke();
	
	}
	
}

function mouseunclick() {
	// Change started to false when the user unclicks the mouse
	if(started) {
		started = false;	
	}

}

// Change size
function changeSize(s) {
	contextMouse.lineWidth = s;
}

// Change color
function changeColor(c) {
	contextMouse.strokeStyle = c;
}


/* =========================== */
/* =========================== */
/* =========================== */
/* KEYBOARD BLOCK RELATED MOVE */

var canvasKeyboard, drawKeyboard, width, height; // For drawing the canvas
var downcheck, upcheck, rightcheck, leftcheck; // For checking what direction is clicked

// Curent position
var up = 0;
var down = 0;
var left = 0;
var right = 0;

// The main function for initiating everything
function initKeyboard() {

	// Get the canvas by ID
    canvasKeyboard = document.getElementById('game');
    
    // Set a height and width for the canvas
    height = canvasKeyboard.height;
    width = canvasKeyboard.width;
    
    // A variable we'll use to draw the actual item
    drawKeyboard = canvasKeyboard.getContext('2d');

	// We want to redraw every 30ms
	setInterval(redraw, 30);

	// When the user presses a key run a function, when the user stops
	// run another function. We'll get to these functions later.
	document.onkeydown = canvasMove;
	document.onkeyup = canvasStop;
	
}

// Wipe the canvas when we want to move the rectangle, then we can redraw it.
function clear(c) {
    c.clearRect(0, 0, width, height);
}

function redraw() {
	clear(drawKeyboard);
	drawKeyboard.fillStyle = 'rgba(0,0,0,0.5)';
	drawKeyboard.fillRect(left - right , down - up, '100', '100');   
}

function canvasMove(e) {
  	
  	// Check if the up arrow is pressed
  	if(e.keyCode == '38') upcheck = true
  	// else check if the left arrow is pressed and the up arrow is also true
  	else if(e.keyCode == '37' && upcheck == true) leftcheck = true; // Then set the left arrow to true
  	// else check if the right arrow is true, repeat.
  	else if(e.keyCode == '39' && upcheck == true) rightcheck = true;
  	// otherwise the up arrow is not being pressed, so it is false
	else upcheck = false; 
  	
  	// Repeat for every arrow direction
  	if(e.keyCode == '40') downcheck = true; 
  	else if(e.keyCode == '37' && downcheck == true) leftcheck = true;
  	else if(e.keyCode == '39' && downcheck == true) rightcheck = true;
  	else downcheck = false;
  	
  	
 	if(e.keyCode == '37') leftcheck = true;
 	else if(e.keyCode == '40' && leftcheck == true) downcheck = true; 
 	else if(e.keyCode == '38' && leftcheck == true) upcheck = true;
 	else leftcheck = false;
 	
  	
  	if(e.keyCode == "39") rightcheck = true; 
  	else if(e.keyCode == '40' && rightcheck == true) downcheck = true; 
  	else if(e.keyCode == '38' && rightcheck == true) upcheck = true; 
  	else rightcheck = false;
  	
	// If the variables are true, increase the left and right movement accordingly. 
	// We also run the counting function, to keep track of total movement. 
  	if(rightcheck == true) { left += 10; counting() };
  	if(leftcheck == true) { right += 10; counting() };
  	if(upcheck == true) { up += 10; counting(true) };
  	if(downcheck == true) { down += 10; counting(true) };

}

// When the user stops pressing a key, check which key it is and set it to false
function canvasStop(e) {
	
	if(e.keyCode == '38') {
		upcheck = false;
	}
	if(e.keyCode == '40') {
		downcheck = false;
	}
	if(e.keyCode == '37') {
		leftcheck = false;
	}
	if(e.keyCode == '39') {
		rightcheck = false;
	}

}


function counting(y) {
	
	if(y == true) { 
		document.getElementById('y').innerHTML = parseInt(document.getElementById('y').innerHTML) + 1;
	}
	
	else { 
		document.getElementById('x').innerHTML = parseInt(document.getElementById('x').innerHTML) + 1;
	}
}
 
