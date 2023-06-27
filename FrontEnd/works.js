async function getApi() {
const reponse = await fetch('http://localhost:5678/api/works');
const works = await reponse.json();
console.log(works);
}
getApi();





// création dynamique des images de la galerie
for(let i = 0; i < works.length; i++) {
    const article = works[i];

    const gallery = document.querySelector(".gallery");
    const elementGallery = document.createElement("figure");
    const elementIllustration = document.createElement("img");
    const elementTitle = document.createElement("figcaption");

    elementIllustration.src = article.imageUrl;
    elementTitle.innerText = article.title;

    gallery.appendChild(elementGallery);
    elementGallery.appendChild(elementIllustration);
    elementGallery.appendChild(elementTitle);
}

