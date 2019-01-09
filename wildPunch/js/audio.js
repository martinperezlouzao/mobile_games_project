
var audio = {
	musica: null,
	pista1: "audio/cancionjuego.mp3",
	pista2: "audio/kirby-victory.mp3",
	pista3: "audio/punch1.mp3",
	pista4: "audio/punch2.mp3",
	pista5: "audio/punch3.mp3",
	pista6: "audio/punch4.mp3",
	pista7: "audio/punch5.mp3",
	pista8: "audio/punch6.mp3",
	pista9: "audio/punch7.mp3",
	pista10: "audio/jump1.mp3",
	pista11: "audio/jump2.mp3",
	reproducir: function(rutaPista){
		if(audio.musica != null){
			audio.musica.pause();
			//audio.musica.src = "";
		}
		audio.musica = new Audio(rutaPista);
		audio.musica.play();
	},
	
	parar: function(){
		audio.musica.pause();
		audio.musica.src = "";
	}
};