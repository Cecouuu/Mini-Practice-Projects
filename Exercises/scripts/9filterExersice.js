const players  = [
    { name: `Ivan`, age: 23, alive: true, mission: `Find Food`, successOfMission: true},
    { name: `Georgi`, age: 35, alive: false, mission: `Survive the invasion`, successOfMission: false},
    { name: `Milen`, age: 25, alive: false, mission: `Escape prison`, successOfMission: false},
    { name: `Petar`, age: 31, alive: true, mission: `Find iron`,  successOfMission: true},
]

const alivePlayers = players.filter(player => player.alive).map(player => player.name);

console.log(alivePlayers);


const checkMission = players.filter(player => player.alive).filter(player => player.successOfMission).map(player => {
    return `${player.name} is alive, he had mission to ${player.mission}, and it is completed`;
})
checkMission.forEach((user) => {
    console.log(user);
})

const checkAgeAndAlive = players.filter(player => {
    const alive = player.alive !== false;
    console.log(`${player.name} is alive and it is ${alive}.`);
    players.filter(player => {
        const ageOver30 = player.age > 30;
        console.log(`${player.name} is above age 30!`);
        return ageOver30;
    })
    return alive;
})

checkAgeAndAlive.forEach((player) => {
    console.log(player)
})