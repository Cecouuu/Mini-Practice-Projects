const foods = [
    {id: 1, name: `apple`, price: 4.49, quantity: 10, stocked: true},
    {id: 2, name: `orange`, price: 3.89, quantity: 23, stocked: true},
    {id: 3, name: `banana`, price: 2.99, quantity: 3, stocked: false},
    {id: 4, name: `strawberry`, price: 5.19, quantity: 64, stocked: false},
    {id: 5, name: `kiwi`, price: 8.39, quantity: 120, stocked: true}
];

const stockedFoods = foods.filter((food) => food.stocked).map((food) => {
    return `${food.name} has ${food.quantity} quantity, and it is stocked!`;
});

stockedFoods.forEach((food) => {console.log(food)});

const foodName = foods.map((food) => food.name);
console.log(foodName);

const numbers = [10, 310, 110, 25, 35, 67, 50];

let SubtractionFromLastNumber  = numbers.map((number, index, fullArray) => {
    return number - fullArray[fullArray.length - 1];
});
SubtractionFromLastNumber.forEach((number) => {console.log(number)});