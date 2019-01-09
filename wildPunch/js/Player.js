
class Player extends GameObject
{

    constructor(imageFirstPlayer, centreX, centreY)
    {
        super(40);

        this.centreX = centreX;
        this.centreY = centreY;
        this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE = 4; 
        this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE = 4; 

        this.column = 0;
        this.animationStartDelay = 0;
        this.imageFirstPlayer = imageFirstPlayer;

        this.SPRITE_WIDTH = (this.imageFirstPlayer.width / this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE);
        this.SPRITE_HEIGHT = (this.imageFirstPlayer.height / this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE);
        this.WIDTH_OF_PLAYER = canvas.width/30; 
        this.HEIGHT_OF_PLAYER = canvas.width/30;

        this.PLAYER_SPEED = 12;
        this.setDirection(DOWN);
		
		this.velocityX = 0;
		this.velocityY = 3;
		this.jumping = 0;
		this.jump = canvas.width/11;
		this.jumpSpeed = jump/12;
		this.initJump = 0;
		this.jumpNumber = 2;
		this.jumps = 0;
		this.gravity= 0.04;
		this.securityNumber = 20;
		this.row = 0;
		
		this.onGround = 0;
		
		this.punching = 0;
		this.punched = 0;
		
		this.holding = 0;
		this.life = 0;
    }

    updateState()
    {
		// Falling
		if (this.onGround == 0 && this.jumping == 0){
			this.centreY += (10*this.velocityY);
			
			if(this.velocityY < 1.5){
				this.velocityY+= this.gravity+0.05;
			}
			
			// On the floor
		} else if (this.onGround == 1){
			this.jumps = 0;
			this.velocityY = 1;
		}
		
		
		// Jumping
		else if(this.onGround == 0 && this.jumping == 1){
			this.centreY -= (13*this.velocityY);			
			if(this.velocityY >= 0){
				this.velocityY -= this.gravity;
			}

			if(this.centreY <= (this.initJump - this.jump + this.securityNumber) ){//ground-100){
				this.jumping = 0;
			}
		}

		
		// SPRITE
		this.column++;
		this.currentgameObject++;

		if (this.currentgameObject >= this.endgameObject)
		{
			this.row = this.direction;
			this.column = 0;
			this.currentgameObject = this.startgameObject;
		}
		else if (this.column >= this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE)
		{
			this.column = 0;
			this.row++;
		}

    }

    render()
    {
        ctx.drawImage(this.imageFirstPlayer, this.column * this.SPRITE_WIDTH, this.row * this.SPRITE_WIDTH, this.SPRITE_WIDTH, this.SPRITE_HEIGHT, this.centreX - (this.SPRITE_WIDTH / 2), this.centreY - (this.SPRITE_HEIGHT / 2), this.WIDTH_OF_PLAYER, this.HEIGHT_OF_PLAYER);
    }

	hold(){
		this.holding=1;
		setTimeout(function(){
			objects[FIRSTPLAYER].setHolding(0);
		}, 200);
	}
	hold2(){
		this.holding=1;
		setTimeout(function(){
			objects[SECONDPLAYER].setHolding(0);
		}, 200);
	}
	
	punch(){
		this.punching=1;
		setTimeout(function(){
			objects[FIRSTPLAYER].setPunching(0);
		}, 500);	
	}
	punch2(){
		this.punching=1;
		setTimeout(function(){
			objects[SECONDPLAYER].setPunching(0);
		}, 500);	
	}
	
	beingPunched(n){
		this.punched=1;
		this.life += 0.2;
		sound = 2;
		if(n==1){
			//this.setX(100);
			this.punched=1;
		}else if(n==2){
			//this.setX(-100);
			this.punched=2;
		}
		let time = this.life * canvas.height/8;
		setTimeout(function(){
			
			objects[FIRSTPLAYER].setPunched(0);
		}, time);	
	}
	beingPunched2(n){
		this.punched=1;
		this.life += 0.2;
		sound = 2;
		if(n==1){
			//this.setX(100);
			this.punched=1;
		}else if(n==2){
			//this.setX(-100);
			this.punched=2;
		}
		
		let time = this.life * canvas.height/8;
		setTimeout(function(){
			
			objects[SECONDPLAYER].setPunched(0);
		}, time);	
	}
	
	getPunched(){
		return this.punched;
	}
	
	getPunching(){
		return this.punching;
	}
	
	setPunching(n){
		this.punching = n;
	}
	
	setHolding(n){
		this.holding = n;
	}
	
	setPunched(n){
		this.punched = n;
	}
	
	getLife(){
		return this.life;
	}
	
	setLife(n){
		this.life = n;
	}
	
    setDirection(newDirection)
    {
        this.direction = newDirection;
        this.startgameObject = this.direction * this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE;
        this.endgameObject = this.startgameObject + this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE;
        this.currentgameObject = this.startgameObject;
        this.row = this.direction;
        this.column = 0;
    }

	setX(n){
		this.centreX += n;
	}
	
	setY(n){
		this.centreY += n;
	}

	setXGuest(n){
		this.centreX = n;
	}
	
	setYGuest(n){
		this.centreY = n;
	}
	
	setJumping(n){
		this.jumping = n;
	}
	
	setInitJump(n){
		this.initJump = n;
	}
	
	setOnGround(n){
		this.onGround = n;
	}
	
	getJumps()
    {
        return this.jumps;
    }
	
	getJumpNumber(){
		return this.jumpNumber;
	}
	
	sumJumps(){
		this.jumps++;
	}
	
	setVelocityY(n){
		this.velocityY = n;
	}
	
    getDirection()
    {
        return(this.direction);
    }

    getCentreX()
    {
        return this.centreX;
    }

    getCentreY()
    {
        return this.centreY;
    }
	
	getWidth(){
		return this.WIDTH_OF_PLAYER;
	}
	
	getHeight(){
		return this.HEIGHT_OF_PLAYER;
	}
	
}