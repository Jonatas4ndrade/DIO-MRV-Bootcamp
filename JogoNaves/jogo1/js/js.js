function start() { // Inicio da função start()
	//Hides start menu and appends UI.
	$("#inicio").hide();
	$("#fundoGame").append("<div id='placar'></div>");
	$("#fundoGame").append("<div id='energy'></div>");


	//Appends game entities
	

	$("#fundoGame").append("<div id='jogador' class='anima1'></div>");
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");

	/*** GAME LOOP VARIABLES ***/
	var gameOver = false;
	var jogo = {}
	jogo.pressionou = [];

	var score =0;
	var safe = 2; //Pilot and narrator :P
	var lost = 0;
	var curEnergy=3;

	/*** ENEMY VARIABLES ***/
	var velocidade = 7; // Enemy chopper speed
	var velocidade2 =5; // Truck speed
	var posicaoY = parseInt(Math.random() * 334); // Enemy Vertical Position
	
	/*** OTHER VARIABLES***/

	var TECLA = {
		W: 87,
		S: 83,
		D: 68,
		A: 65
		}

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
	
	//Appends new executive if truck not in screen.
	if ( $("#amigo").length == 0 && parseInt($("#inimigo2").css("left")) > 1200 && gameOver == false) {
		$("#fundoGame").append("<div id='amigo' class='anima3'></div>");
	}
	movefundo();
	movejogador();
	moveExecutive();
	moveinimigo1();
	moveinimigo2();
	colisao();
	gameScore();
	energyUI();
	} // Game Loop closed

	/*** FUNCTION DEFINITIONS BELOW ***/

	/* MOVEMENT */
	
	//Função que movimenta o fundo do jogo
	function movefundo() {
	
	esquerda = parseInt($("#fundoGame").css("background-position"));
	$("#fundoGame").css("background-position",esquerda-2);
	
	} 
	
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
		missile();
		}

	if (jogo.pressionou[TECLA.A]) {
		bomb();
		}
	} // fim da função movejogador()

	function moveExecutive() {
	
		posicaoX = parseInt($("#amigo").css("right"));
		$("#amigo").css("right",posicaoX+4);
					
			if (posicaoX> 1000) {
				$("#amigo").remove(); // Will be added again by game loop().	
			}
	
	} // fim da função moveamigo()

	function moveinimigo1() {

		posicaoX = parseInt($("#inimigo1").css("left"));
		$("#inimigo1").css("left",posicaoX - velocidade);
		$("#inimigo1").css("top",posicaoY);
			
			if (posicaoX<=-400) {
				score -= 50; // Decrease score if enemy is not destroyed.
				posicaoY = parseInt(Math.random() * 334);
				$("#inimigo1").css("left", 900);
				$("#inimigo1").css("top",posicaoY);
				
			}
	} //Fim da função moveinimigo1()

	function moveinimigo2() {
        posicaoX = parseInt($("#inimigo2").css("left"));
		$("#inimigo2").css("left",posicaoX-velocidade2);
				
		if (posicaoX<=-200) {
			reposicionaInimigo2()	
		}
	} // Fim da função moveinimigo2()

	/* SHOOTING */

	function missile() {
	
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
		$("#disparo").css("left",posicaoX+22); 
	
			if (posicaoX>920) {
				window.clearInterval(tempoDisparo);
				tempoDisparo=null;
				$("#disparo").remove();
				shot1Ready=true;
			}
		} // Fecha executaDisparo()
	} // Fecha disparo()

	function bomb() {
	
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
			$("#missile").css("transform", "rotate("+ posicaoX / 10 +"deg)");
		
			if (posiY > 464) {
				window.clearInterval(tempoDisparo);
				tempoDisparo=null;
				$("#missile").remove();
				shot2Ready=true;
						
					   }
		} // Fecha executaDisparo()
	} // Fecha disparo()
	
	/* COLISION DETECTION */

	function colisao() {
		var colPlayerChopper = ($("#jogador").collision($("#inimigo1")));
		var colPlayerTruck = ($("#jogador").collision($("#inimigo2")));
		var chopperHit = ($("#disparo").collision($("#inimigo1")));
		var truckHit = ($("#disparo").collision($("#inimigo2")));
		var chopperBomb = ($("#missile").collision($("#inimigo1")));
		var truckBomb = ($("#missile").collision($("#inimigo2")));
		var rescued = ($("#jogador").collision($("#amigo")));
		var ranOver = ($("#inimigo2").collision($("#amigo")));
		
		// jogador com o inimigo1
			
			if (colPlayerChopper.length>0) {
				
			inimigo1X = parseInt($("#inimigo1").css("left"));
			inimigo1Y = parseInt($("#inimigo1").css("top"));
			explosao1(inimigo1X - 65,inimigo1Y);
		
			posicaoY = parseInt(Math.random() * 334);
			$("#inimigo1").css("left",1150);
			$("#inimigo1").css("top",posicaoY);
				
			playerDown(); 
			curEnergy--;
			}

		// jogador com o inimigo2 
			if (colPlayerTruck.length>0) {
				
			playerDown();
			curEnergy--;
			reposicionaInimigo2();
				
			}	

		// Disparo com o inimigo1
				
			if (chopperHit.length>0 || chopperBomb.length>0) {
								
			inimigo1X = parseInt($("#inimigo1").css("left"));
			inimigo1Y = parseInt($("#inimigo1").css("top"));
						
			explosao1(inimigo1X,inimigo1Y);
			score += 100;
			velocidade += 1;
			//Displace projectiles
			if (chopperHit.length>0)
			$("#disparo").css("left",950);
			if (chopperBomb.length>0)
			$("#missile").css("top",1000);
				
			posicaoY = parseInt(Math.random() * 334);
			$("#inimigo1").css("left",920);
			$("#inimigo1").css("top",posicaoY);
				
			}	
		
		// Disparo com o inimigo2
				
			if (truckHit.length>0 || truckBomb.length>0) {
				
				//Displace projectiles
				if (truckHit.length>0)
				$("#disparo").css("left",950);
				if (truckBomb.length>0)
				$("#missile").css("top",1000);

				reposicionaInimigo2();
				score += 50;
				velocidade += 0.5;
			}		

		// Player and Ally. Will only rescue if within door range.
		
			if (rescued.length>0 && parseInt($("#amigo").css("right")) > 770) {
				$("#amigo").remove();
				score += 200;
				safe++;
			}
		// Enemy and Ally			
			if (ranOver.length>0) {
				explosao3();
				$("#amigo").remove();
				score -= 500;
				lost++;
			}
			
		} //Fim da função colisao()

	/* EXPLOSIONS */

	function playerDown() {
		//If a collision already exists and element is transparent
		$("#brokenScreen").remove();
		//Add explosion and broken glass entity.
		$("#fundoGame").append("<div id='brokenScreen'></div");
		//Background added via jquery, compatibility issues.
		$("#brokenScreen").css("background-image", "url(imgs/broken_screen.png)");
		//Add player flashing effect on hit.
		$("#jogador").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
		//Fades broken screen effect.
		$("#brokenScreen").animate({opacity:0}, 1000);
			
		}

	function explosao1(inimigo1X,inimigo1Y) {
		//Add explosion entity.
		$("#fundoGame").append("<div id='explosao1'></div");
		
		//Background added via jquery, compatibility issues.
		$("#explosao1").css("background-image", "url(imgs/explosao.png)");
		
		//Arguably improves readability
		var exp=$("#explosao1");
		
		exp.css("top", inimigo1Y);
		exp.css("left", inimigo1X);
		exp.animate({width:200, opacity:0}, "slow");
		
	
		var tempoExplosao=window.setInterval(removeExplosao, 1000);
	
			function removeExplosao() {
			
				exp.remove();
				window.clearInterval(tempoExplosao);
				tempoExplosao=null;
			
			}
		
	} // Fim da função explosao1()
	
	//Truck Explosion
	function explosao2(inimigo2X,inimigo2Y) {
	
		$("#fundoGame").append("<div id='explosao2'></div");
		$("#explosao2").css("background-image", "url(imgs/explosao.png)");
		var div2=$("#explosao2");
		div2.css("top", inimigo2Y);
		div2.css("left", inimigo2X +20);
		div2.animate({width:200, opacity:0}, "slow");
		
		var tempoExplosao2=window.setInterval(removeExplosao2, 1000);
		
			function removeExplosao2() {
				
				div2.remove();
				window.clearInterval(tempoExplosao2);
				tempoExplosao2=null;
				
			}
				
		} // Fim explosao2()

	//The executive meets his demise. The client will hear of his bravery.
	function explosao3() {
		$("#fundoGame").append("<div id='explosao3' class='anima4'></div");
		$("#explosao3").css("left", parseInt($("#amigo").css("left")));
		var tempoExplosao3=window.setInterval(resetaExplosao3, 1000);
		
			function resetaExplosao3() {
				$("#explosao3").remove();
				window.clearInterval(tempoExplosao3);
				tempoExplosao3=null;
			}
	}
	/* UI FUNCTIONS */

	//Score
	function gameScore() {
		$("#placar").html("<h2> Score: " + score + " | Attending Meeting: " + safe + " | Terminated: " + lost + "</h2>");
		
	} 

	function energyUI() {
	
		if (curEnergy==3) {
			$("#energy").css("background-image", "url(imgs/energia3.png)");
		}
	
		if (curEnergy==2) {
			$("#energy").css("background-image", "url(imgs/energia2.png)");
		}
	
		if (curEnergy==1) {
			$("#energy").css("background-image", "url(imgs/energia1.png)");
		}
	
		if (curEnergy==0) {
			$("#energy").css("background-image", "url(imgs/energia0.png)");
			gameOver == true;			
		}
	
	} // Fim da função energia()

	/* OTHER FUNCTIONS */

	//Reposiciona Inimigo2
	function reposicionaInimigo2() {
	
		inimigo2X = parseInt($("#inimigo2").css("left"));
		inimigo2Y = parseInt($("#inimigo2").css("top"));
		explosao2(inimigo2X,inimigo2Y);
				
		$("#inimigo2").remove();

		var truckRespawner=window.setInterval(respawnTruck, 1000);
			
			function respawnTruck() {
			window.clearInterval(truckRespawner);
			truckRespawner=null;
				
				if (gameOver==false) {
				//Truck will respawn from 1200 ~ 2200 px from left
				$('#inimigo2').css("left", (Math.random() * 1000 + 1200))
				$("#fundoGame").append("<div id=inimigo2></div");
				
				}
				
			}	
		}	
	
}
