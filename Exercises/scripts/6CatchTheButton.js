    const btnCatchMe = document.querySelector("#btnCatchMe");
    const colorPoints = document.querySelector("#colorPoints")
    const timerText = document.querySelector("#timer");
    const gameOver = document.querySelector("#gameOver");
    const finalPoints = document.querySelector("#finalPoints");
    let points = 0;
    let time = 30;

    const gameArea = document.querySelector("#gameArea");
    let btnCatchMeHeight = btnCatchMe.offsetHeight;
    let btnCatchMeWidth = btnCatchMe.offsetWidth;

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
                }
                else if (points >= 10 && points < 20)
                {
                   colorPoints.style.color = "orange";
                }
                else if (points >= 20){
                    colorPoints.style.color = "green";
                }
        }

        setInterval(function (){
            time--;
            if(time <= 30 && time >= 0){
                timerText.textContent = `${time}`;
            }
            else {
                btnCatchMe.style.display = "none";
                gameOver.textContent = "GAME OVER";

            }
        },1000)

        btnCatchMe.addEventListener("click", function (){
            points++;
            colorPoints.textContent = `${points}`;

                moveBtn();
                decreaseBtnSize();
                pointsColors();
        })


