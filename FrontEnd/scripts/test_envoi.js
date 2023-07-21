document.querySelector('.js-add-file').addEventListener('submit', (event) => {
    event.preventDefault(); 

    const formData = new FormData(); 
    const title = document.getElementById('modal_form_title').value;
    const imageFile = document.getElementById('file').files[0]; 
    const category = document.getElementById('modal_form_categories').value;
    


    formData.append('image', imageFile);
    formData.append('title', title);

    formData.append('category', category);

for (const [key, value] of formData) {
    console.log(`${key}:`, value);
}           
   
fetch("http://localhost:5678/api/works", {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${token}`
    },
    body: formData
})


    .then(data => {
        console.log('Réponse du serveur:', data);

    })
    .catch(error => {
        console.error('Erreur lors de la requête:', error);

   });



});
