const myForm = document.querySelector("#myform")
const loginInput = myForm.login;
const btn = document.querySelector("#btn")
const loginDiv = document.querySelector("#loginDiv")
async function fetchFromApi(endpoint, data) {
    return await fetch(endpoint, data);
}
(async () => {
    myForm.addEventListener("submit", async (e)=> {
        e.preventDefault();
        if(loginInput.value.trim().length != 0){
            loginDiv.style.visibility = "hidden";
            let login = loginInput.value.trim();
            const response = await fetchFromApi("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({name: login})
            });
            if (response.status == 200)
                location.href = './game.html';
            else {
                alert("Taka osoba już istnieje");
                location.reload();
            }
        }else{
            alert("Wpisz nazwę użytkownika!!!");
            location.reload();
        }
        
    });
})();