alert("JavaScript Loaded");

    const btnCatchMe = document.querySelector("#btnCatchMe");
    const pointsText = document.querySelector("#displayPoints");
    let points = 0;

    const gameArea = document.querySelector("#gameArea");
    let btnCatchMeHeight = btnCatchMe.offsetHeight;
    let btnCatchMeWidth = btnCatchMe.offsetWidth;

    const maxY = gameArea.clientHeight - btnCatchMeHeight;
    const maxX = gameArea.clientWidth - btnCatchMeWidth;



        btnCatchMe.addEventListener("click", function (){
            points++;
            pointsText.textContent = `Points: ${points}`;

            btnCatchMe.style.top = Math.floor((Math.random() * maxY) + 1) + "px";
            btnCatchMe.style.left = Math.floor((Math.random() * maxX) + 1) + "px";


        })


