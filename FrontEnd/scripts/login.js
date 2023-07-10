async function login() {
    const formLogin = document.querySelector(".authentification");
    formLogin.addEventListener("submit", async function (event) {
        event.preventDefault();

        let userLogin = {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        };

        try {
            const res = await fetch("http://localhost:5678/api/users/login", {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userLogin)
            });
            const data = await res.json();
            if (res.ok) {
                sessionStorage.setItem("token", data.token);
                window.location.replace("./index.html");
            } else {
                const password = document.getElementById("password");
                const errorMessage = document.querySelector(".error_message_login");
                password.classList.add("connection_error");
                errorMessage.innerText = data.message;
                setTimeout(function() {
                    password.classList.remove("connection_error");
                    errorMessage.innerText = "";
                }, 1000);
                               
                
            }
        } catch (error) {
            alert("Une erreur est survenue");
        }
    })
}
login();
