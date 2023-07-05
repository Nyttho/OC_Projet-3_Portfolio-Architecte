const loadWorks = async () => {
    try {
        const urlWorks = "http://localhost:5678/api/works";
        const res = await fetch(urlWorks);
        const data = await res.json();
  
        return data;

    } catch (err) {
        console.log(err);
    }
};

const loadFilter = async () => {
    try {
        const urlCategories = "http://localhost:5678/api/categories";
        const resCategories = await fetch (urlCategories);
        const dataCategories = await resCategories.json();

        return dataCategories;
    }catch (err) {
        console.log(err);
    }
};

loadWorks().then((data) => generateGallery(data));
loadFilter().then((dataCategories) => generateFilterButtons(dataCategories));

const data = loadWorks();

const tousButton = document.querySelector("#btn_tous");
const objetButton = document.querySelector("#btn_objets");
const appartementsButton = document.querySelector("#btn_appartements");
const hotelsButton = document.querySelector("#btn_hotels_restaurants");

tousButton.addEventListener("click", function() {
    document.querySelector(".gallery").innerHTML = "";
    loadWorks().then((data) => generateGallery(data));
});

// filter(objetButton);

// filter(appartementsButton);
// filter(hotelsButton);



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

function generateFilterButtons(category) {
    category.forEach(item => {

        const filtersContainer = document.querySelector(".filtres");

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

function filter(button) {
    button.addEventListener("click", function () {
        const filtredItems = data.filter(item => {                
            return item.category.name === button.innerText;
            
        });
        document.querySelector(".gallery").innerHTML = "";
        generateGallery(filtredItems);
}
    )};

