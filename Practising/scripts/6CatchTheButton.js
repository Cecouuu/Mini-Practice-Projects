    const btnCatchMe = document.querySelector("#btnCatchMe");
    const pointsText = document.querySelector("#displayPoints");
    let points = 0;

    const gameArea = document.querySelector("#gameArea");

    const maxY = gameArea.clientHeight - btnCatchMe.offsetHeight;
    const maxX = gameArea.clientWidth - btnCatchMe.offsetWidth;

    console.log(gameArea.clientWidth);
    console.log(gameArea.clientHeight);

    console.log(btnCatchMe.offsetWidth);
    console.log(btnCatchMe.offsetHeight);

    console.log(maxX);
    console.log(maxY);


        btnCatchMe.addEventListener("click", function (){
            points++;
            pointsText.textContent = `Points: ${points}`;

            console.log(maxX);
            console.log(maxY);

            const randomX = Math.floor(Math.random() * maxX);
            const randomY = Math.floor(Math.random() * maxY);

            console.log(randomX, randomY);

            btnCatchMe.style.top = Math.floor((Math.random() * maxY) + 1) + "px";
            btnCatchMe.style.left = Math.floor((Math.random() * maxX) + 1) + "px";
        })