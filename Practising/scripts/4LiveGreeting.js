const input = document.querySelector("#username");
const output = document.querySelector("#output");
input.addEventListener("input", function (){
    if (!input.value){
        output.textContent = "Hello ....";
        output.style.color = "red";
    }else{
        output.textContent = `Hello ${input.value}`;
        output.style.color = "green";
    }
});