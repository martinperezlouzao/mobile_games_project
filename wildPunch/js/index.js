
let canvas = null;
let ctx = null;

let objects = [];

let seguir = 1;

let wsUri = null;
let socket = null;

window.addEventListener("load", onAllAssetsLoaded);          
document.addEventListener("deviceready", onAllAssetsLoaded); 

function onAllAssetsLoaded()
{

    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");

	canvas.width = 1920;
    canvas.height = 1080;

    var ip = prompt("Please type IP of the server:", "192.168.137.1");

    wsUri = "ws://" + ip + ":5001";
    
    socket = new WebSocket(wsUri);


	socket.onopen = event => {
        console.log("Socket connected successfully...")
        playGame(); 
	  }

    
}


function drawLifeP1() {
	var med = canvas.width/35;
    ctx.font = med + "px Arial";
    ctx.fillStyle = "#FFB900";
    ctx.fillText("PLAYER 1: "+ parseFloat(Math.round(objects[FIRSTPLAYER].getLife() * 100) / 100).toFixed(1) +"%" , 20, canvas.height/15);
}

function drawLifeP2() {
    var med = canvas.width/25;
    ctx.font = med + "px Arial";
    ctx.fillStyle = "#FFB900";
    ctx.fillText("PLAYER 2: "+ parseFloat(Math.round(objects[SECONDPLAYER].getLife() * 100) / 100).toFixed(1) +"%", canvas.width - (canvas.width/3.3), canvas.height/15);
}

