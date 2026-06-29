    const btnCatchMe = document.querySelector("#btnCatchMe");
    const pointsText = document.querySelector("#displayPoints");
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
            if (points >= 10 && points < 20){

            }
        }

        btnCatchMe.addEventListener("click", function (){
            points++;
            pointsText.textContent = `Points: ${points}`;

                moveBtn();
                decreaseBtnSize();
        })


