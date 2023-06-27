fetch('http://localhost:5678/api/works')
            .then(response => response.json())
            .then(data => {
             
                generateItems(data);

                //filtre objets
                const filterTousButton = document.querySelector("#btn_tous");

                filterTousButton.addEventListener("click", function(){
                    document.querySelector(".gallery").innerHTML = "";
                    generateItems(data);
                    activeFilterButton(filterTousButton, filterObjectsButton, filterAppartementsButton, filterHotelsButton);
                });

                //filtre objets 
                const filterObjectsButton = document.querySelector("#btn_objet");

                filterObjectsButton.addEventListener("click", function () {
                    const filtredItems = data.filter(item => {                
                        return item.category.name === "Objets";
                        
                    });
                    document.querySelector(".gallery").innerHTML = "";
                    generateItems(filtredItems);
                    activeFilterButton(filterObjectsButton, filterTousButton, filterAppartementsButton, filterHotelsButton);
                });
                //filtre appartements
                const filterAppartementsButton = document.querySelector("#btn_apparements");

                filterAppartementsButton.addEventListener("click", function () {
                    const filtredItems = data.filter(item => {                
                        return item.category.name === "Appartements";
                        
                    });
                    document.querySelector(".gallery").innerHTML = "";
                    generateItems(filtredItems);
                    activeFilterButton(filterAppartementsButton, filterTousButton, filterObjectsButton, filterHotelsButton);
                });
                //filtre hôtel restaurants
                const filterHotelsButton = document.querySelector("#btn_hotels");

                filterHotelsButton.addEventListener("click", function () {
                    const filtredItems = data.filter(item => {                
                        return item.category.name === "Hotels & restaurants";
                        
                    });
                    document.querySelector(".gallery").innerHTML = "";
                    generateItems(filtredItems);
                    activeFilterButton(filterHotelsButton, filterTousButton, filterObjectsButton, filterAppartementsButton);
                });
            })
            .catch(error => {
                console.error('Une erreur s\'est produite:', error);
            });


// création dynamique des images de la galerie
            function generateItems(work) {  
                work.forEach(item => {
                   
                        const gallery = document.querySelector(".gallery");
                        const elementGallery = document.createElement("figure");
                        const elementIllustration = document.createElement("img");
                        const elementTitle = document.createElement("figcaption");
                    
                        elementIllustration.src = item.imageUrl;
                        elementTitle.innerText = item.title;
                    
                        gallery.appendChild(elementGallery);
                        elementGallery.appendChild(elementIllustration);
                        elementGallery.appendChild(elementTitle);
                    
                })};
                //changement couleur bouton filtre actif
            function activeFilterButton(button, otherButton_1, otherButton_2, otherButton_3) {
                button.style.backgroundColor = "#1D6154";
                button.style.color = "#fff";
                otherButton_1.style.backgroundColor = "#FFFEF8";
                otherButton_1.style.color = "#1D6154";
                otherButton_2.style.backgroundColor = "#FFFEF8";
                otherButton_2.style.color = "#1D6154";
                otherButton_3.style.backgroundColor = "#FFFEF8";
                otherButton_3.style.color = "#1D6154";
            }

            




