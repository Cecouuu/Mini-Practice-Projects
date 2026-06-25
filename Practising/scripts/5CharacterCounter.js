const input = document.querySelector("#input");
const output = document.querySelector("#output");


input.addEventListener("input", function (){
    if (!input.value){
        output.textContent = `Characters = ${input.value.length}`;
        output.style.color = "red"
    }else{
        output.textContent = `Characters = ${input.value.length}`;
        output.style.color = "green"
    }

})