const tableA = document.createElement("div");
tableA.id = "my-tableA";
document.body.appendChild(tableA);
console.log(tableA);

const tableB = document.createElement("div");
tableB.id = "my-tableB";
document.body.appendChild(tableB);
console.log(tableB);

const tableC = document.createElement("div");
tableC.id = "my-tableC";
document.body.appendChild(tableC);
console.log(tableC);

const tableD = document.createElement("div");
tableD.id = "my-tableD";
document.body.appendChild(tableD);
console.log(tableD);


 // Créer une instance de Tabulator avec la configuration souhaitée
      let table1 = new Tabulator("#my-tableA", {
        columns: [],
      });
      let table2 = new Tabulator("#my-tableB", {
        columns: [],
      });
      let table3 = new Tabulator("#my-tableC", {
        columns: [],
      });
      let table4 = new Tabulator("#my-tableD", {
        columns: [],
      });

// Appeler la fonction fetchData pour chaque fichier JSON
fetchData("json/221410_A.json", table1);
fetchData('json/221410_B.json', table2);
fetchData('json/244138_A.json', table3);
fetchData('json/244138_B.json', table4);

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
