fetch('json/221410_A.json')
  .then(response => response.json())
  .then(data => {
    let donneesJSONString = JSON.stringify(data, null, 2);
    document.getElementById("resultat").innerHTML = "<pre>" + donneesJSONString + "</pre>";
  })
  .catch(error => {
    console.error('Une erreur s\'est produite :', error);
  });
