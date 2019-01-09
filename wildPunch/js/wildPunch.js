
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

var client_server = null;
  
  

function playGame()
{
	objects[BACKGROUND] = new StaticImage(background, 0, 0, canvas.width, canvas.height);
	objects[WALLS] = new StaticImage(walls, 0, 0, canvas.width, canvas.height);
	objects[FIRSTPLAYER] = new FirstPlayer(imageFirstPlayer, canvas.width - 700, 10);
	objects[SECONDPLAYER] = new SecondPlayer(imageSecondPlayer, canvas.width - 300, 50);

	let game = null;

	

	  socket.onmessage = event => {
		console.log("message: " + event.data);
	  }

	  client_server = confirm("If you want to be the host, press accept. Otherwise, press cancel");

	if(client_server == true){
		game = new WildPunchGameHost(walls);
	}

	else{
		game = new WildPunchGameGuest(walls);
	}

	game.start();	
}

