fetch('json/jsonA.json')
.then(response => response.json())
.then(data=> console.log(data))