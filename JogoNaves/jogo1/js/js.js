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
		D: 68
		}
	
	jogo.pressionou = [];

	/*** ENEMY VARIABLES ***/
	var velocidade = 5; // Enemy speed
	var posicaoY = parseInt(Math.random() * 334); // Enemy Vertical Position


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
	
	/*** FUNCTION DEFINITIONS BELOW ***/

	function loop() {
	
	movefundo();
	movejogador();
	moveExecutive();
	moveinimigo1();
	moveinimigo2();

	} // Fim da função loop()

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
		//Chama função Disparo	
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

	
		
}