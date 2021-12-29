function start() { // Inicio da função start()

	$("#inicio").hide();
	
	$("#fundoGame").append("<div id='jogador' class='anima1'></div>");
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
	$("#fundoGame").append("<div id='amigo' class='anima3'></div>");

	//Principais variáveis do jogo
	
	var jogo = {}
	var TECLA = {
		W: 87,
		S: 83,
		D: 68,
		A: 65
		}
	
	jogo.pressionou = [];

	/*** ENEMY VARIABLES ***/
	var velocidade = 5; // Enemy speed
	var posicaoY = parseInt(Math.random() * 334); // Enemy Vertical Position
	
	/*** OTHER VARIABLES***/

	var shot1Ready = true;
	var shot2Ready = true;
	


	//Verifica se o usuário pressionou alguma tecla	
	//Arrays are already objects, so it is possible assign new properties.
	
	$(document).keydown(function(e){
		jogo.pressionou[e.which] = true;
	});
			
	$(document).keyup(function(e){
	   jogo.pressionou[e.which] = false;
	});
		
	//Game Loop
	jogo.timer = setInterval(loop, 30);
	
	function loop() {
	
	movefundo();
	movejogador();
	moveExecutive();
	moveinimigo1();
	moveinimigo2();

	} // Game Loop closed

	/*** FUNCTION DEFINITIONS BELOW ***/

	//Função que movimenta o fundo do jogo
	
	function movefundo() {
	
	esquerda = parseInt($("#fundoGame").css("background-position"));
	$("#fundoGame").css("background-position",esquerda-1);
	
	} // fim da função movefundo()
	
	//Verifica se o usuário pressionou alguma tecla	
	
	function movejogador() {
		
	if (jogo.pressionou[TECLA.W]) {
		var topo = parseInt($("#jogador" ).css("top"));
		if (topo >= 10){
			$("#jogador").css("top",topo-10);}
		}

	if (jogo.pressionou[TECLA.S]){
		var topo = parseInt($("#jogador").css("top"));
		if (topo <= 434){
			$("#jogador").css("top",topo+10);}
		}
		
	if (jogo.pressionou[TECLA.D]) {
		horizShot();
		}

	if (jogo.pressionou[TECLA.A]) {
		missileShot();
		}
	} // fim da função movejogador()

	function moveExecutive() {
	
		posicaoX = parseInt($("#amigo").css("left"));
		$("#amigo").css("left",posicaoX+2);
					
			if (posicaoX>906) {
				
			$("#amigo").css("left",0);
						
			}
	
	} // fim da função moveamigo()

	function moveinimigo1() {

		posicaoX = parseInt($("#inimigo1").css("left"));
		$("#inimigo1").css("left",posicaoX - velocidade);
		$("#inimigo1").css("top",posicaoY);
			
			if (posicaoX<=-400) {
			posicaoY = parseInt(Math.random() * 334);
			$("#inimigo1").css("left", 900);
			$("#inimigo1").css("top",posicaoY);
				
			}
	} //Fim da função moveinimigo1()

	function moveinimigo2() {
        posicaoX = parseInt($("#inimigo2").css("left"));
		$("#inimigo2").css("left",posicaoX-3);
				
		if (posicaoX<=-200) {
			
		$("#inimigo2").css("left",775);
					
		}
	} // Fim da função moveinimigo2()

	function horizShot() {
	
		if (shot1Ready) {
			
			shot1Ready = false;
			topo = parseInt($("#jogador").css("top"))
			posicaoX= parseInt($("#jogador").css("left"))
			tiroX = posicaoX + 190;
			topoTiro=topo+37;
			$("#fundoGame").append("<div id='disparo'></div");
			$("#disparo").css("top",topoTiro);
			$("#disparo").css("left",tiroX);
			var tempoDisparo = window.setInterval(executaDisparo1, 30);
		
		} //Fecha podeAtirar
	 
		function executaDisparo1() {
		posicaoX = parseInt($("#disparo").css("left"));
		$("#disparo").css("left",posicaoX+15); 
	
			if (posicaoX>920) {
				window.clearInterval(tempoDisparo);
				tempoDisparo=null;
				$("#disparo").remove();
				shot1Ready=true;
						
					   }
		} // Fecha executaDisparo()
	} // Fecha disparo()

	function missileShot() {
	
		if (shot2Ready) {
			
			shot2Ready = false;
			topo = parseInt($("#jogador").css("top"))
			posicaoX= parseInt($("#jogador").css("left"))
			tiroX = posicaoX + 140;
			posiY=topo+74;
			$("#fundoGame").append("<div id='missile'></div");
			$("#missile").css("top",posiY);
			$("#missile").css("left",tiroX);
			var tempoDisparo = window.setInterval(executaDisparo2, 30);
		
		} //Fecha podeAtirar
	 
		function executaDisparo2() {
		posicaoX = parseInt($("#missile").css("left"));
		posiY = parseInt($("#missile").css("top"));
		$("#missile").css({ "top": posiY + 11, "left": posicaoX + 15});
		
		if (posiY < 400) //Stops rotation when next to the floor. More natural motion.
			$("#missile").css("transform", "rotate("+ posicaoX / 9 +"deg)");
		
			if (posiY > 464) {
				window.clearInterval(tempoDisparo);
				tempoDisparo=null;
				$("#missile").remove();
				shot2Ready=true;
						
					   }
		} // Fecha executaDisparo()
	} // Fecha disparo()
		
}