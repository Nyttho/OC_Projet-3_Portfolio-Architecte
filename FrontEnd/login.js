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
            if (res.ok) {
                const data = await res.json();
                sessionStorage.setItem("token", data.token);
                window.location.replace(
                    "index.html"
                  );
            } else {
                console.log('erreur connexion');
            }
        } catch (error) {
            console.log(res);
            console.log(error);
        }
    })
}
login();
