alert("Js loaded!");
    const btnCatchMe = document.querySelector("#btnCatchMe");

    const timerText = document.querySelector("#timer");

    const gameOver = document.querySelector("#gameOver");

    const colorPoints = document.querySelector("#colorPoints")
    const finalPoints = document.querySelector("#finalPoints");
    const finalPointsColor = document.querySelector("#finalPointsColor");
    const highScoreColor = document.querySelector("#highScoreColor");
    const WelcomeMessage = document.querySelector("#WelcomeMessage");

    const displayGame = document.querySelector("#displayGame");
    const btnStartGame = document.querySelector("#btnStartGame");
    const btnPlayAgain = document.querySelector("#btnPlayAgain");

    const clickSound = new Audio("tools/sounds/PointsSoundOnClick.mp3");
    const gameOverSound = new Audio("tools/sounds/GameOverSound.mp3");
    const levelUpSound = new Audio("tools/sounds/LevelUpSound.mp3");

    let originalBtnCatchMeWidth;
    let originalBtnCatchMeHeight;

    let points = 0;
    let time;
    let highScore = 0;
    let moveInterval;
    let btnIntervalSpeed = 1000;
    let oldBtnIntervalSpeed;

    let maxX;
    let maxY;

    const gameArea = document.querySelector("#gameArea");

    const LEVEL_2 = 10;
    const LEVEL_3 = 20;
    const LEVEL_4 = 30;
    const LEVEL_5 = 40;

    const LEVELS = [LEVEL_2,LEVEL_3,LEVEL_4,LEVEL_5];

        function playClickSound (){
            clickSound.currentTime = 0;
            clickSound.play();
        }

        function playGameOverSound(){
            gameOverSound.currentTime = 0;
            gameOverSound.play();
        }

        function playLevelUpSound(){
            levelUpSound.currentTime = 0;
            levelUpSound.play();
        }

        function levelCheck (){
            if (LEVELS.includes(points)){
                playLevelUpSound();
            }
        }

        function calcGameArea (){
        // How much can button go in the box without going out of the box, gameArea.clientHeight/clientWidth -
        // - is the size of the box without the border so it could calculate the actual visible size with size and padding!
        // Note: be careful when adding a padding it may change the size!
        maxY = gameArea.clientHeight - originalBtnCatchMeHeight;
        maxX = gameArea.clientWidth - originalBtnCatchMeWidth;
    }

        function saveOriginalBtnSize() {
        if (!originalBtnCatchMeWidth) {
            originalBtnCatchMeWidth = btnCatchMe.offsetWidth;
            originalBtnCatchMeHeight = btnCatchMe.offsetHeight;
        }
    }

        function moveBtn (){
            btnCatchMe.style.top = Math.floor((Math.random() * maxY) + 1) + "px";
            btnCatchMe.style.left = Math.floor((Math.random() * maxX) + 1) + "px";
        }

        function decreaseBtnSize(){

            if (points >= LEVEL_2 && points < LEVEL_3) {
                btnCatchMe.style.width = originalBtnCatchMeWidth - originalBtnCatchMeWidth * 0.1 + "px";
                btnCatchMe.style.height = originalBtnCatchMeHeight - originalBtnCatchMeHeight * 0.1  + "px"
            }
            else if(points >= LEVEL_3 && points < LEVEL_4){
                btnCatchMe.style.width = originalBtnCatchMeWidth - originalBtnCatchMeWidth * 0.2 + "px";
                btnCatchMe.style.height = originalBtnCatchMeHeight - originalBtnCatchMeHeight * 0.2 + "px"
            }
            else if(points >= LEVEL_4 && points < LEVEL_5){
                btnCatchMe.style.width = originalBtnCatchMeWidth - originalBtnCatchMeWidth * 0.3 + "px";
                btnCatchMe.style.height = originalBtnCatchMeHeight - originalBtnCatchMeHeight * 0.3  + "px"
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

            if (points < LEVEL_2 && points >= 0){
                btnIntervalSpeed = 1000;
            }
            else if (points < LEVEL_3 && points >= LEVEL_2){
                btnIntervalSpeed = 800;
            }
            else if (points < LEVEL_4 && points >= LEVEL_3){
                btnIntervalSpeed = 500;
            }
            else if (points >= LEVEL_4){
                btnIntervalSpeed = 250;
            }
        }

        function startAutoMoveBtn (){
            clearInterval(moveInterval);

            if(btnIntervalSpeed < 1000){
                moveInterval = setInterval(function (){
                    moveBtn();
                }, btnIntervalSpeed);
            }
        }

        function checkBtnInterval(){
            if (oldBtnIntervalSpeed !== btnIntervalSpeed){
                startAutoMoveBtn();
            }
        }

        function resetBtnSize(){
            btnCatchMe.style.width = originalBtnCatchMeWidth + "px";
            btnCatchMe.style.height = originalBtnCatchMeHeight + "px";
        }

        function resetGame (){

            resetBtnSize();

            points = 0;
            time = 30;
            btnCatchMe.style.display = "flex";
            gameOver.textContent = "";
            finalPointsColor.style.display = "none";
            colorPoints.textContent = points;
            btnIntervalSpeed = 1000;

            saveOriginalBtnSize();
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
            WelcomeMessage.style.display = "none";

            resetGame();
        }

        function displayGameOver (){
            playGameOverSound();

            btnCatchMe.style.display = "none";
            gameOver.textContent = "GAME OVER";

            finalPoints.style.display = "block";
            finalPointsColor.style.display = "flex";
            finalPointsColor.textContent = `${points}`;

            btnPlayAgain.style.display = "block";
        }

        function updateLevel(){
            levelCheck();

            decreaseBtnSize();

            setBtnSpeedInterval();

            checkBtnInterval();
        }



    btnCatchMe.addEventListener("click", function (){

        playClickSound();
        updateLevel();

        points++;
        colorPoints.textContent = `${points}`;

        updateLevel();

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