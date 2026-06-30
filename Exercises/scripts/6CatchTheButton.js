    const btnCatchMe = document.querySelector("#btnCatchMe");

    const timerText = document.querySelector("#timer");

    const gameOver = document.querySelector("#gameOver");

    const colorPoints = document.querySelector("#colorPoints")
    const finalPoints = document.querySelector("#finalPoints");
    const finalPointsColor = document.querySelector("#finalPointsColor");

    const displayGame = document.querySelector("#displayGame");
    const btnStartGame = document.querySelector("#btnStartGame");
    const btnPlayAgain = document.querySelector("#btnPlayAgain");

    let points = 0;
    let time = 30;

    const gameArea = document.querySelector("#gameArea");
    // Full size of the button
    let btnCatchMeHeight = btnCatchMe.offsetHeight;
    let btnCatchMeWidth = btnCatchMe.offsetWidth;

    // How much can button go in the box without going out of the box, gameArea.clientHeight/clientWidth -
    // - is the size of the box without the border so it could calculate the actual visible size with size and padding!
    // Note: be careful when adding a padding it may change the size!
    const maxY = gameArea.clientHeight - btnCatchMeHeight;
    const maxX = gameArea.clientWidth - btnCatchMeWidth;

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
                }
                else if (points >= 10 && points < 20)
                {
                   colorPoints.style.color = "orange";
                   finalPointsColor.style.color = "orange";
                }
                else if (points >= 20){
                    colorPoints.style.color = "green";
                    finalPointsColor.style.color = "green";
                }
        }

        function startGame() {
            displayGame.style.display = "block";
            btnStartGame.style.display = "none";

            const timer = setInterval(function (){
                time--;
                pointsColors();
                if(time <= 30 && time >= 0){
                    timerText.textContent = `${time}`;
                }
                else {
                    btnCatchMe.style.display = "none";
                    gameOver.textContent = "GAME OVER";

                    clearInterval(timer);

                    finalPoints.style.display = "block";
                    finalPointsColor.textContent = `${points}`;
                }
            },1000)


        }
        btnCatchMe.addEventListener("click", function (){
        points++;
        colorPoints.textContent = `${points}`;

        moveBtn();
        decreaseBtnSize();
        pointsColors();

    })







