
class CanvasGame
{
    constructor()
    {
        this.playGameLoop();
    }

    start()
    {
        for (let i = 0; i < objects.length; i++)
        {
            //audio.reproducir(audio.pista1);
			objects[i].start();
        }
		
    }

    playGameLoop()
    {

        this.collisionDetection();
        this.render();

		//drawLifeP1();
		//drawLifeP2();
		
			
        requestAnimationFrame(this.playGameLoop.bind(this));
		
		// SOUNDS
		if(sound == 1){
			audio.reproducir(audio.pista2);
			sound = 0;
		}else if(sound == 3){		
			audio.reproducir(audio.pista10);
			sound = 0;
		}else if(sound == 4){		
			audio.reproducir(audio.pista11);
			sound = 0;
		}else if(sound == 2){
			switch(Math.floor((Math.random() * 7) + 1)){
				case 1:
					audio.reproducir(audio.pista3);
					break;
				case 2:
					audio.reproducir(audio.pista4);
					break;
				case 3:
					audio.reproducir(audio.pista5);
					break;
				case 4:
					audio.reproducir(audio.pista6);
					break;
				case 5:
					audio.reproducir(audio.pista7);
					break;
				case 6:
					audio.reproducir(audio.pista8);
					break;
				case 7:
					audio.reproducir(audio.pista9);
					break;
			}
			sound = 0;
		}
		
    }

    render()
    {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < objects.length; i++)
        {
            if(objects[i] === undefined)
            {
                objects[i] = new GameObject();
            }
            
            if (objects[i].isDisplayed())
            {
                objects[i].render();
            }
        }
    }

    collisionDetection()
    {
    }
}