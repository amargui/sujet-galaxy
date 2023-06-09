// // Créer les instances de Tabulator pour les tableaux
// const table1 = new Tabulator("#my-table-221410", {
//   columns: [
//     { title: "Type", field: "type" }, // Nouvelle colonne pour afficher le type (A ou B)
//   ],
//   rowFormatter: function (row) {
//     // Parcourir chaque cellule de la ligne
//     row.getCells().forEach(function (cell) {
//       // Si la valeur de la cellule est null, afficher "null"
//       if (cell.getValue() === null) {
//         cell.getElement().innerHTML = "null";
//       }
//     });
//   },
// });

// const table2 = new Tabulator("#my-table-244138", {
//   columns: [
//     { title: "Type", field: "type" }, // Nouvelle colonne pour afficher le type (A ou B)
//   ],
//   rowFormatter: function (row) {
//     // Parcourir chaque cellule de la ligne
//     row.getCells().forEach(function (cell) {
//       // Si la valeur de la cellule est null, afficher "null"
//       if (cell.getValue() === null) {
//         cell.getElement().innerHTML = "null";
//       }
//     });
//   },
// });

// // Appeler la fonction fetchData pour chaque fichier JSON
// fetchData("json/221410_A.json", "A", table1);
// fetchData("json/221410_B.json", "B", table1);
// fetchData("json/244138_A.json", "A", table2);
// fetchData("json/244138_B.json", "B", table2);

// // Récupérer les données JSON via fetch et effectuer la jointure
// function fetchData(nomFichier, type, table) {
//   fetch(nomFichier)
//     .then((response) => response.json())
//     .then((jsonData) => {
//       // Mettre à jour les colonnes de la table avec les clés du premier objet
//       if (table.getColumns().length === 1) {
//         // Vérifier si seule la colonne "Type" existe
//         const columns = Object.keys(jsonData[0]).map((key) => ({
//           title: key,
//           field: key,
//         }));
//         table.setColumns([{ title: "Json", field: "type" }, ...columns]); // Ajouter les autres colonnes en plus de "Type"
//       }

//       // Ajouter les données à la table
//       table.addData(jsonData.map((obj) => ({ ...obj, type }))); // Ajouter la propriété "type" au nouvel objet
//     })
//     .catch((error) => {
//       console.error(
//         "Une erreur s'est produite lors du chargement des données :",
//         error
//       );
//     });
// }

// // Fonction pour comparer les données des lignes ayant le même identifiant "Redshift"
// function comparerRedshift(table) {
//   // Récupérer toutes les lignes de la table
//   const rows = table.getData();

//   // Créer un objet pour stocker les lignes avec des différences
//   const diffRows = {};

//   // Parcourir les lignes
//   rows.forEach((row) => {
//     const redshift = row.redshift; // Supposons que l'identifiant soit dans la colonne "redshift"

//     // Vérifier si une ligne avec le même identifiant "Redshift" existe déjà dans l'objet diffRows
//     if (diffRows.hasOwnProperty(redshift)) {
//       const existingRow = diffRows[redshift];

      

//       // Comparer les données de la ligne existante avec la ligne actuelle
//       let diffFound = false;

//       for (const key in row) {
//         if (row.hasOwnProperty(key)) {
//           // Exclure la colonne "redshift" de la comparaison
//           if (key !== "redshift") {
//             if (row[key] !== existingRow[key]) {
//               diffFound = true;
//               break;
//             }console.log(existingRow);
//           }
//         }
//       }

//       // Si des différences ont été trouvées, ajouter la ligne actuelle à l'objet diffRows
//       if (diffFound) {
//         diffRows[redshift] = row;
//       }
//     } else {
//       // Si aucune ligne avec le même identifiant "Redshift" n'existe déjà, ajouter la ligne actuelle à l'objet diffRows
//       diffRows[redshift] = row;
//     }
//   });

//   // Créer un nouveau tableau avec les lignes qui diffèrent
//   const diffTable = new Tabulator("#diff-table", {
//     columns: table.getColumns(),
//     data: Object.values(diffRows),
//   });
// }

// // Gestionnaire d'événements pour le clic sur le bouton "Valider"
// document.getElementById("btnValider").addEventListener("click", function () {
//   const selectElement = document.getElementById("selectFile");
//   const selectedValue = selectElement.value;

//   if (selectedValue === "221410") {
//     comparerRedshift(table1);
//   } else if (selectedValue === "244138") {
//     comparerRedshift(table2);
//   } else {
//     console.log("Aucun fichier sélectionné");
//   }
// });

// comparerRedshift(table1);


// Fonction pour créer et configurer une table Tabulator
function createTable(elementId) {
    return new Tabulator(elementId, {
      columns: [
        { title: "Type", field: "type" }
      ],
      rowFormatter: function (row) {
        row.getCells().forEach(function (cell) {
          if (cell.getValue() === null) {
            cell.getElement().innerHTML = "null";
          }
        });
      },
    });
  }
  
  const table1 = createTable("#my-table-221410");
  const table2 = createTable("#my-table-244138");
  
  // Récupérer les données JSON via fetch et effectuer la jointure
  function fetchData(nomFichier, type, table) {
    fetch(nomFichier)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then((jsonData) => {
        if (table.getColumns().length === 1) {
          const columns = Object.keys(jsonData[0]).map((key) => ({
            title: key,
            field: key,
          }));
          table.setColumns([{ title: "Json", field: "type" }, ...columns]);
        }
        table.addData(jsonData.map((obj) => ({ ...obj, type })));
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors du chargement des données :",
          error
        );
      });
  }
  
  fetchData("json/221410_A.json", "A", table1);
  fetchData("json/221410_B.json", "B", table1);
  fetchData("json/244138_A.json", "A", table2);
  fetchData("json/244138_B.json", "B", table2);
  
  // Fonction pour comparer les données des lignes ayant le même identifiant "Redshift"
  function comparerRedshift(table) {
    const rows = table.getData();
    const diffRows = {};
  
    rows.forEach((row) => {
      const redshift = row.redshift;
      if (diffRows.hasOwnProperty(redshift)) {
          const existingRow = diffRows[redshift];
          let diffFound = false;
          
          for (const key in row) {
              if (row.hasOwnProperty(key)) {
                  if (key !== "redshift" && row[key] !== existingRow[key]) {
                      diffFound = true;
                      break;
                    }
                }
            }
            
            if (diffFound) {
                diffRows[redshift] = row;
            }
        } else {
            diffRows[redshift] = row;
        }
    });
    console.log(diffRows);
    
    const diffTable = new Tabulator("#diff-table", {
      columns: table.getColumns(),
      data: Object.values(diffRows),
    });
  }
  
  document.getElementById("btnValider").addEventListener("click", function () {
    const selectElement = document.getElementById("selectFile");
    const selectedValue = selectElement.value;
  
    if (selectedValue === "221410") {
      comparerRedshift(table1);
    } else if (selectedValue === "244138") {
      comparerRedshift(table2);
    } else {
      console.log("Aucun fichier sélectionné");
    }
  });
  
//   comparerRedshift(table1);
  