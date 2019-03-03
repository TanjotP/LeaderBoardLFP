$(document).ready(function(){
	
document.body.onmousedown = function() { return false; } //so page is unselectable

	//Canvas stuff
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();
	var mx, my;
    var gamescreen;
    var pic2 = new Image();     // 
    var borderimg = new Image();
    var numberOfPlayers;
    var citizenPlaying=[];
	/////////////////////////////////
	////////////////////////////////
	////////	GAME INIT
	///////	Runs this code right away, as soon as the page loads.
	//////	Use this code to get everything in order before your game starts 
	//////////////////////////////
	/////////////////////////////
	function init()
	{
	//////////
	///STATE VARIABLES
	
	numberOfPlayers = 0;
	
	gamescreen = 1;
	

	//////////////////////
	///GAME ENGINE START
	//	This starts your game/program
	//	"paint is the piece of code that runs over and over again, so put all the stuff you want to draw in here
	//	"60" sets how fast things should go
	//	Once you choose a good speed for your program, you will never need to update this file ever again.

	if(typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop = setInterval(paint, 60);
	}

	init();	
	


	function newCit(name,scs){
        var newCit = {
            name:name,
            scs:scs,
            visible:true
        }
        citizenPlaying.push(newCit);
    }
	
	
	///////////////////////////////////////////////////////
	//////////////////////////////////////////////////////
	////////	Main Game Engine
	////////////////////////////////////////////////////
	///////////////////////////////////////////////////
	function paint()
	{
		ctx.globalAlpha = 1;
        ctx.fillStyle='grey';
        ctx.fillRect(0,0,w,h);
        if(gamescreen == 1){ 
            ctx.fillStyle='grey';
			ctx.fillRect(0,0,w,h);
            pic2.src="titlepageimg.png";				//game screen for title screen, button to play
            ctx.drawImage(pic2,0,0,w,h);
			ctx.font='10pt Courier New';
			ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
			ctx.fillText("click anywhere to continue...", 10,470);
			ctx.fillStyle = "rgba(255, 255, 255, 0)";
		}
        if(gamescreen == 2){ 	
			ctx.fillStyle='pink';
			ctx.fillRect(0,0,w,h);
            borderimg.src="border.png";				//game screen for title screen, button to play
            ctx.drawImage(borderimg, 100,200,w-200,40);

			ctx.font='16pt Courier New';
            ctx.fillStyle='black';
			ctx.fillText("Enter names...", w/2 - 80,30);
            ctx.fillRect(w/2 -50,400,100,40);
            ctx.fillStyle='white';
            ctx.fillText("SUBMIT", w/2 - 50 + 5,425);
            if( mx > w/2-50 && mx < (w/2-50) +100 && my >400 && my <440){
                ctx.fillStyle='yellow';
                ctx.globalAlpha=0.2;
                ctx.fillRect(w/2 -52,401,103,47);
            }
        }
		if(gamescreen == 3){ 	
			ctx.fillStyle='pink';
			ctx.fillRect(0,0,w,h);
			ctx.font='16pt Courier New';
            ctx.fillStyle='black';
			ctx.fillText("Leaderboard", w/2 - 80,30);
            ctx.font='8pt Courier New';
            ctx.fillText("Press 1 to simulate an update in score",10,700);
			ctx.font='16pt Courier New';

            newCit("Tanjot",1000);
            newCit("Queenie",1000);
            newCit("Ryan",1000);
            newCit("Amy",1000);
            newCit("Devansh",1000);
            for(var i = 0 ; i < 5; i++){
                ctx.fillText(citizenPlaying[i].name + "-----" +
                             citizenPlaying[i].scs, 20, 100+(i*100));
                if(citizenPlaying[i].scs < 0){
                    gamescreen = 4;
                }
            }

        }
        if(gamescreen == 4){
            ctx.fillStyle='grey';
			ctx.fillRect(0,0,w,h);
			ctx.font='12pt Courier New';
            ctx.fillStyle='black';
			ctx.fillText("Someone's SCS was lower than 0", w/3,30);  
        }
	
	}////////////////////////////////////////////////////////////////////////////////END PAINT/ GAME ENGINE
	

	
	////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////
	/////	MOUSE LISTENER 
	//////////////////////////////////////////////////////
	/////////////////////////////////////////////////////
	





	/////////////////
	// Mouse Click
	///////////////
	canvas.addEventListener('click', function (evt){
		if(gamescreen == 1 && mx > 0 && my >0){
		  gamescreen = gamescreen +1;
            citizenPlaying[i].scs = 1000;
        }else if(gamescreen == 2 && mx > w/2-50 && mx < (w/2-50) +100 && my >400 && my <440){
		  gamescreen = 3;
        }else if(gamescreen == 3 && mx < 10 && my < 10){
            gamescreen = 0;
            init();
        }
       

	}, false);

	


	canvas.addEventListener ('mouseout', function(){pause = true;}, false);
	canvas.addEventListener ('mouseover', function(){pause = false;}, false);

      	canvas.addEventListener('mousemove', function(evt) {
        	var mousePos = getMousePos(canvas, evt);

		mx = mousePos.x;
		my = mousePos.y;

      	}, false);


	function getMousePos(canvas, evt) 
	{
	        var rect = canvas.getBoundingClientRect();
        	return {
          		x: evt.clientX - rect.left,
          		y: evt.clientY - rect.top
        		};
      	}
      

	///////////////////////////////////
	//////////////////////////////////
	////////	KEY BOARD INPUT
	////////////////////////////////


	

	window.addEventListener('keydown', function(evt){
		var key = evt.keyCode;
        if(key == 49){
            for(var i = 0; i < 5; i++){
               citizenPlaying[i].scs += Math.floor(Math.floor((Math.random()) * 100 - 50*i));

            }
        }
		
	//p 80
	//r 82
	//1 49
	//2 50
	//3 51
		
	}, false);




});
