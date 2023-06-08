fetch("json/221410_A.json")
.then(reponse => reponse.json())
.then(data => console.log(data))