if (token) {
    callApiGallery();

    //génération des éléments de la gallerie modale

    async function callApiGallery() {
        try {
            const response = await fetch("http://localhost:5678/api/works");
            const data = await response.json();

            generateModalGallery(data);
            
           
        } catch (error) {
            alert("Une erreur est survenue");
        }
    }
    
    const allTrashIcons = document.querySelector(".fa-trash-can");

    console.log(allTrashIcons);//renvoie null ?


    // fonction pour générer la galerie de la modale

    function generateModalGallery(work) {
        work.forEach(item => {

            const gallery = document.querySelector(".modal_gallery");
            const galleryElement = document.createElement("figure");
            const elementIllustration = document.createElement("img");
            const arrowsIcon = document.createElement("i");

            const trashIcon = document.createElement("i");
            const edit = document.createElement("p");

            elementIllustration.src = item.imageUrl;
            elementIllustration.alt = item.title;
            elementIllustration.id = item.id;

            galleryElement.classList.add("modal_img_wrapper");
            arrowsIcon.classList.add("fa-solid");
            arrowsIcon.classList.add("fa-arrows-up-down-left-right")

            trashIcon.classList.add("fa-solid");
            trashIcon.classList.add("fa-trash-can");

            edit.innerText = "éditer";

            gallery.appendChild(galleryElement);
            galleryElement.appendChild(elementIllustration);
            galleryElement.appendChild(arrowsIcon);
            galleryElement.appendChild(trashIcon);

            galleryElement.appendChild(edit);

            
        })
    }


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