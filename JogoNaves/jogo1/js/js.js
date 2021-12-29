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
	var velocidade = 7; // Enemy speed
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
	colisao();


	} // Game Loop closed

	/*** FUNCTION DEFINITIONS BELOW ***/

	//Função que movimenta o fundo do jogo
	
	function movefundo() {
	
	esquerda = parseInt($("#fundoGame").css("background-position"));
	$("#fundoGame").css("background-position",esquerda-2);
	
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
		
		} //"Shot available" check finished.
	 
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
			posiY=topo + 58;
			$("#fundoGame").append("<div id='missile'></div");
			$("#missile").css("top",posiY);
			$("#missile").css("left",tiroX);
			var tempoDisparo = window.setInterval(executaDisparo2, 30);
		
		} // "Shot available" check finished.
	 
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
	
	function colisao() {
		var colisao1 = ($("#jogador").collision($("#inimigo1")));
		// jogador com o inimigo1
			
			if (colisao1.length>0) {
				
			inimigo1X = parseInt($("#inimigo1").css("left"));
			inimigo1Y = parseInt($("#inimigo1").css("top"));
			explosao1(inimigo1X - 65,inimigo1Y);
		
			posicaoY = parseInt(Math.random() * 334);
			$("#inimigo1").css("left",920);
			$("#inimigo1").css("top",posicaoY);
			}
		
		} //Fim da função colisao()

		//Explosão 1
	function explosao1(inimigo1X,inimigo1Y) {
		//Add explosion and broken glass screen entities.
		$("#fundoGame").append("<div id='brokenScreen'></div");
		$("#fundoGame").append("<div id='explosao1'></div");
		
		//Background added via jquery, compatibility issues.
		$("#brokenScreen").css("background-image", "url(imgs/broken_screen.png)");
		$("#explosao1").css("background-image", "url(imgs/explosao.png)");
		
		//Add player flashing effect on hit.
		$("#jogador").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
		
		//Arguably improves readability
		var exp=$("#explosao1");
		var glass=$("#brokenScreen")

		glass.animate({opacity:0}, 1000);
		exp.css("top", inimigo1Y);
		exp.css("left", inimigo1X);
		exp.animate({width:200, opacity:0}, "slow");
		
	
		var tempoExplosao=window.setInterval(removeExplosao, 1000);
	
			function removeExplosao() {
			
				exp.remove();
				glass.remove();
				window.clearInterval(tempoExplosao);
				tempoExplosao=null;
			
			}
		
	} // Fim da função explosao1()
}
