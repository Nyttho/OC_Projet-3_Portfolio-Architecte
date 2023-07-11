if (token) {
  callApiGallery();

  // Génération des éléments de la galerie modale

  async function callApiGallery() {
    try {
      const response = await fetch("http://localhost:5678/api/works");
      const data = await response.json();

      generateModalGallery(data);
    //suppression des éléments de l'api

      const allTrashIcons = document.querySelectorAll(".fa-trash-can");

      let id = 0;
      for (let i = 0; i < allTrashIcons.length; i++){
        allTrashIcons[i].addEventListener("click", (e) => {
          e.preventDefault();
          //création nouveau tableau qui renvoie uniquement les id des travaux
          const itemId = data.map(item => item.id);
          id = itemId[i];
          fetch(`http://localhost:5678/api/works/${id}`), {
            method: "DELETE",
            headers: {
              "Content-type": "application/json",
              // "Authorization": "Bearer " + token
            }
          }
          document.querySelector(".modal_gallery").innerHTML = "";
          generateModalGallery(data)
        })
      }
      
      
        
      
     

    } catch (error) {
      alert("Une erreur est survenue");
    }
  }

  // Fonction pour générer la galerie de la modale
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
      

      galleryElement.classList.add("modal_img_wrapper");
      arrowsIcon.classList.add("fa-solid");
      arrowsIcon.classList.add("fa-arrows-up-down-left-right");
      trashIcon.classList.add("fa-solid");
      trashIcon.classList.add("fa-trash-can");
      edit.innerText = "éditer";

      gallery.appendChild(galleryElement);
      galleryElement.appendChild(elementIllustration);
      galleryElement.appendChild(arrowsIcon);
      galleryElement.appendChild(trashIcon);
      galleryElement.appendChild(edit);
    });

    // Cibler toutes les icônes de corbeille générées
   

    // Ajouter un écouteur d'événements à chaque icône de corbeille
  
  }

  let modal = null;

  // Fonction pour ouvrir la modale
  const openModal = function (e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute("href"));
    target.style.display = null;
    target.removeAttribute("aria-hidden");
    target.setAttribute("aria-modal", "true");
    modal = target;
    modal.addEventListener("click", closeModal);
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
  };

  // Fonction pour fermer la modale
  const closeModal = function (e) {
    if (modal === null) return;
    e.preventDefault();
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-close").removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
    modal = null;
  };

  // Empêcher la propagation d'événements aux enfants de la modale
  const stopPropagation = function (e) {
    e.stopPropagation();
  };

  // Événement pour ouvrir la modale
  document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener("click", openModal);
  });
}
