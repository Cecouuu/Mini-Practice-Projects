const players  = [
    { name: `Ivan`, age: 23, alive: true, mission: `Find Food`, successOfMission: true},
    { name: `Georgi`, age: 35, alive: false, mission: `Survive the invasion`, successOfMission: false},
    { name: `Milen`, age: 25, alive: false, mission: `Escape prison`, successOfMission: false},
    { name: `Petar`, age: 31, alive: true, mission: `Find iron`,  successOfMission: true},
    { name: `Misho`, age: 67, alive: true, mission: `Found treasure`,  successOfMission: true}
]

const alivePlayers = players.filter(player => player.alive).map(player => player.name);

console.log(alivePlayers);


const checkMission = players.filter(player => player.alive && player.successOfMission).map(player => {
    return `${player.name} is alive, he had mission to ${player.mission}, and it is completed`;
})
checkMission.forEach((user) => {
    console.log(user);
})

const checkAgeAndAlive = players.filter(player => player.alive && player.age > 30).map(player => {
    return `${player.name} is ${player.age} old, and it is alive.`
})

checkAgeAndAlive.forEach((player) => {
    console.log(player)
})