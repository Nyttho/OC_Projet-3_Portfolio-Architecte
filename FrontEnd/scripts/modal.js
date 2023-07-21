if (token) {
  callApiGallery();
  callApiCategories();
  const modalGallery = document.querySelector(".modal_gallery");

  // Génération des éléments de la galerie modale

  async function callApiGallery() {
    try {
      const response = await fetch("http://localhost:5678/api/works");
      const data = await response.json();

      generateModalGallery(data);

      //suppresion de toute la galerie

      const deleteAll = document.querySelector(".delete_gallery");

      deleteAll.addEventListener("click", () => {
        let confirm = window.confirm("Etes vous sûr de vouloir supprimer la galerie ?");

        if (confirm) {
          for (let i = 0; i < data.length; i++) {
            id = data[i].id;
            fetch(`http://localhost:5678/api/works/${id}`, {
              method: "DELETE",
              headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + token
              }
            })
            
          }
          gallery.innerHTML="";
          modalGallery.innerHTML = "";

        }
      })

     
      //suppression des travaux

      const allTrashIcons = document.querySelectorAll(".fa-trash-can");
      const allImgGallery = document.querySelectorAll("figure img");

      let id = 0;
      for (let i = 0; i < allTrashIcons.length; i++) {
        allTrashIcons[i].addEventListener("click", (e) => {
          e.preventDefault();
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
        })
      }
    } catch (error) {
      alert("Une erreur est survenue");
    }
  }
// fonction pour régénérer les galleries après modification
  async function updatedWork(){
    const response = await fetch("http://localhost:5678/api/works");
    const data = await response.json();
    gallery.innerHTML = "";
    generateGallery(data);
    modalGallery.innerHTML = "";
    generateModalGallery(data);
    
  }
  const fileInput = document.getElementById("file");
  const textInput = document.getElementById("modal_form_title");
  const selectInput = document.getElementById("modal_form_categories");
  const submitButton = document.getElementById("modal2_submit");

  // Fonction pour vérifier si tous les champs sont remplis
  function checkFormValidity() {
    if (fileInput.value && textInput.value && selectInput.value) {
      submitButton.disabled = false;
      submitButton.style.backgroundColor = "#1D6154";
      submitButton.style.cursor = "pointer";
    } else {
      submitButton.disabled = true;
      submitButton.style.backgroundColor = "#B3B3B3";
      submitButton.style.cursor = "default";

    }
  }

  // Ajouter des écouteurs d'événements pour les champs du formulaire
  fileInput.addEventListener('input', checkFormValidity);
  textInput.addEventListener('input', checkFormValidity);
  selectInput.addEventListener('input', checkFormValidity);


  const addFileForm = document.querySelector(".js-add-file");

  addFileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    //création d'un formData du formulaire modale 2
    const formData = new FormData();

    const title = document.getElementById('modal_form_title').value;
    const imageFile = document.getElementById('file').files[0];
    const category = document.getElementById('modal_form_categories').value;

    formData.append('image', imageFile);
    formData.append('title', title);
    formData.append('category', category);

    addFile(formData);
    
    


  })

  //fonction pour envoi des nouveaux fichiers à l'api
  async function addFile(formData) {
    const res = await fetch("http://localhost:5678/api/works", {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
    const data = await res.json();
    updatedWork();

    closeModal2();

   

  }


  fileInput.addEventListener("change", () => previewImg());
  const addFileContainer = document.querySelector(".js_add_file_container");


  //fonction pour afficher une preview de l'image à ajouter
  function previewImg() {
    let imageType = /(.jpg|.png|.jpeg)/;
    let files = fileInput.files;
    const preview = document.querySelector(".preview");
    for (let i = 0; i < files.length; i++) {

      let file = files[i];
      if (!imageType.test(file.type)) {
        alert("veuillez sélectionner une image au format .jpg ou .png");
      } else {
        if (i === 0) {
          preview.innerHTML = '';
        }
        addFileContainer.style.display = "none";
        let img = document.createElement("img");
        img.classList.add("obj");
        img.file = file;

        preview.appendChild(img);
        let reader = new FileReader();
        reader.onload = (function (aImg) {
          return function (e) {
            aImg.src = e.target.result;
          };
        })(img);

        reader.readAsDataURL(file);


      }

    }
  }
  //fonction pour remettre à zéro la modale 2 si on la ferme
  function resetModal2() {
    const imgPreview = document.querySelector(".preview img");
    imgPreview.src = "";
    addFileContainer.style.display = "flex";
    fileInput.value = "";
    textInput.value = "";
    selectInput.value = "";
    submitButton.disabled = true;
    submitButton.style.backgroundColor = "#B3B3B3";
    submitButton.style.cursor = "default";

  }



  async function callApiCategories() {
    try {
      const response = await fetch('http://localhost:5678/api/categories');
      const categories = await response.json();

      generateCategoriesOption(categories);


    } catch (error) {

    }
  }

  function generateCategoriesOption(categories) {
    const emptyCategoryOption = document.createElement("option");
    emptyCategoryOption.setAttribute("value", "")
    const categorySelector = document.querySelector("#modal_form_categories");
    categorySelector.appendChild(emptyCategoryOption);
    categories.forEach(category => {

      const categoryOption = document.createElement("option");

      categoryOption.innerText = category.name;
      categoryOption.setAttribute("value", category.id);
      categoryOption.innerText = category.name;

      categorySelector.appendChild(categoryOption);
    })
  }

  // Fonction pour générer la galerie de la modale
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
    });

  }

  let modal = null;

  // Fonction pour ouvrir la modale
  const openModal = function (e) {
    e.preventDefault();
    modal = document.querySelector("#modal1");
    modal.style.display = null;
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
    modal.addEventListener("click", closeModal);
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);

    addWork.addEventListener("click", closeModal);
    addWork.addEventListener("click", openModal2);



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
  //evenement pour ouvrir 2e modale
  const addWork = document.querySelector(".add_work");
  let modal2 = null;
  //fonction pour reset l'uplaod d'image


  const openModal2 = function () {
    modal2 = document.querySelector("#modal2");
    modal2.style.display = null;
    modal2.removeAttribute("aria-hidden");
    modal2.setAttribute("aria-modal", "true");
    modal2.addEventListener("click", closeModal2);
    const returnBack = modal2.querySelector(".return_back");
    returnBack.addEventListener("click", closeModal2);
    modal2.querySelector(".js-modal-close").addEventListener("click", closeModal2);
    modal2.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
    fileInput.addEventListener("change", () => previewImg());


  }
  // fonction pour fermer 2e modale
  const closeModal2 = function () {
    if (modal2 === null) return;

    modal2.style.display = "none";
    modal2.setAttribute("aria-hidden", "true");
    modal2.removeAttribute("aria-modal");
    modal2.removeEventListener("click", closeModal);
    modal2.querySelector(".js-modal-close").removeEventListener("click", closeModal);
    modal2.querySelector(".js-modal-close").removeEventListener("click", resetModal2());
    modal2.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
    fileInput.removeEventListener("change", () => previewImg());
    modal2 = null;



  }




}