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
	var safe = 2; // Pilot and narrator :P
	var lost = 0;
	var curEnergy=3;

	/*** ENEMY VARIABLES ***/
	var velocidade = 7; // Enemy chopper speed
	var velocidade2 =5; // Truck speed
	var posicaoY = parseInt(Math.random() * 334); // Enemy Vertical Position
	
	/*** SOUND VARIABLES ***/
	var missileSound=document.getElementById("missileSound");
	var somDisparo=document.getElementById("somDisparo");
	var somExplosao=document.getElementById("somExplosao");
	var musica=document.getElementById("musica");
	var somGameover=document.getElementById("somGameover");
	var somPerdido=document.getElementById("somPerdido");
	var somResgate=document.getElementById("somResgate");

	
	//Background music loop
	musica.addEventListener("ended", function(){ musica.currentTime = 0; musica.play(); }, false);
	musica.play();

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
			missileSound.currentTime = 0;
			missileSound.play();
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
			somDisparo.currentTime = 0;
			somDisparo.play();
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
			
			if (colPlayerChopper.length>0 && parseInt($("#inimigo1").css("left")) < 130) {
				
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
				somExplosao.currentTime = 0; // still playing
				somExplosao.play();					
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
				somExplosao.currentTime = 0;
				somExplosao.play();
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
				somResgate.play();
				$("#amigo").remove();
				score += 200;
				safe++;
			}
		// Enemy and Ally			
			if (ranOver.length>0) {
				somPerdido.play();
				explosao3();
				$("#amigo").remove();
				score -= 500;
				lost++;
			}
			
		} //Fim da função colisao()

	/* EXPLOSIONS */

	function playerDown() {
		somExplosao.currentTime = 0;
		somExplosao.play();
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
			gameEnd();			
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
	//Função GAME OVER
	function gameEnd() {
		gameOver=true;
		musica.pause();
		somGameover.play();
		
		window.clearInterval(jogo.timer);
		jogo.timer=null;
		
		$("#jogador").remove();
		$("#inimigo1").remove();
		$("#inimigo2").remove();
		$("#amigo").remove();
		
		$("#fundoGame").append("<div id='fim'></div>");
		
		var message = '';
		//ENDINGS 
		if (0 <= score && score < 500) 
			message = `<h2>Familiar Grounds</h2> <p>As the aircraft crumbled apart, the pilot skillfully managed to make an emergency landing. 
			With the chopper half sunk in what appears to be a swimming pool, you notice a peculiar potted plant with surprising familiarity. Could it be..?
			After a quick turn to the other side, there is a very angry man approaching, sporting a purple shorts/crocs combo. 
			By the look of his face, there are now no doubts you've seen that plant at your manager's summer residence...<p>`

		if (500 <= score && score < 1500) 
			message = `<h2>Landmark</h2><p>The tail rotor weakens and the chopper starts to spin. Before the worst happens, the aircraft descends in a spiral, somehow slowly
			enough to perch over a flat rooftop without taking critical damage. There is zero chance it will ever fly out of there, however.
			A scared shopkeeper shows up through a stairway that leads down to... A convenience store. They have a landline phone booth, which works despite the air comms jamming.
			How convenient! Your boss said that it would be rough, but the C plan was already in motion. A bit afterwards, holding a cold can and gazing upon the skies which almost took your life,
			a bit ago, you see a rocket dart by... Was there somebody strapped to it? Anyways, the meeting DID HAPPEN and a new skyscraper was built soon after. 
			A year later, the chopper still stands proudly over the roof, and the former convenience store became a tourist attraction, now a bar named "The Choplifter".<p>`
		
		if (1500 <= score && score < 2000) 
			message = `<h2>Mission Complete</h2><p>Finally you're flying over the right district. The last hit triggered a severe gas leak however, and the pilot is now forced to land. 
			Looking on the bright side, the conference building is just a block ahead! It seems there is a barricade and a bunch of armed people on the other side. On the back entrance however, a team signals you to come forth. 
			Upon your arrival, they start to grow uneasy, but after a few words it becomes clear that you are just civilians. As they saw people clad in green uniforms descending from an armed vehicle, apparently you were mistaken
			for reinforcements... It would be nice to understand what is going on, but the clock is ticking and you know what to prioritize. Client first, always! Your team rushes to the conference room and everything seems to be 
			running smoothly, if not by a huge noise outside. A bit later, the very company CEO enters the room! "Oh, it seems our designated executives made it in time! I do apologize for being a little late".
			Impressed by both the company commitment and the number of green executives in the room, a big deal has been closed and a whole residential complex was built after the war ceased.
			<b>In the aftermath, you got a promotion and a nice bonus!</b><p><p>What's the truth behind the CEO? What's going on? Get a higher score to discover!</p>`

		if (score >= 2100) 
			message = `<h2>Medal Awarded</h2><p>The conference building is already on sight! A barricade is set near the entry and armed personnel are aiming towards the office. 
			The pilot starts to descend anyways, but the speed is not going down! That last hit messed up the main rotor control! 
			The chopper sleighs through the courtyard grass with such a grace that would make Santa himself proud, while a bunch of bushes aid in slowing down the aircraft.   
			It spins sideways at last and the resulting halt is still abrupt, causing an executive to be launched through the side door. Yet not an ordinary executive! He started as an office boy in the company years before
			and after so many bumps in crowded streets and so many almost run-overs from rushed drivers when moving from conference to conference every day, his reflexes are honed to perfection! After pulling out a soleil grade stunt,
			he lands on his feet, but the cumulated centripetal force hurls his suitcase in the temporal bone of a chiefly figure standing near the barricade. As the poor soul drops knocked cold, some surrounding men
			drop their weapon in shock, while others shout and prepare to take aim. A split second later however everybody is fleeing in despair, as if a nightmarish ghost was standing behind the still dizzy and befuddled Joe.
			Seizing the opportunity, a third party breaks from the building towards the unconscious man. A huge noise follows on and a VTVL rocket lands in the courtyard. No wonder everybody was running away. 
			Clad in bright green and orange, the very CEO alights from it, uttering a single phrase: "We're almost late!". As the client shall NEVER be left waiting, everything is left behind as ` + safe + ` businessmen and the CEO rush 
			into the conference room. Despite the initial shock, things are going smoothly until the secretary dashes in to turn the TV, as the news were announcing: "a key leader that played a major role in the war was located and captured,
			apparently by some special forces that landed on an assault helicopter. Fearing the disadvantage brought by the potential information leak and the loss of leadership, the other side surrendered. The civil war is over!"
			After the authors of such an unthinkable feat came to public, the company achieved great success during the post-war reconstruction.
			<b>In the aftermath, you were awarded a medal of honor by the president – and also a promotion and a nice bonus!</b><p>`
	
		if (score < 0) {

			message = `<h2>True Identity</h2><p>Critical systems are down! As the aircraft comes to halt amongst the snapping of many branches, you discover yourself still alive, trapped in the canopy.
			It seems the executive that invited you to start this journey is also yet alive, and still as grumpy... "Sequoias? How in heavens? Had you any idea to where were we heading? Where did you get your license again?
			Wait... You're not the new developer intern that was supposed to arrive today... Are you?<p>`

			$("#fim").html('<h1> Game Over </h1><p>You have travelled ' + Math.abs(score)/100 + " km away from the company HQ. BUT INTO THE WRONG DIRECTION!</p>" + message +
			'<div id="restart" onClick="restart()"><h3>Play Again</h3></div>');

		}
		else {
			$("#fim").html('<h1> Game Over </h1><p>You have travelled ' + score/100 + " km away from the company HQ.</p>" + message +
			'<div id="restart" onClick="restart()"><h3>Play Again</h3></div>');
		}
	} // GameEnd finished

	
}

function restart() {
	somGameover.pause();
	$("#fim").remove();
	start();
} //Restart finished