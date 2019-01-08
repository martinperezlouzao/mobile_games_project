
class SecondPlayer extends Player
{

    constructor(imageSecondPlayer, centreX, centreY)
    {
        super(imageSecondPlayer, centreX, centreY); 

        var width = canvas.width, height = canvas.height;
        this.WIDTH_OF_PLAYER = width/16; 
        this.HEIGHT_OF_PLAYER = height/16;

        this.centreX = centreX; 
        this.centreY = centreY;

        //this.PLAYER_SPEED = 12; 
		
		this.jumpNumber = 3;
    }
}