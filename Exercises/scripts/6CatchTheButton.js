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
    let time = 10;
    let highScore = 0;

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

        function pointsColors (){
            if (points < 10){
                    colorPoints.style.color = "red";
                    finalPointsColor.style.color = "red";
                    highScoreColor.style.color = "red";
                }
                else if (points >= 10 && points < 20)
                {
                    colorPoints.style.color = "orange";
                    finalPointsColor.style.color = "orange";
                    highScoreColor.style.color = "orange";
                }
                else if (points >= 20){
                    colorPoints.style.color = "green";
                    finalPointsColor.style.color = "green";
                    highScoreColor.style.color = "green";
                }
        }

        function timerForGame (){
            const timer = setInterval(function (){
                time--;
                pointsColors();
                if(time <= 30 && time >= 0){
                    timerText.textContent = `${time}`;
                }
                else {
                    clearInterval(timer);

                    btnCatchMe.style.display = "none";
                    gameOver.textContent = "GAME OVER";

                    finalPoints.style.display = "block";
                    finalPointsColor.textContent = `${points}`;

                    saveHighScore();
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

        function startGame() {
            displayGame.style.display = "block";
            btnStartGame.style.display = "none";

            calcGameArea();
            moveBtn();
            decreaseBtnSize();
            pointsColors();
            timerForGame();

        }

    btnCatchMe.addEventListener("click", function (){
        points++;
        colorPoints.textContent = `${points}`;

        decreaseBtnSize();
        pointsColors();
        moveBtn();
    })

    loadHighScore();
