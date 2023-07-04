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
                console.log('connexion');

            }else {
                console.log('erreur connexion');
            }
        } catch (error){
           
                }
    })
}

