// Tableau pour stocker les instances de Tabulator
const tables = [];

// Générer les tables et les ajouter au document
const tableNames = ["A", "B", "C", "D"];
tableNames.forEach((name) => {
  const tableElement = document.createElement("div");
  tableElement.id = `my-table${name}`;
  document.body.appendChild(tableElement);
  tables.push(new Tabulator(`#my-table${name}`, { columns: [] }));
});

// Appeler la fonction fetchData pour chaque fichier JSON
fetchData("json/221410_A.json", tables[0]);
fetchData("json/221410_B.json", tables[1]);
fetchData("json/244138_A.json", tables[2]);
fetchData("json/244138_B.json", tables[3]);

// Récupérer les données JSON via fetch
function fetchData(nomfichier, table) {
  fetch(nomfichier)
    .then((response) => response.json())
    .then((jsonData) => {
      // Convertir le JSON en tableau
      let tableData = [];

      jsonData.forEach((obj) => {
        let rowData = {};

        // Parcourir les propriétés de chaque objet
        for (let key in obj) {
          rowData[key] = obj[key];
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
    })
    .catch((error) => {
      console.error(
        "Une erreur s'est produite lors du chargement des données :",
        error
      );
    });
}
