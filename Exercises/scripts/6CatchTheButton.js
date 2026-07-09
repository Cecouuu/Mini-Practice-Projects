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

    let maxX;
    let maxY;

    const gameArea = document.querySelector("#gameArea");

    const difficulties = [
        {
            level: 1,
            points: 0,
            speed: 1000,
            size: 1,
            color: "red"
        },
        {
            level: 2,
            points: 10,
            speed: 800,
            size: 0.1,
            color: "orange"
        },
        {
            level: 3,
            points: 20,
            speed: 500,
            size: 0.2,
            color: "green"
        },
        {
            level: 4,
            points: 30,
            speed: 250,
            size: 0.3,
            color: "green"
        },
        {
            level: 5,
            points: 40,
            speed: 185,
            size: 0.4,
            color: "green"
        }
    ]

        let currentDifficulty;

        function setCurrentDifficulty(){
            for (let i = 0; i < difficulties.length; i++){
                if (points >= difficulties[i].points){
                    currentDifficulty = difficulties[i];
                }
                if (points === difficulties[i].points){
                    playSound(levelUpSound);
                }
            }
        }

        function playSound (sound){
            sound.currentTime = 0;
            sound.play();
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
            btnCatchMe.style.width = originalBtnCatchMeWidth - originalBtnCatchMeWidth * currentDifficulty.size + "px";
            btnCatchMe.style.height = originalBtnCatchMeHeight - originalBtnCatchMeHeight * currentDifficulty.size  + "px"
        }

        function setColorForPoints(score){
            if (score < 10){
                return "red"
            }
            else if (score < 20)
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

            if (points > highScore){
                highScore = points;
                localStorage.setItem("HighScore", `${highScore}`);
                updateHighScoreText();
            }
            updateColorsForPoints();
        }

        function startAutoMoveBtn (){
            if (btnIntervalSpeed !== currentDifficulty.speed){
                clearInterval(moveInterval);
                btnIntervalSpeed = currentDifficulty.speed;
                moveInterval = setInterval(moveBtn, currentDifficulty.speed);
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
            playSound(gameOverSound);

            btnCatchMe.style.display = "none";
            gameOver.textContent = "GAME OVER";

            finalPoints.style.display = "flex";
            finalPointsColor.style.display = "flex";
            finalPointsColor.textContent = `${points}`;

            btnPlayAgain.style.display = "block";
        }

        function updateLevel(){
            setCurrentDifficulty();

            decreaseBtnSize();

            startAutoMoveBtn();
        }

    btnCatchMe.addEventListener("click", function (){

        playSound(clickSound);

        points++;
        colorPoints.textContent = `${points}`;

        updateLevel();

        updateColorsForPoints();

        moveBtn();
    })

    btnStartGame.addEventListener("click", startGame);

    btnPlayAgain.addEventListener("click", playAgain);

    loadHighScore();