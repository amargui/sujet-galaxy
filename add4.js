// Créer les instances de Tabulator pour les tableaux
const table1 = new Tabulator("#my-table-221410", {
    columns: [
      { title: "Type", field: "type" }, // Nouvelle colonne pour afficher le type (A ou B)
    ],
  });
  
  const table2 = new Tabulator("#my-table-244138", {
    columns: [
      { title: "Type", field: "type" }, // Nouvelle colonne pour afficher le type (A ou B)
    ],
  });
  
  // Appeler la fonction fetchData pour chaque fichier JSON
  fetchData("json/221410_A.json", "A", table1);
  fetchData("json/221410_B.json", "B", table1);
  fetchData("json/244138_A.json", "A", table2);
  fetchData("json/244138_B.json", "B", table2);
  
  // Gestionnaire d'événements pour le clic sur le bouton "Comparer"
  document.getElementById("btnComparer").addEventListener("click", function () {
    comparerChamps(table1);
    comparerChamps(table2);
  });
  
  // Récupérer les données JSON via fetch et ajouter les données à la table
  function fetchData(nomFichier, type, table) {
    fetch(nomFichier)
      .then((response) => response.json())
      .then((jsonData) => {
        // Ajouter les données à la table
        table.setData(jsonData.map((obj) => ({ ...obj, type })));
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors du chargement des données :",
          error
        );
      });
  }
  
  // Fonction pour comparer les champs entre les deux fichiers JSON
  function comparerChamps(table) {
    // Récupérer les lignes de la table
    const rows = table.getRows();
  
    // Parcourir les lignes et comparer les valeurs des cellules
    rows.forEach((row) => {
      const cells = row.getCells();
  
      // Parcourir les cellules de la ligne
      cells.forEach((cell) => {
        const cellValue = cell.getValue();
        const field = cell.getField();
  
        // Récupérer la valeur de la même cellule dans l'autre fichier JSON
        const otherRow = table
          .getRows()
          .find((r) => r.getData().type !== row.getData().type);
        const otherCell = otherRow.getCell(field);
        const otherCellValue = otherCell.getValue();
  
        // Comparer les valeurs et mettre en forme les cellules différentes
        if (cellValue !== otherCellValue) {
          cell.getElement().classList.add("diff");
        }
      });
    });
  }
  