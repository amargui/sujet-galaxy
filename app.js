fetch("json/jsonA.json")
.then(reponse => reponse.json())
.then(data => console.log(data))