if (token) {
  callApiGallery();
  callApiCategories();
  const modalGallery = document.querySelector(".modal_gallery");

  let data = [];
  //suppression de toute la galerie
  const deleteAll = document.querySelector(".delete_gallery");
  deleteAll.addEventListener("click", () => {
    let confirm = window.confirm("Etes vous sûr de vouloir supprimer la galerie ?");
    if (confirm) {
      data.forEach(item => deleteWork(item.id));
      gallery.innerHTML = "";
      modalGallery.innerHTML = "";
    }
  });
  async function callApiGallery() {
    try {
      const response = await fetch("http://localhost:5678/api/works");
      data = await response.json();
      generateModalGallery(data);

      //suppression d'éléments dans la galerie

      const allTrashIcons = document.querySelectorAll(".fa-trash-can");
      allTrashIcons.forEach((trashIcon, i) => {
        trashIcon.addEventListener("click", (e) => {
          e.preventDefault();
          const id = data[i].id;
          let confirm = window.confirm("Etes vous sûr de vouloir supprimer le projet ?");
          if (confirm) {
            deleteWork(id);
            const element = trashIcon.parentNode;

            element.parentNode.removeChild(element);

            updatedWork();
          }
        });
      });
    } catch (error) {
      alert("Une erreur est survenue");
    }
  }
// mise à jour de la gallerie
  async function updatedWork() {
    data = await fetchDataFromApi("http://localhost:5678/api/works");
    gallery.innerHTML = "";
    generateGallery(data);
  }

  async function fetchDataFromApi(url) {
    const response = await fetch(url);
    return await response.json();
  }
//envoi de requete delete à l'api en fonction de l'id
  async function deleteWork(id) {
    await fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " + token
      }
    });
  }

  const fileInput = document.getElementById("file");
  const textInput = document.getElementById("modal_form_title");
  const selectInput = document.getElementById("modal_form_categories");
  const submitButton = document.getElementById("modal2_submit");
//vérifie si le formulaire est rempli
  function checkFormValidity() {
    if (fileInput.value && textInput.value && selectInput.value) {
      // submitButton.disabled = false;
      submitButton.style.backgroundColor = "#1D6154";
      submitButton.style.cursor = "pointer";
    } else {
      // submitButton.disabled = true;
      submitButton.style.backgroundColor = "#B3B3B3";
      submitButton.style.cursor = "default";
    }
  }

  fileInput.addEventListener('input', checkFormValidity);
  textInput.addEventListener('input', checkFormValidity);
  selectInput.addEventListener('input', checkFormValidity);
//envoi de nouveaux travaux à l'api
  submitButton.addEventListener("click", async (fe) => {
    fe.preventDefault();
    if (fileInput.value === "" || textInput.value === "" || selectInput.value === "") {
      alert("veuillez renseigner tous les champs");
    } else {
      const title = document.getElementById('modal_form_title').value;
      const imageFile = document.getElementById('file').files[0];
      const category = document.getElementById('modal_form_categories').value;

      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('title', title);
      formData.append('category', category);

      try {
        const response = await fetch("http://localhost:5678/api/works", {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });

        if (response.ok) {
          updatedWork();
          resetModal2();

          return false;
        } else {
          alert("Erreur lors de l'ajout de la photo");
        }
      } catch (error) {
        console.error('Une erreur s\'est produite lors de l\'envoi du fichier:', error);
        alert("Une erreur s'est produite");
      }
    }
  });

  fileInput.addEventListener("change", () => previewImg());
  const addFileContainer = document.querySelector(".js_add_file_container");

//prévisualisation de l'image avant envoi
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
//remise à zéro du formulaire de la modale
  function resetModal2() {
    const imgPreview = document.querySelector(".preview img");
    if (imgPreview !== null) {
      imgPreview.src = "";
      addFileContainer.style.display = "flex";
    }
    fileInput.value = "";
    textInput.value = "";
    selectInput.value = "";
    // submitButton.disabled = true;
    submitButton.style.backgroundColor = "#B3B3B3";
    submitButton.style.cursor = "default";
  }
//appel des différentes catégories via l'api
  async function callApiCategories() {
    try {
      const response = await fetch('http://localhost:5678/api/categories');
      const categories = await response.json();
      generateCategoriesOption(categories);
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des catégories:', error);
    }
  }
  //génère les options du selecteur dans le formulaire
  function generateCategoriesOption(categories) {
    const emptyCategoryOption = document.createElement("option");
    emptyCategoryOption.setAttribute("value", "");
    const categorySelector = document.querySelector("#modal_form_categories");
    categorySelector.appendChild(emptyCategoryOption);
    categories.forEach(category => {
      const categoryOption = document.createElement("option");
      categoryOption.innerText = category.name;
      categoryOption.setAttribute("value", category.id);
      categorySelector.appendChild(categoryOption);
    });
  }
//génère la gallerie dans la modale
  function generateModalGallery(work) {
    modalGallery.innerHTML = "";
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

  const openModal = function (e) {
    e.preventDefault();
    modal = document.querySelector("#modal1");
    modal.style.display = null;
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
    modal.addEventListener("click", closeModal);
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
    callApiGallery();
    addWork.addEventListener("click", closeModal);
    addWork.addEventListener("click", openModal2);
  };
//nettoyage de la modale après fermeture
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

  const stopPropagation = function (e) {
    e.stopPropagation();
  };

  document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener("click", openModal);
  });

  const addWork = document.querySelector(".add_work");
  let modal2 = null;

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
  };

  const closeModal2 = function () {
    if (modal2 === null) return;
    fileInput.removeEventListener("change", () => previewImg());
    modal2.style.display = "none"; 
    modal2.removeAttribute("aria-hidden");
    modal2.removeAttribute("aria-modal");
    modal2.removeEventListener("click", closeModal2);
    modal2.querySelector(".js-modal-close").removeEventListener("click", closeModal2);
    modal2.querySelector(".js-modal-close").removeEventListener("click", resetModal2());
    modal2.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
    modal2 = null; 
  };
}