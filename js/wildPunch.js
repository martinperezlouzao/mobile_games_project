// Hacer empujes
// Arreglar botones
// Limpiar proyecto
// Online

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

function playGame()
{
	objects[BACKGROUND] = new StaticImage(background, 0, 0, canvas.width, canvas.height);
	objects[WALLS] = new StaticImage(walls, 0, 0, canvas.width, canvas.height);
	objects[FIRSTPLAYER] = new FirstPlayer(imageFirstPlayer, canvas.width - 700, 10);
	objects[SECONDPLAYER] = new SecondPlayer(imageSecondPlayer, canvas.width - 300, 50);

    let game = new WildPunchGame(walls);

    game.start();

	
	document.getElementById("left").addEventListener("click", function(){   //left
		if(objects[FIRSTPLAYER].getPunched() == 0){
			objects[FIRSTPLAYER].setX(-objects[FIRSTPLAYER].PLAYER_SPEED);
			objects[FIRSTPLAYER].setDirection(LEFT);
		}
        
    });

	document.getElementById("right").addEventListener("click", function(){   //right
		if(objects[FIRSTPLAYER].getPunched() == 0){
			objects[FIRSTPLAYER].setX(objects[FIRSTPLAYER].PLAYER_SPEED);
			objects[FIRSTPLAYER].setDirection(RIGHT);
		}
        
    });

	document.getElementById("jump").addEventListener("click", function(){   //jump
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
        
    });

	document.getElementById("punch").addEventListener("click", function(){   //punch
		if(objects[FIRSTPLAYER].getPunched() == 0){
			objects[FIRSTPLAYER].punch();
		}
        
    });
	
	
    document.addEventListener('keydown', function (e)
    {	
		//PLAYER 1
		if(objects[FIRSTPLAYER].getPunched() == 0){
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
		}

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

