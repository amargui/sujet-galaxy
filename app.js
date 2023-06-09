// Tableau pour stocker les instances de Tabulator
const tables = [];

// Générer les tables et les ajouter au document
const tableNames = ["A", "B", "C", "D"];
const tableFiles = ["221410_A.json", "221410_B.json", "244138_A.json", "244138_B.json"];
tableNames.forEach((name, index) => {
  const tableElement = document.createElement("div");
  tableElement.id = `my-table${name}`;
  document.body.appendChild(tableElement);
  tables.push(new Tabulator(`#my-table${name}`, { columns: [] }));
});

// Appeler la fonction fetchData pour chaque fichier JSON
fetchData("json/221410_A.json", tables[0], "A");
fetchData("json/221410_B.json", tables[1], "B");
fetchData("json/244138_A.json", tables[2], "C");
fetchData("json/244138_B.json", tables[3], "D");

// Récupérer les données JSON via fetch
function fetchData(nomFichier, table, lettre) {
  fetch(nomFichier)
    .then((response) => response.json())
    .then((jsonData) => {
      // Convertir le JSON en tableau
      let tableData = [];

      jsonData.forEach((obj) => {
        let rowData = {};

        // Ajouter la colonne avec la lettre du fichier
        rowData["Lettre"] = lettre;
        rowData["Type"] = lettre; // Ajouter la colonne "Type"

        // Parcourir les propriétés de chaque objet
        for (let key in obj) {
          // Si la valeur de la propriété est null, afficher "null"
          rowData[key] = obj[key] !== null ? obj[key] : "null";
        }

        // Ajouter la ligne de données au tableau
        tableData.push(rowData);
      });

      // Mettre à jour les colonnes de la table avec les clés du premier objet
      table.setColumns(
        Object.keys(jsonData[0]).map((key) => ({
          title: key,
          field: key,
        }))
      );

      // Ajouter les données à la table
      table.addData(tableData);
      console.log(tableData);
    })
    .catch((error) => {
      console.error(
        "Une erreur s'est produite lors du chargement des données :",
        error
      );
    });
}

