alert("Js loaded!");
    const btnCatchMe = document.querySelector("#btnCatchMe");

    const timerText = document.querySelector("#timer");

    const gameOver = document.querySelector("#gameOver");

    const colorPoints = document.querySelector("#colorPoints")
    const finalPoints = document.querySelector("#finalPoints");
    const finalPointsColor = document.querySelector("#finalPointsColor");
    const highScoreColor = document.querySelector("#highScoreColor");

    const displayGame = document.querySelector("#displayGame");
    const btnStartGame = document.querySelector("#btnStartGame");
    const btnPlayAgain = document.querySelector("#btnPlayAgain");

    let points = 0;
    let time = 3;
    let highScore = 0;
    let moveInterval;

    let maxX;
    let maxY;

    let btnCatchMeWidth;
    let btnCatchMeHeight;

    const gameArea = document.querySelector("#gameArea");

    function calcGameArea (){
        // Full size of the button
        btnCatchMeHeight = btnCatchMe.offsetHeight;
        btnCatchMeWidth = btnCatchMe.offsetWidth;

        // How much can button go in the box without going out of the box, gameArea.clientHeight/clientWidth -
        // - is the size of the box without the border so it could calculate the actual visible size with size and padding!
        // Note: be careful when adding a padding it may change the size!
        maxY = gameArea.clientHeight - btnCatchMeHeight;
        maxX = gameArea.clientWidth - btnCatchMeWidth;
    }

        function moveBtn (){
            btnCatchMe.style.top = Math.floor((Math.random() * maxY) + 1) + "px";
            btnCatchMe.style.left = Math.floor((Math.random() * maxX) + 1) + "px";
        }

        function decreaseBtnSize(){

            if (points >= 10 && points < 20) {
                btnCatchMe.style.width = btnCatchMeWidth - btnCatchMeWidth * 0.1 + "px";
                btnCatchMe.style.height = btnCatchMeHeight - btnCatchMeHeight * 0.1 + "px"
            }
            else if(points >= 20 && points < 30){
                btnCatchMe.style.width = btnCatchMeWidth - btnCatchMeWidth * 0.2 + "px";
                btnCatchMe.style.height = btnCatchMeHeight - btnCatchMeHeight * 0.2 + "px"
            }
        }

        function updatePointsColors (){
            if (points < 10){
                    colorPoints.style.color = "red";
                }
                else if (points >= 10 && points < 20)
                {
                    colorPoints.style.color = "orange";
                }
                else if (points >= 20){
                    colorPoints.style.color = "green";
                }
        }

        function updateFinalPointsColors (){
            if (points < 10){
                finalPointsColor.style.color = "red";
            }
            else if (points >= 10 && points < 20)
            {
                finalPointsColor.style.color = "orange";
            }
            else if (points >= 20){
                finalPointsColor.style.color = "green";
            }
        }

        function updateHighScoreColor (){
            if (highScore < 10){
                highScoreColor.style.color = "red";
            }
            else if (highScore >= 10 && highScore < 20)
            {
                highScoreColor.style.color = "orange";
            }
            else if (highScore >= 20){
                highScoreColor.style.color = "green";
            }
        }

        function timerForGame (){
            const timer = setInterval(function (){
                time--;
                updatePointsColors();
                if(time <= 30 && time >= 0){
                    timerText.textContent = `${time}`;
                }
                else {
                    clearInterval(timer);
                    saveHighScore();
                    displayGameOver();

                }
            },1000)
        }

        function loadHighScore (){
            if (localStorage.getItem("HighScore")){
                highScore = (Number(localStorage.getItem("HighScore")));
                highScoreColor.textContent = `${highScore}`;
            }else {
                highScore = 0;
                highScoreColor.textContent = `${highScore}`;
            }
        }

        function saveHighScore(){
            highScoreColor.textContent = `${highScore}`;

            if (points > highScore){
                highScore = points;
                localStorage.setItem("HighScore", `${highScore}`);
                highScoreColor.textContent = `${highScore}`;
            }
        }

        function displayGameOver (){
            btnCatchMe.style.display = "none";
            gameOver.textContent = "GAME OVER";

            finalPoints.style.display = "block";
            finalPointsColor.textContent = `${points}`;

            btnPlayAgain.style.display = "block";
        }

        function autoMoveBtn (){

            if (points >= 10 && points < 20 && time >= 0){
                moveInterval = setInterval(function (){
                    moveBtn();
                }, 800)
            }
            else if (points >= 20 && points < 30 && time >= 0){
                moveInterval = setInterval(function (){
                    moveBtn();
                }, 500)
            }
            else if (points >= 30 && time >= 0){
                moveInterval = setInterval(function (){
                    moveBtn();
                }, 250)
            }
            else {
                clearInterval(moveInterval);
            }
        }

        function resetGame (){

            btnCatchMe.style.width = btnCatchMeWidth + "px";
            btnCatchMe.style.height = btnCatchMeHeight + "px";

            points = 0;
            time = 30;
            btnCatchMe.style.display = "block";
            gameOver.textContent = "";
            finalPointsColor.style.display = "none";
            colorPoints.textContent = points;

            calcGameArea();
            moveBtn();
            decreaseBtnSize();

            // Colors:
            updatePointsColors();
            updateFinalPointsColors();
            updateHighScoreColor();
            // Timer:
            timerForGame();
            timerText.textContent = time;
            autoMoveBtn();

            btnPlayAgain.style.display = "none";
        }

        function playAgain (){
            resetGame();
        }

        function startGame() {
            displayGame.style.display = "block";
            btnStartGame.style.display = "none";

            resetGame();
        }

    btnCatchMe.addEventListener("click", function (){
        points++;
        colorPoints.textContent = `${points}`;

        decreaseBtnSize();
        updatePointsColors();
        updateFinalPointsColors();
        updateHighScoreColor();
        moveBtn();

    })

    btnPlayAgain.addEventListener("click", function (){
        playAgain();
    })

    loadHighScore();
