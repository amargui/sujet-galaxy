// // Tableau pour stocker les instances de Tabulator
// const tables = [];

// // Générer les tables et les ajouter au document
// const tableNames = ["A", "B"];
// const tableFiles = ["221410_A.json", "221410_B.json"];
// tableNames.forEach((name, index) => {
//   const tableElement = document.createElement("div");
//   tableElement.id = `my-table${name}`;
//   document.body.appendChild(tableElement);
//   tables.push(new Tabulator(`#my-table${name}`, { columns: [] }));
// });

// // Appeler la fonction fetchData pour les deux premiers fichiers JSON
// fetchData("json/221410_A.json", tables[0], "A");
// fetchData("json/221410_B.json", tables[1], "B");

// // Récupérer les données JSON via fetch
// function fetchData(nomFichier, table, lettre) {
//   fetch(nomFichier)
//     .then((response) => response.json())
//     .then((jsonData) => {
//       // Convertir le JSON en tableau
//       let tableData = [];

//       jsonData.forEach((obj) => {
//         let rowData = {};

//         // Ajouter la colonne avec la lettre du fichier
//         rowData["Lettre"] = lettre;

//         // Ajouter la colonne "Type" avec la valeur correspondant à la lettre du fichier
//         rowData["Type"] = lettre === "A" ? "Type A" : "Type B";

//         // Parcourir les propriétés de chaque objet
//         for (let key in obj) {
//           // Si la valeur de la propriété est null, afficher "null"
//           rowData[key] = obj[key] !== null ? obj[key] : "null";
//         }

//         // Ajouter la ligne de données au tableau
//         tableData.push(rowData);
//       });

//       // Mettre à jour les colonnes de la table avec les clés du premier objet
//       table.setColumns(
//         Object.keys(jsonData[0]).map((key) => ({
//           title: key,
//           field: key,
//         }))
//       );

//       // Ajouter les données à la table
//       table.addData(tableData);
//       console.log(tableData);
//     })
//     .catch((error) => {
//       console.error(
//         "Une erreur s'est produite lors du chargement des données :",
//         error
//       );
//     });
// }

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
  
  const table1 = createTable("#my-tableA-221410");
  const table2 = createTable("#my-tableB-221410");
  
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
  fetchData("json/221410_B.json", "B", table2);