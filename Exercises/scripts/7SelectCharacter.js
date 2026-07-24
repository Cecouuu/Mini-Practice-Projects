const btnWarrior = document.querySelector("#btnWarrior");
const btnMage = document.querySelector("#btnMage");
const btnArcher = document.querySelector("#btnArcher");
const btnAssassin = document.querySelector("#btnAssassin");
const DisplayCurrentCharacter = document.querySelector("#DisplayCurrentCharacter");


characters = [
    {
        button: btnWarrior,
        color: `#9a1818`,
        character: {
            name: "Warrior",
            health: 150,
            damage: 40,
            speed: 14
        },
    },
    {
        button: btnMage,
        color: `#6700c5`,
        character: {
            name: "Mage",
            health: 150,
            damage: 54,
            speed: 11
        },
    },
    {
        button: btnArcher,
        color: `#5bf65b`,
        character: {
            name: "Archer",
            health: 150,
            damage: 35,
            speed: 17
        },
    },
    {
        button: btnAssassin,
        color: "#AA336A",
        character: {
            name: "Assassin",
            health: 150,
            damage: 70,
            speed: 25
        }
    }
]

    characters.forEach(function(item){
        item.button.addEventListener(`click`,function (){
            showCharacter(item.character,item.button, item.color);
        })
    })


function showCharacter(chosenCharacter,button,color){
    for(let i = 0; i < characters.length; i++){
        characters[i].button.style.backgroundColor = "#6c757d";
    }
    button.style.backgroundColor = color;
    DisplayCurrentCharacter.innerHTML = `<br> 
        Name: ${chosenCharacter.name}<br>
        Health: ${chosenCharacter.health}<br>
        Damage: ${chosenCharacter.damage}<br>
        Speed: ${chosenCharacter.speed}`;
}