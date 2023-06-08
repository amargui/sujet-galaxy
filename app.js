
// LIRE LE FICHER JSON 

// IMPORTATION DE MODULES  

// LECTURE DU FICHIER JSON avec la methode fetch()
fetch('../json/jsonA.json')
    .then(response => response.json())
    .then(data => {
        // MANIPULER LES DONNEES JSON
        console.log(data);
    })

    .catch(error => {
        //Gérer les erreurs
        console.erreor('une erreur s\'est produite:', error);

    });

