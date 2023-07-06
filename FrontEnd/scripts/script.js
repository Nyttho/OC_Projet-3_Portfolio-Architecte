

callApi();

const filtersContainer = document.querySelector(".filtres");
const token = sessionStorage.getItem("token");
// vérifie si le token de connection est présent dans le sessionStorage
if(token !== null){
    const logoutBtn = document.querySelector(".login_logout");
    logoutBtn.innerHTML = "<p>logout</p>";
    //evenement pour se deconnecter
    logoutBtn.addEventListener("click", function() {
        sessionStorage.removeItem("token");
        location.reload();
    })
//création des éléments spécifique à la page admin
    const banner = document.querySelector(".banner");
    banner.style.display = "flex";
    const modifyAvatar = document.querySelector(".modify_avatar");
    modifyAvatar.innerHTML = `<i class="fa-regular fa-pen-to-square"></i><p>modifier</p>`;
    const modifyProject = document.querySelector(".modify_project");
    modifyProject.innerHTML = `<i class="fa-regular fa-pen-to-square"></i><p>modifier</p>`;

}

//appel api éléments de galerie
async function callApi() {
    const response = await fetch("http://localhost:5678/api/works");
    const responseCategories = await fetch("http://localhost:5678/api/categories");
    const data = await response.json();
    const dataCategories = await responseCategories.json();
    //On génère la galerie au chargement de la page
    generateGallery(data);
    //On génère les filtres au chargement de la page
    generateFilterButtons(dataCategories);

    const tousButton = document.querySelector("#btn_tous");
    const objetButton = document.querySelector("#btn_objets");
    const appartementsButton = document.querySelector("#btn_appartements");
    const hotelsButton = document.querySelector("#btn_hotels_restaurants");
    //filtre tous renvoie la galerie complète

    tousButton.addEventListener("click", function() {
        document.querySelector(".gallery").innerHTML = "";
        generateGallery(data);
    });
    filter(objetButton);
    filter(appartementsButton);
    filter(hotelsButton);
   
    //fonction pour gérer les filtres par catégories
    function filter(button) {
        button.addEventListener("click", function () {
            const filtredItems = data.filter(item => {                
                return item.category.name === button.innerText;
                
            });
            document.querySelector(".gallery").innerHTML = "";
            generateGallery(filtredItems);
    }
        )};

};

//génère éléments de galerie
function generateGallery(work) {
    work.forEach(item => {

        const gallery = document.querySelector(".gallery");
        const galleryElement = document.createElement("figure");
        const elementIllustration = document.createElement("img");
        const elementTitle = document.createElement("figcaption");

        elementIllustration.src = item.imageUrl;
        elementTitle.innerText = item.title;

        gallery.appendChild(galleryElement);
        galleryElement.appendChild(elementIllustration);
        galleryElement.appendChild(elementTitle);

    })
};

// genère boutons filtres selon catégories
function generateFilterButtons(category) {
    category.forEach(item => {


        const filterButton = document.createElement("button");

        filterButton.innerText = item.name;
        filterButton.classList.add("btn");
        filterButton.setAttribute("id", "btn_" + item.name.replaceAll(" ", "_").replaceAll("&","").replaceAll("__", "_").toLowerCase());

        filtersContainer.appendChild(filterButton);
        //gestion couleur boutons filtre au clic
        const btns = document.querySelectorAll(".btn");

        filtersContainer.addEventListener('click', e => {
            btns.forEach(btn => {
                if (btn.getAttribute("id") === e.target.getAttribute("id")) {
                    btn.classList.add('active_btn');
                } else {
                    btn.classList.remove("active_btn");
                };
            });
        });
    });
};



