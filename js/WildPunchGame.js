
class WildPunchGame extends CanvasGame
{
    constructor(wallsImage)
    {
        super();

        let wallsOffscreenCanvas = document.createElement('canvas');
        this.wallsCtx = wallsOffscreenCanvas.getContext('2d');
        wallsOffscreenCanvas.width = canvas.width;
        wallsOffscreenCanvas.height = canvas.height;
        this.wallsCtx.drawImage(wallsImage, 0, 0, canvas.width, canvas.height);
    }

    collisionDetection()
    {
        if (!this.wallsCtx)
        {
            return;
        }
		
		var p1w = objects[FIRSTPLAYER].getWidth(), p1h = objects[FIRSTPLAYER].getHeight(), p2w = objects[SECONDPLAYER].getWidth(), p2h = objects[SECONDPLAYER].getHeight();
		
		// PLAYER COLLISION AND PUNCHING
		
		if( ((objects[FIRSTPLAYER].getCentreX() - objects[SECONDPLAYER].getCentreX()) < p1h) 
			&&  ((objects[SECONDPLAYER].getCentreY() - objects[FIRSTPLAYER].getCentreY()) < p1h)
			&& ((objects[FIRSTPLAYER].getCentreY() - objects[SECONDPLAYER].getCentreY()) < p1w) 
			&& (objects[FIRSTPLAYER].getCentreX() > objects[SECONDPLAYER].getCentreX()) ){
				if(objects[FIRSTPLAYER].getPunching() == 1){
					console.log("N puncheando izquierda");
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
					console.log("O puncheando izquierda");
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
					console.log("N puncheando derecha");
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
					console.log("O puncheando derecha");
					objects[FIRSTPLAYER].beingPunched(1);
				} else{
					objects[SECONDPLAYER].setX(-objects[SECONDPLAYER].PLAYER_SPEED-8);
				}
		} 
		
			
		// PUNCHED
		if(objects[FIRSTPLAYER].getPunched() == 1){
			objects[FIRSTPLAYER].setX(4 + (objects[FIRSTPLAYER].getLife() * 0.5));
			objects[FIRSTPLAYER].setY(-8);
		} else if(objects[FIRSTPLAYER].getPunched() == 2){
			objects[FIRSTPLAYER].setX(-4 - (objects[FIRSTPLAYER].getLife() * 0.5) );
			objects[FIRSTPLAYER].setY(-8);
		}
		if(objects[SECONDPLAYER].getPunched() == 1){
			objects[SECONDPLAYER].setX(4 + (objects[SECONDPLAYER].getLife() * 0.5));
			objects[SECONDPLAYER].setY(-8);
		} else if(objects[SECONDPLAYER].getPunched() == 2){
			objects[SECONDPLAYER].setX(-4 - (objects[SECONDPLAYER].getLife() * 0.5));
			objects[SECONDPLAYER].setY(-8);
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
		if (objects[FIRSTPLAYER].getCentreY() > canvas.height+100)
            {
				
                for (let i = 0; i < objects.length; i++) 
                {
                    objects[i].stop();
                }
				sound = 1;
				seguir = 0;
                objects[WIN_MESSAGE] = new StaticText("VAMPIRE WON!", 0, canvas.width/2, "Comic Sans", canvas.width/8, "red");
                objects[WIN_MESSAGE].start(); 
            }
			
		if (objects[SECONDPLAYER].getCentreY() > canvas.height+100)
            {
				
                for (let i = 0; i < objects.length; i++) 
                {
                    objects[i].stop();
                }
				sound = 1;
				seguir = 0;
                objects[WIN_MESSAGE] = new StaticText("ALIEN WON!", 0, canvas.width/2, "Comic Sans", canvas.width/8, "red");
                objects[WIN_MESSAGE].start(); 
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