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
    let time;
    let highScore = 0;
    let moveInterval;
    let btnIntervalSpeed = 1000;
    let oldBtnIntervalSpeed;

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

        function setColorForPoints(score){
            if (score < 10){
                return "red"
            }
            else if (score >= 10 && score < 20)
            {
                return "orange"
            }
            else if (score >= 20){
                return "green"
            }
        }

        function updateColorsForPoints (){
            colorPoints.style.color = setColorForPoints(points);
            finalPointsColor.style.color = setColorForPoints(points);
            highScoreColor.style.color = setColorForPoints(highScore);
        }

        function updateHighScoreText(){
            highScoreColor.textContent = highScore;
        }

        function timerForGame (){
            const timer = setInterval(function (){
                time--;
                if(time <= 30 && time >= 0){
                    timerText.textContent = `${time}`;
                }
                else {
                    clearInterval(timer);
                    saveHighScore();
                    displayGameOver();
                    clearInterval(moveInterval);
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
            updateHighScoreText();

            if (points > highScore){
                highScore = points;
                localStorage.setItem("HighScore", `${highScore}`);
                updateHighScoreText();
            }
            updateColorsForPoints();
        }

        function setBtnSpeedInterval (){
            // Sets the old speed before changes so it could change when is needed in the function checkBtnInterval();
            oldBtnIntervalSpeed = btnIntervalSpeed;

            if (points < 10 && points >= 0){
                btnIntervalSpeed = 1000;
            }
            else if (points < 20 && points >= 10){
                btnIntervalSpeed = 800;
            }
            else if (points < 30 && points >= 20){
                btnIntervalSpeed = 500;
            }
            else if (points >= 30){
                btnIntervalSpeed = 250;
            }
        }

        function startAutoMoveBtn (){
            clearInterval(moveInterval);

            moveInterval = setInterval(function (){
                moveBtn();
            }, btnIntervalSpeed);
        }

        function checkBtnInterval(){
            if (oldBtnIntervalSpeed !== btnIntervalSpeed){
                startAutoMoveBtn();
            }
        }

        function resetBtnSize(){
            btnCatchMe.style.width = btnCatchMeWidth + "px";
            btnCatchMe.style.height = btnCatchMeHeight + "px";
        }

        function resetGame (){

            resetBtnSize();

            points = 0;
            time = 3;
            btnCatchMe.style.display = "block";
            gameOver.textContent = "";
            finalPointsColor.style.display = "none";
            colorPoints.textContent = points;
            btnIntervalSpeed = 1000;

            calcGameArea();

            moveBtn();
            startAutoMoveBtn();

            // Colors:
            updateColorsForPoints();

            // Timer:
            timerForGame();

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

        function displayGameOver (){
            btnCatchMe.style.display = "none";
            gameOver.textContent = "GAME OVER";

            finalPoints.style.display = "flex";
            finalPointsColor.style.display = "flex";
            finalPointsColor.textContent = `${points}`;

            btnPlayAgain.style.display = "block";
        }

        function updateDifficulty(){

            decreaseBtnSize();

            setBtnSpeedInterval();

            checkBtnInterval();
        }

    btnCatchMe.addEventListener("click", function (){
        points++;
        colorPoints.textContent = `${points}`;

        updateDifficulty();

        updateColorsForPoints();

        moveBtn();
    })

    btnStartGame.addEventListener("click",function (){
        startGame();
    });

    btnPlayAgain.addEventListener("click", function (){
        playAgain();
    })

    loadHighScore();