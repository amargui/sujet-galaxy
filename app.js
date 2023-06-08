
// LIRE LE FICHER JSON 

// IMPORTATION DE MODULES  

// LECTURE DU FICHIER JSON avec la methode fetch()

// fetch('json/221410_B.json')
//     .then(response => response.json())
//     .then(data => {
//         let donneesJSONString = JSON.stringify(data, null, 2);
//         document.getElementById("resultat").innerHTML = "<pre>" + donneesJSONString + "</pre>";
//         let labels = [];
//         let values = [];

//         // Parcourir les objets JSON et extraire les valeurs des clés "Rank" et "Redshift"
//         data.forEach(obj => {
//             labels.push(obj.Rank);
//             values.push(obj.Redshift);
//         });

//         let ctx = document.getElementById('myChart').getContext('2d');
//         let myChart = new Chart(ctx, {
//             type: 'bar',
//             data: {
//                 labels: labels,
//                 datasets: [{
//                     label: 'Valeurs',
//                     data: values,
//                     backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                     borderColor: 'rgba(75, 192, 192, 1)',
//                     borderWidth: 1
//                 }]
//             },
//             options: {
//                 scales: {
//                     y: {
//                         beginAtZero: true
//                     }
//                 }
//             }
//         });
//     })
//     .catch(error => {
//         console.error('Une erreur s\'est produite :', error)
//     });
// Fonction pour comparer les deux fichiers JSON
function comparerJSON(json1, json2) {
    // Code de comparaison des fichiers JSON
    // ...
    // Retourner les différences trouvées
    return differences;
}

// Charger le premier fichier JSON
fetch('json/221410_A.json')
    .then(response => response.json())
    .then(json1 => {
        // Afficher les données du premier fichier JSON dans le navigateur
        let donneesJSONString1 = JSON.stringify(json1, null, 2);
        document.getElementById("resultat1").innerHTML = "<pre>" + donneesJSONString1 + "</pre>";
        let labels1 = [];
        let values1 = [];

        // Parcourir les objets JSON et extraire les valeurs des clés "Rank" et "Redshift"
        json1.forEach(obj => {
            labels1.push(obj.Rank);
            values1.push(obj.Redshift);
        });

        let ctx1 = document.getElementById('myChart1').getContext('2d');
        let myChart1 = new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: labels1,
                datasets: [{
                    label: 'Valeurs',
                    data: values1,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Charger le deuxième fichier JSON
        return fetch('json/221410_B.json');
    })
    .then(response => response.json())
    .then(json2 => {
        // Afficher les données du deuxième fichier JSON dans le navigateur
        let donneesJSONString2 = JSON.stringify(json2, null, 2);
        document.getElementById("resultat2").innerHTML = "<pre>" + donneesJSONString2 + "</pre>";
        let labels2 = [];
        let values2 = [];

        // Parcourir les objets JSON et extraire les valeurs des clés "Rank" et "Redshift"
        json2.forEach(obj => {
            labels2.push(obj.Rank);
            values2.push(obj.Redshift);
        });

        let ctx2 = document.getElementById('myChart2').getContext('2d');
        let myChart2 = new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: labels2,
                datasets: [{
                    label: 'Valeurs',
                    data: values2,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Comparer les deux fichiers JSON
        const differences = comparerJSON(json1, json2);

        // Afficher les différences dans le navigateur
        let differencesString = JSON.stringify(differences, null, 2);
        document.getElementById("differences").innerHTML = "<pre>" + differencesString + "</pre>";
        console.log(differences);
    })
    .catch(error => {
        console.error('Une erreur s\'est produite :', error);
    });
