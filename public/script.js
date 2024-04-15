const myForm = document.querySelector("#myform")
const loginInput = myForm.login;
const btn = document.querySelector("#btn")
const loginDiv = document.querySelector("#loginDiv")

myForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (loginInput.value.trim().length != 0) {
        loginDiv.style.visibility = "hidden";
        let login = loginInput.value.trim();
        location.href = './game.html';
    } else {
        alert("Wpisz nazwę użytkownika!!!");
        location.reload();
    }

})