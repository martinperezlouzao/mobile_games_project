
let canvas = null;
let ctx = null;

let objects = [];

let seguir = 1;


window.addEventListener("load", onAllAssetsLoaded);          
document.addEventListener("deviceready", onAllAssetsLoaded); 

document.write("<div id='loadingMessage'>Loading...</div>");
function onAllAssetsLoaded()
{
    document.getElementById('loadingMessage').style.visibility = "hidden";

    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");

    /*var ratio = window.devicePixelRatio || 1;
    canvas.width = screen.width * ratio;
	canvas.height = screen.height * ratio;*/

	canvas.width = 1920;
	canvas.height = 1080;


    playGame(); 
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

