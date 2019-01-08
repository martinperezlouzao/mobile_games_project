// Hacer empujes
// Arreglar botones
// Limpiar proyecto
// Online

var interval;

let imageFirstPlayer = new Image();
let imageSecondPlayer = new Image();
imageFirstPlayer.src = "images/man1.png";
imageSecondPlayer.src = "images/man4.png";

let background = new Image;
background.src = "images/scene1.gif";

let walls = new Image;
walls.src = "images/mapa3.png";

let sound = 0;

const UP = 2;
const LEFT = 3;
const DOWN = 0;
const RIGHT = 1;

const BACKGROUND = 1;
const WALLS = 2;
const FIRSTPLAYER = 3;
const SECONDPLAYER = 5;
const WIN_MESSAGE = 4;
const LOADING = 0;
const TEXT1 = 6;
const TEXT2 = 7;

const ground = 340;
const score = 0;

let rightPressed = false;
let leftPressed = false;
let rightPressed2 = false;
let leftPressed2 = false

function playGame()
{
	objects[BACKGROUND] = new StaticImage(background, 0, 0, canvas.width, canvas.height);
	objects[WALLS] = new StaticImage(walls, 0, 0, canvas.width, canvas.height);
	objects[FIRSTPLAYER] = new FirstPlayer(imageFirstPlayer, canvas.width - 700, 10);
	objects[SECONDPLAYER] = new SecondPlayer(imageSecondPlayer, canvas.width - 300, 50);

    let game = new WildPunchGame(walls);

	game.start();
	
	function left(){
		if(objects[FIRSTPLAYER].getPunched() == 0){
			objects[FIRSTPLAYER].setX(-objects[FIRSTPLAYER].PLAYER_SPEED);
			objects[FIRSTPLAYER].setDirection(LEFT);
		}
	}

	function right(){
		if(objects[FIRSTPLAYER].getPunched() == 0){
			objects[FIRSTPLAYER].setX(objects[FIRSTPLAYER].PLAYER_SPEED);
			objects[FIRSTPLAYER].setDirection(RIGHT);
		}
	}

	function jump(){
		if(objects[FIRSTPLAYER].getPunched() == 0){
			if(objects[FIRSTPLAYER].getJumps() < objects[FIRSTPLAYER].getJumpNumber()){
				objects[FIRSTPLAYER].setY(-40);
				objects[FIRSTPLAYER].sumJumps();
				objects[FIRSTPLAYER].setVelocityY(1);
				objects[FIRSTPLAYER].setJumping(1);
				objects[FIRSTPLAYER].setInitJump(objects[FIRSTPLAYER].getCentreY());
				objects[FIRSTPLAYER].setOnGround(0);
				sound=3;
			}
		}
	}

	function punch(){
		if(objects[FIRSTPLAYER].getPunched() == 0){
			objects[FIRSTPLAYER].punch();
		}
	}


	document.getElementById("jump").addEventListener("click", function(){   //jump
		jump();        
    });

	document.getElementById("punch").addEventListener("click", function(){   //punch
		punch();        
	});





	// KEYBOARD
	document.addEventListener('keydown', keyDownHandler, false);
	document.addEventListener('keyup', keyUpHandler, false);
	function keyDownHandler(e) {
		if(e.keyCode == 39) {
			rightPressed = true;
		}
		else if(e.keyCode == 37) {
			leftPressed = true;
		}
	}
	function keyUpHandler(e) {
		if(e.keyCode == 39) {
			rightPressed = false;
		}
		else if(e.keyCode == 37) {
			leftPressed = false;
		}
	}
	
	document.addEventListener('keydown', keyDownHandler2, false);
	document.addEventListener('keyup', keyUpHandler2, false);
	function keyDownHandler2(e2) {
		if(e2.keyCode == 65) {
			leftPressed2 = true;
		}
		else if(e2.keyCode == 68) {
			rightPressed2 = true;
		}
	}
	function keyUpHandler2(e2) {
		if(e2.keyCode == 65) {
			leftPressed2 = false;
		}
		else if(e2.keyCode == 68) {
			rightPressed2 = false;
		}
	}
	
	document.getElementById("left").addEventListener('touchstart', keyDownHandlerL, false);   //left
    document.getElementById("left").addEventListener('touchend', keyUpHandlerL, false);
	function keyDownHandlerL(e) {
		if(e.touches) {
			leftPressed = true;
		}
	}
	function keyUpHandlerL(e) {
		if(e.touches) {
			leftPressed = false;
		}
	}
	
	document.getElementById("right").addEventListener('touchstart', keyDownHandlerR, false);   //right
    document.getElementById("right").addEventListener('touchend', keyUpHandlerR, false);
	function keyDownHandlerR(e) {
		if(e.touches) {
			rightPressed = true;
		}
	}
	function keyUpHandlerR(e) {
		if(e.touches) {
			rightPressed = false;
		}
	}



	
	
	
    document.addEventListener('keydown', function (e)
    {	
		if (e.keyCode === 37){  // left
			left();
		}else if (e.keyCode === 38){ // space
			jump();
		}else if (e.keyCode === 39){ // right
			right();
		} else if (e.keyCode === 40){ // right
			objects[FIRSTPLAYER].setDirection(DOWN);
		}else if(e.keyCode === 79){ //hold
			objects[FIRSTPLAYER].hold();
		}else if(e.keyCode === 80){ //punch
			punch();
		}
		//PLAYER 1
		/*if(objects[FIRSTPLAYER].getPunched() == 0){
			if (e.keyCode === 37){  // left
				objects[FIRSTPLAYER].setX(-objects[FIRSTPLAYER].PLAYER_SPEED);
				objects[FIRSTPLAYER].setDirection(LEFT);
			}else if (e.keyCode === 38){ // space
				if(objects[FIRSTPLAYER].getJumps() < objects[FIRSTPLAYER].getJumpNumber()){
					objects[FIRSTPLAYER].setY(-40);
					objects[FIRSTPLAYER].sumJumps();
					objects[FIRSTPLAYER].setVelocityY(1);
					objects[FIRSTPLAYER].setJumping(1);
					objects[FIRSTPLAYER].setInitJump(objects[FIRSTPLAYER].getCentreY());
					objects[FIRSTPLAYER].setOnGround(0);
					sound=3;
				}
			}else if (e.keyCode === 39){ // right
				objects[FIRSTPLAYER].setX(objects[FIRSTPLAYER].PLAYER_SPEED);
				objects[FIRSTPLAYER].setDirection(RIGHT);
			} else if (e.keyCode === 40){ // right
				objects[FIRSTPLAYER].setDirection(DOWN);
			}else if(e.keyCode === 79){ //hold
				objects[FIRSTPLAYER].hold();
			}else if(e.keyCode === 80){ //punch
				objects[FIRSTPLAYER].punch();
			}
		}*/

		// PLAYER 2
		
		if(objects[SECONDPLAYER].getPunched() == 0){
			if (e.keyCode === 65)  // left
			{
				objects[SECONDPLAYER].setX(-objects[SECONDPLAYER].PLAYER_SPEED);
				objects[SECONDPLAYER].setDirection(LEFT);
			}
			else if (e.keyCode === 87) // space
			{
				if(objects[SECONDPLAYER].getJumps() < objects[SECONDPLAYER].getJumpNumber()){
					objects[SECONDPLAYER].setY(-40);
					objects[SECONDPLAYER].sumJumps();
					objects[SECONDPLAYER].setVelocityY(1);
					objects[SECONDPLAYER].setJumping(1);
					objects[SECONDPLAYER].setInitJump(objects[SECONDPLAYER].getCentreY());
					objects[SECONDPLAYER].setOnGround(0);
					sound = 4;
				}
			}else if (e.keyCode === 68){ // right
				objects[SECONDPLAYER].setX(objects[SECONDPLAYER].PLAYER_SPEED);
				objects[SECONDPLAYER].setDirection(RIGHT);
			}else if (e.keyCode === 83){ // down
				objects[SECONDPLAYER].setDirection(DOWN);
			}else if(e.keyCode === 71){
				objects[SECONDPLAYER].hold2();
			}else if(e.keyCode === 72){
				objects[SECONDPLAYER].punch2();
			}
		}
    });
}

