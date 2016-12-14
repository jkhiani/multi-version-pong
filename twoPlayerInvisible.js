function twoPlayerInvisibleInstructions(){
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
		canvas.style.background = 'url("twoPlayerInstructions.jpg")';
		x++;

		if (x==200){
			twoPlayerInvisible();
			clearInterval(interval);
			canvas.style.background = '#eaeaea';
		}
	}

	interval = setInterval(changeBg, 20);
}

function twoPlayerInvisible(){

	endlessButton.disabled = true;

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
	var paddlePosition2 = (canvas.width-paddleWidth1)/2;;
	var rPressP2 = false;
	var lPressP2 = false;

	var p1Score = 0;
	var p2Score = 0;

	var interval;

	var alpha = 1.5;

	function drawBall(){
			context.beginPath();
			context.arc(ballX, ballY, ballRadius, 0, Math.PI*2);
			context.fillStyle = "rgba(0,0,0,"+alpha+")";
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

	function drawMidLine(){
			context.beginPath();
			context.moveTo(0, canvas.height/2);
			context.lineTo(canvas.width, canvas.height/2);
			context.stroke();
			context.closePath();
		}

	function drawScore(){
			context.beginPath();
			context.font = "20px Georgia";
			context.fillText(p2Score, 20, canvas.height/2 - 20);
			context.fillText(p1Score, canvas.width-20, canvas.height/2 + 20);
			context.fillStyle = "#000000";
			context.fill();
			context.closePath();
		}

	function draw(){
		context.clearRect(0,0, canvas.width, canvas.height);
		drawBall();
		drawPaddle1();
		drawPaddle2();
		drawMidLine();
		drawScore();

		if (ballY < canvas.height/2 && ySpd<0){
			alpha = alpha-0.025;
		}
		else if (ballY < canvas.height/2 && ySpd>0){
			alpha = alpha+0.025;
		}
		else if (ballY > canvas.height/2 && ySpd<0){
			alpha = alpha-0.025;
		}
		else if (ballY >canvas.height/2 && ySpd>0){
			alpha = alpha+0.025;
		}

		if (ballY + ySpd < ballRadius){
			ySpd = -ySpd;
		}
		else if (ballY + ySpd > canvas.height-ballRadius){
			if (ballX > paddlePosition1 && ballX < paddlePosition1 + paddleWidth1){
				ySpd = -ySpd;
			}
			else{
				p2Score++;
				if (p2Score == 5){
					alert("PLAYER 2 WINS");
					clearInterval(interval);
					homeCanvas.style.display = 'block';
					enable();
					canvas.style.display = 'none';
					homeCanvas.style.display = 'block';
					context.clearRect(0,0,canvas.width, canvas.height);
				}
				ySpd = -ySpd;
			}
		}
		else if (ballY + ySpd - ballRadius < 1){
			if (ballX > paddlePosition2 && ballX < paddlePosition2 + paddleWidth2){
				ySpd = -ySpd;
			}
			else{
				p1Score++;
				if (p1Score == 5){
					alert("PLAYER 1 WINS");
					clearInterval(interval);
					homeCanvas.style.display = 'block';
					enable();
					canvas.style.display = 'none';
					homeCanvas.style.display = 'block';
					context.clearRect(0,0,canvas.width, canvas.height);
				}
			}
		}

		if (ballX + xSpd > canvas.width-ballRadius || ballX + xSpd < ballRadius){
				xSpd = -xSpd;
			}
		if (ballY + ySpd > canvas.width-ballRadius || ballY + ySpd < ballRadius){
			ySpd = -ySpd;
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


		ballX += xSpd;
		ballY += ySpd;
	}

	interval = setInterval(draw, 12);

	document.addEventListener("keydown", keyDownHandler, false);
	document.addEventListener("keyup", keyUpHandler, false);

		function keyDownHandler(e){
			if (e.keyCode == 39){
				rPressP1 = true;
			}
			else if (e.keyCode == 37){
				lPressP1 = true;
			}
			else if (e.keyCode == 65){
				lPressP2 = true;
			}
			else if (e.keyCode == 68){
				rPressP2 = true;
			}
		}
		function keyUpHandler(e){
			if (e.keyCode == 39){
				rPressP1 = false;
			}
			else if (e.keyCode == 37){
				lPressP1 = false;
			}
			else if (e.keyCode == 65){
				lPressP2 = false;
			}
			else if (e.keyCode == 68){
				rPressP2 = false;
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