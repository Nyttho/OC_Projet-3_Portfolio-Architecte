

callApi();

const filtersContainer = document.querySelector(".filtres");
const token = sessionStorage.getItem("token");
// vérifie si le token de connection est présent dans le sessionStorage
if (token) {
    const logoutBtn = document.querySelector(".login_logout");
    logoutBtn.innerHTML = "<p>logout</p>";
    //evenement pour se deconnecter
    logoutBtn.addEventListener("click", function () {
        sessionStorage.removeItem("token");
        location.reload();
    })
    //création des éléments spécifique à la page admin
    const banner = document.querySelector(".banner");
    banner.style.display = "flex";
    const modifyAvatar = document.querySelector(".modify_avatar");
    modifyAvatar.innerHTML = `<i class="fa-regular fa-pen-to-square"></i><a href="#">modifier</a>`;
    const modifyBio = document.querySelector(".modify_bio");
    modifyBio.innerHTML = `<i class="fa-regular fa-pen-to-square"></i><a href="#">modifier</a>`;
    const modifyProject = document.querySelector(".modify_project");
    modifyProject.innerHTML = `<i class="fa-regular fa-pen-to-square"></i><a href="#modal1" class="js-modal">modifier</a>`;

    // suppression des filtres
    filtersContainer.remove();

    let modal = null;
    //fonction  ouverture de la modale
    const openModal = function (e) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute("href"));
        target.style.display = null;
        target.removeAttribute("aria-hidden");
        target.setAttribute('aria-modal', 'true');
        modal = target;
        modal.addEventListener('click', closeModal);
        modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
        modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
    }
    // fonction fermeture de la modale 
    const closeModal = function (e) {
        if (modal === null) return;
        e.preventDefault();
        modal.style.display = "none";
        modal.setAttribute("aria-hidden", "true");
        modal.removeAttribute('aria-modal');
        modal.removeEventListener("click", closeModal);
        modal.querySelector(".js-modal-close").removeEventListener("click", closeModal);
        modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
        modal = null;

    }
    //on stop la propagation aux enfants pour éviter la fermeture au clic à l'intérieur de la modale
    const stopPropagation = function (e) {
        e.stopPropagation()
      }
      //evenement pour ouvrir la modale
      document.querySelectorAll(".js-modal").forEach(a => {
        a.addEventListener('click', openModal);
    })
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

    tousButton.addEventListener("click", function () {
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
        )
    };

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
        filterButton.setAttribute("id", "btn_" + item.name.replaceAll(" ", "_").replaceAll("&", "").replaceAll("__", "_").toLowerCase());

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



