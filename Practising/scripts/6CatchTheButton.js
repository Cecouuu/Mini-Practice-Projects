    const btnCatchMe = document.querySelector("#btnCatchMe");
    const pointsText = document.querySelector("#displayPoints");
    let points = 0;



        btnCatchMe.addEventListener("click", function (){
            points++;
            pointsText.textContent = `Points: ${points}`;
            btnCatchMe.style.top = Math.floor((Math.random() * 500) + 1);
            btnCatchMe.style.left = Math.floor((Math.random() * 500) + 1);
        })