

const deleteWork = () => {
 let id = 0;
 //création nouveau tableau qui renvoie uniquement les id des travaux
 const itemId = data.map(item => item.id);
 id = itemId[i];
 let confirm = window.confirm("Etes vous sûr de vouloir supprimer le projet ?");
 if (confirm) {

   fetch(`http://localhost:5678/api/works/${id}`, {
     method: "DELETE",
     headers: {
       "Content-type": "application/json",
       "Authorization": "Bearer " + token
     }
   })

   const element = allTrashIcons[i].parentNode;
   
   element.remove();
   updatedWork();

 }
}

function generateModalGallery(work) {
    work.forEach(item => {
      
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

      modalGallery.appendChild(galleryElement);
      galleryElement.appendChild(elementIllustration);
      galleryElement.appendChild(arrowsIcon);
      galleryElement.appendChild(trashIcon);
      galleryElement.appendChild(edit);

      const allTrashIcons = document.querySelectorAll(".fa-trash-can");

      for (let i = 0; i < allTrashIcons.length; i++) {
        allTrashIcons[i].addEventListener("click", deleteWork)
    };

  })
}