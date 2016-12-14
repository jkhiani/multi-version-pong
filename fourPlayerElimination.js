function fourPlayerEliminationInstructions(){
	disable();

	var homeCanvas = document.getElementById("startCanvas");
	var context2 = homeCanvas.getContext("2d");

	homeCanvas.style.display = 'none';

	var canvas = document.getElementById("endlessCanvas");
	var context = canvas.getContext("2d");

	canvas.style.display = 'block';

	var interval;
	var x = 0;

	function changeBg(){
		canvas.style.background = 'url("fourPlayerEliminationInstructions.jpg")';
		x++;

		if (x==300){
			fourPlayerElimination();
			clearInterval(interval);
			canvas.style.background = '#eaeaea';
		}
	}

	interval = setInterval(changeBg, 20);
}

function fourPlayerElimination(){

	disable();

	var homeCanvas = document.getElementById("startCanvas");
	var context2 = homeCanvas.getContext("2d");

	homeCanvas.style.display = 'none';

	var canvas = document.getElementById("endlessCanvas");
	var context = canvas.getContext("2d");

	canvas.style.display = 'block';

	var ballX = Math.floor(Math.random() * canvas.width-50) + 50;
	var ballY = canvas.height-10;
	var xSpd = 5;
	var ySpd = -5;
	var ballRadius = 10;

	var paddleHeight1 = 10;
	var paddleWidth1 = 75;
	var paddleMoveSpd1 = 10;
	var paddlePosition1 = (canvas.width-paddleWidth1)/2;
	var rPressP1 = false;
	var lPressP1 = false;

	var paddleHeight2 = 10;
	var paddleWidth2 = 75;
	var paddleMoveSpd2 = 10;
	var paddlePosition2 = (canvas.width-paddleWidth2)/2;;
	var rPressP2 = false;
	var lPressP2 = false;

	var paddleHeight3 = 75;
	var paddleWidth3 = 10;
	var paddleMoveSpd3 = 10;
	var paddlePosition3 = (canvas.height-paddleHeight3)/2;;
	var uPressP3 = false;
	var dPressP3 = false;

	var paddleHeight4 = 75;
	var paddleWidth4 = 10;
	var paddleMoveSpd4 = 10;
	var paddlePosition4 = (canvas.height-paddleHeight4)/2;;
	var uPressP4 = false;
	var dPressP4 = false;

	var p1Score = 5;
	var p2Score = 5;
	var p3Score = 5;
	var p4Score = 5;

	var interval;

	var left = [1,2,3,4];
	var holder;
	var turnDelay = 0;

	function drawBall(){
			context.beginPath();
			context.arc(ballX, ballY, ballRadius, 0, Math.PI*2);
			context.fillStyle = "#000000";
			context.fill();
			context.closePath();
		}

	function drawPaddle1(){
		context.beginPath();
		context.rect(paddlePosition1, canvas.height-paddleHeight1, paddleWidth1, paddleHeight1);
		context.fillStyle = "#000000";
		context.fill();
		context.closePath();
	}

	function drawPaddle2(){
			context.beginPath();
			context.rect(paddlePosition2, 0, paddleWidth2, paddleHeight2);
			context.fillStyle = "#000000";
			context.fill();
			context.closePath();
		}

	function drawPaddle3(){
			context.beginPath();
			context.rect(0, paddlePosition3, paddleWidth3, paddleHeight3);
			context.fillStyle = "#000000";
			context.fill();
			context.closePath();
		}

	function drawPaddle4(){
			context.beginPath();
			context.rect(canvas.width-paddleWidth4, paddlePosition4, paddleWidth4, paddleHeight4);
			context.fillStyle = "#000000";
			context.fill();
			context.closePath();
		}

	function drawScore(){
			context.beginPath();
			context.font = "20px Georgia";
			context.fillText(p1Score, canvas.width/2-5, canvas.height-25);
			context.fillText(p2Score, canvas.width/2-5, 30);
			context.fillText(p3Score, 15, canvas.height/2);
			context.fillText(p4Score, canvas.width-30, canvas.height/2);
			context.fillStyle = "#000000";
			context.fill();
			context.closePath();
		}

	function draw(){
		context.clearRect(0,0, canvas.width, canvas.height);
		drawBall();
		drawPaddle1();
		drawPaddle2();
		drawPaddle3();
		drawPaddle4();
		drawScore();

		if (ballY + ySpd < ballRadius){
			ySpd = -ySpd;
		}
		else if (ballY + ySpd > canvas.height-ballRadius){
			if (ballX > paddlePosition1 && ballX < paddlePosition1 + paddleWidth1){
				ySpd = -ySpd;
			}
			else{
				p1Score--;
				ySpd = -ySpd;
				if (p1Score == 0){
					paddleWidth1 = canvas.width;
					paddlePosition1 = 0;
					holder = left.indexOf(1);
					left.splice(holder, 1);
				}
			}
		}
		else if (ballY + ySpd - ballRadius < 1){
			if (ballX > paddlePosition2 && ballX < paddlePosition2 + paddleWidth2){
				ySpd = -ySpd;
			}
			else{
				p2Score--;
				if (p2Score == 0){
					paddlePosition2 = 0;
					paddleWidth2 = canvas.width;
					holder = left.indexOf(2);
					left.splice(holder, 1);
				}
			}
		}
		if (ballX + xSpd > canvas.width-ballRadius || ballX + xSpd < ballRadius){
			if ( (ballY < paddlePosition4 || ballY > paddlePosition4 + paddleHeight4) && ballX + xSpd > canvas.width-ballRadius){
				p4Score--;
				if (p4Score == 0){
					paddlePosition4 = 0;
					paddleHeight4 = canvas.height;
					holder = left.indexOf(4);
					left.splice(holder, 1);
				}
			}
			else if ( (ballY < paddlePosition3 || ballY > paddlePosition3 + paddleHeight3) && ballX + xSpd < ballRadius){
				p3Score--;
				if (p3Score == 0){
					paddlePosition3 = 0;
					paddleHeight3 = canvas.height;
					holder = left.indexOf(3);
					left.splice(holder, 1);
				}
			}
			xSpd = -xSpd;
			}
		if (ballY + ySpd > canvas.width-ballRadius || ballY + ySpd < ballRadius){
			ySpd = -ySpd;
		}



		if (left.length == 1 && turnDelay == 1){
			alert("PLAYER "+left+" WINS!");
			clearInterval(interval);
			homeCanvas.style.display = 'block';
			enable();
			canvas.style.display = 'none';
			homeCanvas.style.display = 'block';
			context.clearRect(0,0,canvas.width, canvas.height);
		}
		else if (left.length == 1){
			turnDelay++;
		}




		if (rPressP1 && paddlePosition1 < canvas.width-paddleWidth1){
			paddlePosition1 += paddleMoveSpd1;
		}
		else if (lPressP1 && paddlePosition1 > 0){
			paddlePosition1 -= paddleMoveSpd1;
		}

		if (rPressP2 && paddlePosition2 < canvas.width-paddleWidth2){
			paddlePosition2 += paddleMoveSpd2;
		}
		else if (lPressP2 && paddlePosition2 > 0){
			paddlePosition2 -= paddleMoveSpd2;
		}

		if (uPressP3 && paddlePosition3 > 0){
			paddlePosition3 -= paddleMoveSpd3;
		}
		else if (dPressP3 && paddlePosition3 < canvas.height-paddleHeight3){
			paddlePosition3 += paddleMoveSpd3;
		}

		if (uPressP4 && paddlePosition4 > 0){
			paddlePosition4 -= paddleMoveSpd4;
		}
		else if (dPressP4 && paddlePosition4 < canvas.height-paddleHeight3){
			paddlePosition4 += paddleMoveSpd4;
		}


		ballX += xSpd;
		ballY += ySpd;
	}

	interval = setInterval(draw, 12);

	document.addEventListener("keydown", keyDownHandler, false);
	document.addEventListener("keyup", keyUpHandler, false);

		function keyDownHandler(e){
			if (e.keyCode == 86){
				rPressP1 = true;
			}
			else if (e.keyCode == 67){
				lPressP1 = true;
			}
			else if (e.keyCode == 85){
				lPressP2 = true;
			}
			else if (e.keyCode == 73){
				rPressP2 = true;
			}
			else if (e.keyCode == 87){
				uPressP3 = true;
			}
			else if (e.keyCode == 83){
				dPressP3 = true;
			}
			else if (e.keyCode == 38){
				uPressP4 = true;
			}
			else if (e.keyCode == 40){
				dPressP4 = true;
			}
		}
		function keyUpHandler(e){
			if (e.keyCode == 86){
				rPressP1 = false;
			}
			else if (e.keyCode == 67){
				lPressP1 = false;
			}
			else if (e.keyCode == 85){
				lPressP2 = false;
			}
			else if (e.keyCode == 73){
				rPressP2 = false;
			}
			else if (e.keyCode == 87){
				uPressP3 = false;
			}
			else if (e.keyCode == 83){
				dPressP3 = false;
			}
			else if (e.keyCode == 38){
				uPressP4 = false;
			}
			else if (e.keyCode == 40){
				dPressP4 = false;
			}
			else if (e.keyCode == 27){
				clearInterval(interval);
				homeCanvas.style.display = 'block';
				enable();
				canvas.style.display = 'none';
				homeCanvas.style.display = 'block';
				context.clearRect(0,0,canvas.width, canvas.height);
			}
		}	
}
