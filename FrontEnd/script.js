callApi();

const filtersContainer = document.querySelector(".filtres");


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
    //filtre tous
    tousButton.addEventListener("click", function() {
        document.querySelector(".gallery").innerHTML = "";
        generateGallery(data);
    });
    //filtre objets
    objetButton.addEventListener("click", function () {
        const filtredItems = data.filter(item => {                
            return item.category.name === "Objets";
            
        });
        document.querySelector(".gallery").innerHTML = "";
        generateGallery(filtredItems);
    });
    //filtre appartements
    appartementsButton.addEventListener("click", function () {
        const filtredItems = data.filter(item => {                
            return item.category.name === "Appartements";
            
        });
        document.querySelector(".gallery").innerHTML = "";
        generateGallery(filtredItems);
    });
    //filtre hotels & restaurants
    hotelsButton.addEventListener("click", function () {
        const filtredItems = data.filter(item => {                
            return item.category.name === "Hotels & restaurants";
            
        });
        document.querySelector(".gallery").innerHTML = "";
        generateGallery(filtredItems);
    });

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



