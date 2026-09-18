const foods = [
    {id: 1, name: `apple`, price: 4.49, quantity: 10, stocked: true},
    {id: 2, name: `orange`, price: 3.89, quantity: 23, stocked: true},
    {id: 3, name: `banana`, price: 2.99, quantity: 3, stocked: false},
    {id: 4, name: `strawberry`, price: 5.19, quantity: 64, stocked: false},
    {id: 5, name: `kiwi`, price: 8.39, quantity: 120, stocked: true}
];

const firstFoodAbove4$ = foods.find((food) => food.price > 4);
console.log(firstFoodAbove4$);

const firstFoodNotStocked = foods.find((food) => !food.stocked);
console.log(firstFoodNotStocked);

const checkingFood = foods.find((food) => food.name === `Grapes`);

if (checkingFood){
    console.log(`We have the food that you searched and it is: ${checkingFood.name}`);
}
else{
    console.log(`We don't have the food that you searched!`)
}