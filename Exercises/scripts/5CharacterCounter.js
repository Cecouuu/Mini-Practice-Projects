const input = document.querySelector("#input");
const output = document.querySelector("#output");


input.addEventListener("input", function (){
            if (input.value.length <= 50 && input.value.length >= 0)
            {
                output.textContent = `Characters = ${input.value.length}`;
                output.style.color = "green";
            }
            else if (input.value.length >= 51 && input.value.length <= 100)
            {
                output.textContent = `Characters = ${input.value.length}`;
                output.style.color = "#dab600";
            }
            else if (input.value.length > 100)
            {
                output.textContent = `Characters = ${input.value.length}`;
                output.style.color = "red";

            }
})