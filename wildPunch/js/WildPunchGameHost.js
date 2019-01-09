var initialHref = window.location.href;

class WildPunchGameHost extends CanvasGame
{
    constructor(wallsImage)
    {
        super();

        let wallsOffscreenCanvas = document.createElement('canvas');
        this.wallsCtx = wallsOffscreenCanvas.getContext('2d');
        wallsOffscreenCanvas.width = canvas.width;
        wallsOffscreenCanvas.height = canvas.height;
		this.wallsCtx.drawImage(wallsImage, 0, 0, canvas.width, canvas.height);
		

		// KEYBOARD
		document.addEventListener('keydown', function keyDownHandler(e) {
			if(e.keyCode == 39) {
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
			/*else if(e.keyCode == 65) {	//HOST CANNOT MOVE P2
				leftPressed2 = true;
			}
			else if(e.keyCode == 68) {
				rightPressed2 = true;
			}
			else if(e.keyCode == 87){
				jump2();
			}
			else if(e.keyCode === 72){
				objects[SECONDPLAYER].punch2();
			}*/
		}, false);
		document.addEventListener('keyup', function keyUpHandler(e) {
			if(e.keyCode == 39) {
				rightPressed = false;
			}
			else if(e.keyCode == 37) {
				leftPressed = false;
			}
			/*else if(e.keyCode == 65) {	//HOST CANNOT MOVE P2
				leftPressed2 = false;
			}
			else if(e.keyCode == 68) {
				rightPressed2 = false;
			}*/
		}, false);



		//----------------TOUCH BUTTONS--------------------



		document.getElementById("jump").addEventListener("click", function(){   //jump
			jump();        
		});
	
		document.getElementById("punch").addEventListener("click", function(){   //punch
			punch();        
		});
		
		
		document.getElementById("left").addEventListener('touchstart', function keyDownHandlerL(e) {
			if(e.touches) {
				leftPressed = true;
			}
		}, false);   //left
		document.getElementById("left").addEventListener('touchend', function keyUpHandlerL(e) {
			if(e.touches) {
				leftPressed = false;
			}
		}, false);
		
		
		document.getElementById("right").addEventListener('touchstart', function keyDownHandlerR(e) {
			if(e.touches) {
				rightPressed = true;
			}
		}, false);   //right
		document.getElementById("right").addEventListener('touchend', function keyUpHandlerR(e) {
			if(e.touches) {
				rightPressed = false;
			}
		}, false);
		

    }

    collisionDetection()
    {


        if (!this.wallsCtx)
        {
            return;
		}
		

		move();


		//CATCH MOVE FROM CLIENT

		socket.onmessage = event => {
			var message = event.data;
			if(message.localeCompare("leftstart") == 0){
				leftPressed2 = true;
			}

			else if(message.localeCompare("leftstop") == 0){
				leftPressed2 = false;
			}

			else if(message.localeCompare("rightstart") == 0){
				rightPressed2 = true;
			}

			else if(message.localeCompare("rightstop") == 0){
				rightPressed2 = false;
			}

			else if(message.localeCompare("jump") == 0){
				jump2();
			}

			else if(message.localeCompare("punch") == 0){
				objects[SECONDPLAYER].punch2();
			}
			
		  }


		//-------------------------

		
		var p1w = objects[FIRSTPLAYER].getWidth(), p1h = objects[FIRSTPLAYER].getHeight(), p2w = objects[SECONDPLAYER].getWidth(), p2h = objects[SECONDPLAYER].getHeight();
		
		// PLAYER COLLISION AND PUNCHING
		
		if( ((objects[FIRSTPLAYER].getCentreX() - objects[SECONDPLAYER].getCentreX()) < p1h) 
			&&  ((objects[SECONDPLAYER].getCentreY() - objects[FIRSTPLAYER].getCentreY()) < p1h)
			&& ((objects[FIRSTPLAYER].getCentreY() - objects[SECONDPLAYER].getCentreY()) < p1w) 
			&& (objects[FIRSTPLAYER].getCentreX() > objects[SECONDPLAYER].getCentreX()) ){
				if(objects[FIRSTPLAYER].getPunching() == 1){
					navigator.vibrate(100);
					objects[SECONDPLAYER].beingPunched2(2);
				}else{
					objects[FIRSTPLAYER].setX(objects[FIRSTPLAYER].PLAYER_SPEED-8);
				}
		}
		if( ((objects[SECONDPLAYER].getCentreX() - objects[FIRSTPLAYER].getCentreX()) < p2h) 
			&&  ((objects[FIRSTPLAYER].getCentreY() - objects[SECONDPLAYER].getCentreY()) < p2h)
			&& ((objects[SECONDPLAYER].getCentreY() - objects[FIRSTPLAYER].getCentreY()) < p2w) 
			&& (objects[SECONDPLAYER].getCentreX() > objects[FIRSTPLAYER].getCentreX()) ){
				if(objects[SECONDPLAYER].getPunching() == 1){
					socket.send("vibrate");
					objects[FIRSTPLAYER].beingPunched(2);
				}else{	
					objects[SECONDPLAYER].setX(objects[SECONDPLAYER].PLAYER_SPEED-8);
				}
		}
		if( ((objects[SECONDPLAYER].getCentreX() - objects[FIRSTPLAYER].getCentreX()) < p1h) 
			&&  ((objects[SECONDPLAYER].getCentreY() - objects[FIRSTPLAYER].getCentreY()) < p1h)
			&& ((objects[FIRSTPLAYER].getCentreY() - objects[SECONDPLAYER].getCentreY()) < p1w) 
			&& (objects[FIRSTPLAYER].getCentreX() < objects[SECONDPLAYER].getCentreX()) ){
				if(objects[FIRSTPLAYER].getPunching() == 1){
					socket.send("vibrate");
					objects[SECONDPLAYER].beingPunched2(1);
				} else {
					objects[FIRSTPLAYER].setX(-objects[FIRSTPLAYER].PLAYER_SPEED-8);
				}
		} 
		if( ((objects[FIRSTPLAYER].getCentreX() - objects[SECONDPLAYER].getCentreX()) < p2h) 
			&&  ((objects[FIRSTPLAYER].getCentreY() - objects[SECONDPLAYER].getCentreY()) < p2h)
			&& ((objects[SECONDPLAYER].getCentreY() - objects[FIRSTPLAYER].getCentreY()) < p2w) 
			&& (objects[SECONDPLAYER].getCentreX() < objects[FIRSTPLAYER].getCentreX()) ){
				if(objects[SECONDPLAYER].getPunching() == 1){
					navigator.vibrate(100);
					objects[FIRSTPLAYER].beingPunched(1);
				} else{
					objects[SECONDPLAYER].setX(-objects[SECONDPLAYER].PLAYER_SPEED-8);
				}
		} 
		
			
		// PUNCHED
		if(objects[FIRSTPLAYER].getPunched() == 1){
			objects[FIRSTPLAYER].setX(10 + (objects[FIRSTPLAYER].getLife()) * 0.8);
			objects[FIRSTPLAYER].setY(-6);
		} else if(objects[FIRSTPLAYER].getPunched() == 2){
			objects[FIRSTPLAYER].setX(-10 - (objects[FIRSTPLAYER].getLife()) * 0.8);
			objects[FIRSTPLAYER].setY(-6);
		}
		if(objects[SECONDPLAYER].getPunched() == 1){
			objects[SECONDPLAYER].setX(10 + (objects[SECONDPLAYER].getLife()) * 0.8);
			objects[SECONDPLAYER].setY(-6);
		} else if(objects[SECONDPLAYER].getPunched() == 2){
			objects[SECONDPLAYER].setX(-10 - (objects[SECONDPLAYER].getLife()) * 0.8);
			objects[SECONDPLAYER].setY(-6);
		}
		
		
		// VARIABLES
		
		let wallR = this.wallsCtx.getImageData(objects[FIRSTPLAYER].getCentreX() + p1h/2, objects[FIRSTPLAYER].getCentreY(), 1, 1);
		let wallL = this.wallsCtx.getImageData(objects[FIRSTPLAYER].getCentreX() - p1h/4, objects[FIRSTPLAYER].getCentreY(), 1, 1);
		
		let wallR2 = this.wallsCtx.getImageData(objects[SECONDPLAYER].getCentreX() + p2h/2, objects[SECONDPLAYER].getCentreY(), 1, 1);
		let wallL2 = this.wallsCtx.getImageData(objects[SECONDPLAYER].getCentreX() - p2h/4, objects[SECONDPLAYER].getCentreY(), 1, 1);
		
		
		let imageUnder1 = this.wallsCtx.getImageData(objects[FIRSTPLAYER].getCentreX(), objects[FIRSTPLAYER].getCentreY() + 15, 1, 1);
		let imageUnder2 = this.wallsCtx.getImageData(objects[FIRSTPLAYER].getCentreX(), objects[FIRSTPLAYER].getCentreY() + 18, 1, 1);
		let imageUnder3 = this.wallsCtx.getImageData(objects[FIRSTPLAYER].getCentreX(), objects[FIRSTPLAYER].getCentreY() + 13, 1, 1);
		let imageUnder4 = this.wallsCtx.getImageData(objects[FIRSTPLAYER].getCentreX(), objects[FIRSTPLAYER].getCentreY() + 20, 1, 1);
		
		let imageUnder5 = this.wallsCtx.getImageData(objects[SECONDPLAYER].getCentreX(), objects[SECONDPLAYER].getCentreY() + 15, 1, 1);
		let imageUnder6 = this.wallsCtx.getImageData(objects[SECONDPLAYER].getCentreX(), objects[SECONDPLAYER].getCentreY() + 18, 1, 1);
		let imageUnder7 = this.wallsCtx.getImageData(objects[SECONDPLAYER].getCentreX(), objects[SECONDPLAYER].getCentreY() + 13, 1, 1);
		let imageUnder8 = this.wallsCtx.getImageData(objects[SECONDPLAYER].getCentreX(), objects[SECONDPLAYER].getCentreY() + 20, 1, 1);
		
		// DETECT FLOOR
		
		if (imageUnder1.data[3] !== 0 || imageUnder2.data[3] !== 0 || imageUnder3.data[3] !== 0 || imageUnder4.data[3] !== 0)
        {
            objects[FIRSTPLAYER].setOnGround(1);
        }else {
			 objects[FIRSTPLAYER].setOnGround(0);

		}
		if (imageUnder5.data[3] !== 0 || imageUnder6.data[3] !== 0 || imageUnder7.data[3] !== 0 || imageUnder8.data[3] !== 0)
        {
			objects[SECONDPLAYER].setOnGround(1);
        }else {
			 objects[SECONDPLAYER].setOnGround(0);

		}
		
		// MOVING
        if (objects[FIRSTPLAYER].getDirection() === UP)
        {
            let imageData = this.wallsCtx.getImageData(objects[FIRSTPLAYER].getCentreX(), objects[FIRSTPLAYER].getCentreY() - 20, 1, 1);
            if (imageData.data[3] !== 0)
            {
                objects[FIRSTPLAYER].setCentreY(objects[FIRSTPLAYER].getCentreY());
            }
        }
        else if (objects[FIRSTPLAYER].getDirection() === LEFT)
        {
			let imageData = this.wallsCtx.getImageData(objects[FIRSTPLAYER].getCentreX(), objects[FIRSTPLAYER].getCentreY(), 1, 1);
			if (imageData.data[3] !== 0){
				objects[FIRSTPLAYER].setX(objects[FIRSTPLAYER].PLAYER_SPEED);
				objects[FIRSTPLAYER].setY(-5);
			}
        }
        
        else if (objects[FIRSTPLAYER].getDirection() === RIGHT)
        {
			let imageData = this.wallsCtx.getImageData(objects[FIRSTPLAYER].getCentreX()+20, objects[FIRSTPLAYER].getCentreY(), 1, 1);
			if (imageData.data[3] !== 0){
				objects[FIRSTPLAYER].setX(-objects[FIRSTPLAYER].PLAYER_SPEED);
				objects[FIRSTPLAYER].setY(-5);
			}	
        }
		
			// PLAYER 2
		if (objects[SECONDPLAYER].getDirection() === UP)
        {
            let imageData = this.wallsCtx.getImageData(objects[SECONDPLAYER].getCentreX(), objects[SECONDPLAYER].getCentreY() - 20, 1, 1);
            if (imageData.data[3] !== 0)
            {
                objects[SECONDPLAYER].setCentreY(objects[SECONDPLAYER].getCentreY());
            }
        }
        else if (objects[SECONDPLAYER].getDirection() === LEFT)
        {
			let imageData = this.wallsCtx.getImageData(objects[SECONDPLAYER].getCentreX(), objects[SECONDPLAYER].getCentreY(), 1, 1);
			if (imageData.data[3] !== 0){
				objects[SECONDPLAYER].setX(objects[SECONDPLAYER].PLAYER_SPEED);
				objects[SECONDPLAYER].setY(-5);
			}
        }
        
        else if (objects[SECONDPLAYER].getDirection() === RIGHT)
        {
			let imageData = this.wallsCtx.getImageData(objects[SECONDPLAYER].getCentreX()+20, objects[SECONDPLAYER].getCentreY(), 1, 1);
			if (imageData.data[3] !== 0){
				objects[SECONDPLAYER].setX(-objects[SECONDPLAYER].PLAYER_SPEED);
				objects[SECONDPLAYER].setY(-5);
			}	
        }

		
		// WIN
		if (objects[FIRSTPLAYER].getCentreY() > canvas.height+100){
			for (let i = 0; i < objects.length; i++) 
			{
				objects[i].stop();
			}
			sound = 1;
			seguir = 0;
			
			socket.send("vampirewon");
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
		}
			
		if (objects[SECONDPLAYER].getCentreY() > canvas.height+100){
			for (let i = 0; i < objects.length; i++) 
			{
				objects[i].stop();
			}
			sound = 1;
			seguir = 0;
			
			socket.send("alienwon");
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
		}
	
		//HOLDING
		if(objects[FIRSTPLAYER].holding == 1){
			if (objects[FIRSTPLAYER].getDirection() === LEFT){
				if (wallL.data[3] !== 0)
				{
					objects[FIRSTPLAYER].setY(-70);
				}
			}
			if(objects[FIRSTPLAYER].getDirection() === RIGHT){
				if (wallR.data[3] !== 0)
				{
					objects[FIRSTPLAYER].setY(-70);
				}
			}	
		}
		if(objects[SECONDPLAYER].holding == 1){
			if (objects[SECONDPLAYER].getDirection() === LEFT){
				if (wallL2.data[3] !== 0)
				{
					objects[SECONDPLAYER].setY(-70);
				}
			}
			if(objects[SECONDPLAYER].getDirection() === RIGHT){
				if (wallR2.data[3] !== 0)
				{
					objects[SECONDPLAYER].setY(-70);
				}
			}	
		}
		
    }
}

function move(){
	if(rightPressed) {
		objects[FIRSTPLAYER].setX(objects[FIRSTPLAYER].PLAYER_SPEED);
		objects[FIRSTPLAYER].setDirection(RIGHT);
	}
	else if(leftPressed) {
		objects[FIRSTPLAYER].setX(-objects[FIRSTPLAYER].PLAYER_SPEED);
		objects[FIRSTPLAYER].setDirection(LEFT);
	}
	
	if(rightPressed2) {
		objects[SECONDPLAYER].setX(objects[SECONDPLAYER].PLAYER_SPEED);
		objects[SECONDPLAYER].setDirection(RIGHT);
	}
	else if(leftPressed2) {
		objects[SECONDPLAYER].setX(-objects[SECONDPLAYER].PLAYER_SPEED);
		objects[SECONDPLAYER].setDirection(LEFT);
	}
}

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

function jump2(){
	if(objects[SECONDPLAYER].getJumps() < objects[SECONDPLAYER].getJumpNumber()){
		objects[SECONDPLAYER].setY(-40);
		objects[SECONDPLAYER].sumJumps();
		objects[SECONDPLAYER].setVelocityY(1);
		objects[SECONDPLAYER].setJumping(1);
		objects[SECONDPLAYER].setInitJump(objects[SECONDPLAYER].getCentreY());
		objects[SECONDPLAYER].setOnGround(0);
		sound = 4;
	}
}

function punch(){
	if(objects[FIRSTPLAYER].getPunched() == 0){
		objects[FIRSTPLAYER].punch();
	}
}