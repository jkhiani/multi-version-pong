function endlessInstructions(){
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
		canvas.style.background = 'url("endlessInstructions.jpg")';
		x++;

		if (x==200){
			endlessImpossible();
			clearInterval(interval);
			canvas.style.background = '#eaeaea';
		}
	}

	interval = setInterval(changeBg, 20);
	
}

function endlessImpossible(){

	disable();

	var homeCanvas = document.getElementById("startCanvas");
	var context2 = homeCanvas.getContext("2d");

	homeCanvas.style.display = 'none';

	var canvas = document.getElementById("endlessCanvas");
	var context = canvas.getContext("2d");

	canvas.style.display = 'block';

	var ballX = Math.floor(Math.random() * canvas.width-50) + 50;
	var ballY = canvas.height/2;
	var xSpd = 5;
	var ySpd = -5;
	var ballRadius = 10;

	var paddleHeight1 = 10;
	var paddleWidth1 = 75;
	var paddleMoveSpd1 = 10;
	var paddlePosition1 = (canvas.width-paddleWidth1)/2;
	var rPress = false;
	var lPress = false; 

	var compPaddleHeight = 10;
	var compPaddleWidth = 75;
	var compPaddleMoveSpd = 10;
	var compPaddlePosition = ballX;

	var interval;

	var userScore = 0;
	var compScore = 0;

	function drawScore(){
			context.beginPath();
			context.font = "20px Georgia";
			context.fillText(compScore, 20, canvas.height/2 - 20);
			context.fillText(userScore, canvas.width-20, canvas.height/2 + 20);
			context.fillStyle = "#000000";
			context.fill();
			context.closePath();
		}

	function drawBall(){
			context.beginPath();
			context.arc(ballX, ballY, ballRadius, 0, Math.PI*2);
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

	function drawPaddle1(){
			context.beginPath();
			context.rect(paddlePosition1, canvas.height-paddleHeight1, paddleWidth1, paddleHeight1);
			context.fillStyle = "#000000";
			context.fill();
			context.closePath();
		}

	function drawCompPaddle(){
			context.beginPath();
			context.rect(compPaddlePosition, 0, compPaddleWidth, compPaddleHeight);
			context.fillStyle = "#000000";
			context.fill();
			context.closePath();
		}

	function draw(){
		context.clearRect(0,0,canvas.width, canvas.height);
		drawBall();
		drawMidLine();
		drawPaddle1();
		drawCompPaddle();
		drawScore();

		if (ballY + ySpd < ballRadius){
			ySpd = -ySpd;
		}
		else if (ballY + ySpd > canvas.height-ballRadius){
			if (ballX > paddlePosition1 && ballX < paddlePosition1 + paddleWidth1){
				ySpd = -ySpd;
			}
			else{
				compScore++;
				ySpd = -ySpd;
			}
		}
		else if (ballY + ySpd - ballRadius < 1){
			if (ballX > compPaddlePosition && ballX < compPaddlePosition + compPaddleWidth){
				ySpd = -ySpd;
			}
			else{
				userScore++;
			}
		}

		if (ballX + xSpd > canvas.width-ballRadius || ballX + xSpd < ballRadius){
				xSpd = -xSpd;
			}
			if (ballY + ySpd > canvas.width-ballRadius || ballY + ySpd < ballRadius){
				ySpd = -ySpd;
			}

			if (rPress && paddlePosition1 < canvas.width-paddleWidth1){
				paddlePosition1+=paddleMoveSpd1;
			}
			else if (lPress && paddlePosition1>0){
				paddlePosition1 -= paddleMoveSpd1;
			}

		ballX += xSpd;
		ballY += ySpd;

		compPaddlePosition = ballX - (compPaddleWidth/2);

	}

	interval = setInterval(draw, 12);

	document.addEventListener("keydown", keyDownHandler, false);
	document.addEventListener("keyup", keyUpHandler, false);

		function keyDownHandler(e){
			if (e.keyCode == 39){
				rPress = true;
			}
			else if (e.keyCode == 37){
				lPress = true;
			}
		}
		function keyUpHandler(e){
			if (e.keyCode == 39){
				rPress = false;
			}
			else if (e.keyCode == 37){
				lPress = false;
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