// alert("Js loaded!");
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
    const btnBack = document.querySelector("#btnBack");
    const btnPlayAgain = document.querySelector("#btnPlayAgain");

    const clickSound = new Audio("tools/sounds/PointsSoundOnClick.mp3");
    const gameOverSound = new Audio("tools/sounds/GameOverSound.mp3");
    const levelUpSound = new Audio("tools/sounds/LevelUpSound.mp3");


    const btnEasyGameMode = document.querySelector("#btnEasyGameMode");
    const btnMediumGameMode = document.querySelector("#btnMediumGameMode");
    const btnHardGameMode = document.querySelector("#btnHardGameMode");
    const DisplayCurrentGameMode = document.querySelector("#DisplayCurrentGameMode");
    const CurrentGameModeBox = document.querySelector("#CurrentGameModeBox");
    const EmptyGameModeAlert = document.querySelector("#EmptyGameModeAlert");

    let originalBtnCatchMeWidth;
    let originalBtnCatchMeHeight;

    let points = 0;
    let time;
    let moveInterval;
    let btnIntervalSpeed = 1000;
    let timer;

    let maxX;
    let maxY;

    const gameArea = document.querySelector("#gameArea");
    let currentGameMode;
    let currentDifficulty;

    const gameMode = [
        {
            name: `Easy mode`,
            storageKey: "easyHighScore",
            time: 3,
            highScore: 0,
            difficulties: [
                {
                    level: 1,
                    points: 0,
                    speed: 1000,
                    size: 0,
                    color: "#f60213"
                },
                {
                    level: 2,
                    points: 10,
                    speed: 900,
                    size: 0.05,
                    color: "#fa900c"
                },
                {
                    level: 3,
                    points: 20,
                    speed: 800,
                    size: 0.1,
                    color: "#1b5ae8"
                },
                {
                    level: 4,
                    points: 30,
                    speed: 650,
                    size: 0.125,
                    color: "#06f3d8"
                },
                {
                    level: 5,
                    points: 40,
                    speed: 500,
                    size: 0.175,
                    color: "#61ff00"
                }
            ]
        },
        {
            name: `Medium mode`,
            storageKey: "mediumHighScore",
            time: 30,
            highScore: 0,
            difficulties: [
                {
                    level: 1,
                    points: 0,
                    speed: 900,
                    size: 0,
                    color: "#f60213"
                },
                {
                    level: 2,
                    points: 10,
                    speed: 800,
                    size: 0.1,
                    color: "#fa900c"
                },
                {
                    level: 3,
                    points: 20,
                    speed: 700,
                    size: 0.2,
                    color: "#1b5ae8"
                },
                {
                    level: 4,
                    points: 30,
                    speed: 500,
                    size: 0.25,
                    color: "#06f3d8"
                },
                {
                    level: 5,
                    points: 40,
                    speed: 414,
                    size: 0.314,
                    color: "#61ff00"
                }
            ]
        },
        {
            name: `Hard mode`,
            storageKey: "hardHighScore",
            time: 20,
            highScore: 0,
            difficulties: [
                {
                    level: 1,
                    points: 0,
                    speed: 800,
                    size: 0.2,
                    color: "#f60213"
                },
                {
                    level: 2,
                    points: 10,
                    speed: 600,
                    size: 0.3,
                    color: "#fa900c"
                },
                {
                    level: 3,
                    points: 20,
                    speed: 550,
                    size: 0.35,
                    color: "#1b5ae8"
                },
                {
                    level: 4,
                    points: 30,
                    speed: 400,
                    size: 0.4,
                    color: "#06f3d8"
                },
                {
                    level: 5,
                    points: 40,
                    speed: 314,
                    size: 0.514,
                    color: "#61ff00"
                }
            ]
        }
    ]

    const gameModeButtons = [
        {
            button: btnEasyGameMode,
            mode: gameMode[0]
        },
        {
            button: btnMediumGameMode,
            mode: gameMode[1]
        },
        {
            button: btnHardGameMode,
            mode: gameMode[2]
        }
    ]

        gameModeButtons.forEach(function (item){
            item.button.addEventListener("click",function(){
                gameModeBtnSelector(item.button, item.mode)
            })
        })

        function gameModeBtnSelector (selectedBtn, mode){
            for (let i = 0; i < gameModeButtons.length; i++){
                gameModeButtons[i].button.style.backgroundColor = "#6c757d";
            }
            selectedBtn.style.backgroundColor = "#064b77";
            currentGameMode = mode;
            DisplayCurrentGameMode.textContent = `${mode.name}`;
            loadHighScore();
        }

        function setCurrentDifficulty(){
            for (let i = 0; i < currentGameMode.difficulties.length; i++){
                if (points >= currentGameMode.difficulties[i].points){
                    currentDifficulty = currentGameMode.difficulties[i];
                }
                else {
                    break;
                }
                if (points === currentGameMode.difficulties[i].points && points !== 0){
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

        function updateButtonSize(){
            btnCatchMe.style.width = originalBtnCatchMeWidth - originalBtnCatchMeWidth * currentDifficulty.size + "px";
            btnCatchMe.style.height = originalBtnCatchMeHeight - originalBtnCatchMeHeight * currentDifficulty.size  + "px"
        }

        function setColorForPoints(score){
            for (let i = currentGameMode.difficulties.length - 1; i >= 0; i--){
                if (score >= currentGameMode.difficulties[i].points){
                    return currentGameMode.difficulties[i].color;
                }
            }
        }

        function updateColorsForPoints (){
            colorPoints.style.color = setColorForPoints(points);
            finalPointsColor.style.color = setColorForPoints(points);
            highScoreColor.style.color = setColorForPoints(currentGameMode.highScore);
        }

        function updateHighScoreText(){
            highScoreColor.textContent = currentGameMode.highScore;
        }

        function timerForGame (){
            timer = setInterval(function (){
                time--;
                if(time >= 0){
                    updateColorsForPoints();
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
            if (localStorage.getItem(currentGameMode.storageKey)){
                currentGameMode.highScore = (Number(localStorage.getItem(currentGameMode.storageKey)));
                highScoreColor.textContent = `${currentGameMode.highScore}`;
            }else {
                currentGameMode.highScore = 0;
                highScoreColor.textContent = `${currentGameMode.highScore}`;
            }
        }

        function saveHighScore(){

            if (points > currentGameMode.highScore){
                currentGameMode.highScore = points;
                localStorage.setItem(currentGameMode.storageKey, `${currentGameMode.highScore}`);
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
            time = currentGameMode.time;
            timerText.textContent = time;
            btnCatchMe.style.display = "flex";
            gameOver.textContent = "";
            finalPointsColor.style.display = "none";
            colorPoints.textContent = points;
            btnIntervalSpeed = 1000;
            btnBack.style.display = "none";

            saveOriginalBtnSize();
            calcGameArea();
            setCurrentDifficulty();

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

            if (currentGameMode !== undefined){
                displayGame.style.display = "block";
                btnStartGame.style.display = "none";
                WelcomeMessage.style.display = "none";
                CurrentGameModeBox.style.display = "none";
                EmptyGameModeAlert.style.display = "none";
                btnBack.style.display = "none";
                resetGame();
            }
            else {
                EmptyGameModeAlert.style.display = "flex";
            }
        }

        function displayGameOver (){
            playSound(gameOverSound);

            btnCatchMe.style.display = "none";
            gameOver.textContent = "GAME OVER";

            finalPoints.style.display = "flex";
            finalPointsColor.style.display = "flex";
            finalPointsColor.textContent = `${points}`;

            btnPlayAgain.style.display = "block";
            btnBack.style.display = "block"
        }

        function updateLevel(){
            setCurrentDifficulty();

            updateButtonSize();

            startAutoMoveBtn();
        }

        function backToStartMenu(){
            clearInterval(timer);
            resetGame();
            displayGame.style.display = "none";
            btnStartGame.style.display = "block";
            WelcomeMessage.style.display = "block";
            CurrentGameModeBox.style.display = "block";
            EmptyGameModeAlert.style.display = "none";
            btnBack.style.display = "none";
        }

    btnBack.addEventListener("click", backToStartMenu);

    btnCatchMe.addEventListener("click", function (){

        playSound(clickSound);

        points++;
        colorPoints.textContent = `${points}`;

        updateLevel();

        updateColorsForPoints();

        moveBtn();
    });

    btnStartGame.addEventListener("click", startGame);

    btnPlayAgain.addEventListener("click", playAgain);