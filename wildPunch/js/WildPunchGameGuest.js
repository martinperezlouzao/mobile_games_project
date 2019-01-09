var initialHref = window.location.href;

class WildPunchGameGuest extends CanvasGame
{
    constructor(wallsImage)
    {
        super();

        let wallsOffscreenCanvas = document.createElement('canvas');
        this.wallsCtx = wallsOffscreenCanvas.getContext('2d');
        wallsOffscreenCanvas.width = canvas.width;
        wallsOffscreenCanvas.height = canvas.height;
		this.wallsCtx.drawImage(wallsImage, 0, 0, canvas.width, canvas.height);

		socket.onmessage = event => {
			var message = event.data;

			if(message.localeCompare("vibrate") == 0){
				navigator.vibrate(100);
				objects[FIRSTPLAYER].beingPunched(2);
			}


			if(message.localeCompare("vampirewon") == 0){
				var r = confirm("VAMPIRE WON! Restart?");
				if (r == true) {
					location.reload();
				} else {
					if (navigator.app) {
						navigator.app.exitApp();
					} else if (navigator.device) {
						navigator.device.exitApp();
					} else {
						window.close();
					}
				}
				return;
			}

			if(message.localeCompare("alienwon") == 0){
				var r = confirm("ALIEN WON! Restart?");
				if (r == true) {
					location.reload();
				} else {
					if (navigator.app) {
						navigator.app.exitApp();
					} else if (navigator.device) {
						navigator.device.exitApp();
					} else {
						window.close();
					}
				}
				return;
			}

			var coordinates = message.split(';');
	
			objects[FIRSTPLAYER].setXGuest(coordinates[0]);
			objects[FIRSTPLAYER].setYGuest(coordinates[1]);
			objects[SECONDPLAYER].setXGuest(coordinates[2]);
			objects[SECONDPLAYER].setYGuest(coordinates[3]);
			objects[FIRSTPLAYER].setDirection(coordinates[4]);
			objects[FIRSTPLAYER].setLife(coordinates[5]);
			objects[SECONDPLAYER].setLife(coordinates[6]);
		}
		
		
		// KEYBOARD
		document.addEventListener('keydown', function keyDownHandler(e) {
			/*if(e.keyCode == 39) {		//GUEST CANNOT MOVE P1
				rightPressed = true;
			}
			else if(e.keyCode == 37) {
				leftPressed = true;
			}
		
			else if (e.keyCode == 38){ // space
				jump();
			}
			else if(e.keyCode === 80){ //punch
				punch();
			}	
			else*/ if(e.keyCode == 65) {
				socket.send("leftstart");
				objects[SECONDPLAYER].setDirection(LEFT);
			}
			else if(e.keyCode == 68) {
				socket.send("rightstart");
				objects[SECONDPLAYER].setDirection(RIGHT);
			}
			else if(e.keyCode == 87){
				socket.send("jump");
			}
			else if(e.keyCode === 72){
				socket.send("punch");
			}
		}, false);
		document.addEventListener('keyup', function keyUpHandler(e) {
			/*if(e.keyCode == 39) {		//GUEST CANNOT MOVE P1
				rightPressed = false;
			}
			else if(e.keyCode == 37) {
				leftPressed = false;
			}
			else*/ if(e.keyCode == 65) {
				socket.send("leftstop");
			}
			else if(e.keyCode == 68) {
				socket.send("rightstop");
			}
		}, false);



		//----------------TOUCH BUTTONS--------------------



		document.getElementById("jump").addEventListener("click", function(){   //jump
			socket.send("jump");
		});
	
		document.getElementById("punch").addEventListener("click", function(){   //punch
			socket.send("punch");
		});
		
		
		document.getElementById("left").addEventListener('touchstart', function keyDownHandlerL(e) {
			if(e.touches) {
				socket.send("leftstart");
				objects[SECONDPLAYER].setDirection(LEFT);
			}
		}, false);   //left
		document.getElementById("left").addEventListener('touchend', function keyUpHandlerL(e) {
			if(e.touches) {
				socket.send("leftstop");
			}
		}, false);
		
		
		document.getElementById("right").addEventListener('touchstart', function keyDownHandlerR(e) {
			if(e.touches) {
				socket.send("rightstart");
				objects[SECONDPLAYER].setDirection(RIGHT);
			}
		}, false);   //right
		document.getElementById("right").addEventListener('touchend', function keyUpHandlerR(e) {
			if(e.touches) {
				socket.send("rightstop");
			}
		}, false);
    }

    collisionDetection()
    {

        if (!this.wallsCtx)
        {
            return;
        }
	
    }
}



