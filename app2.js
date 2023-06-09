const url1 = 'json/221410_A.json';
const url2 = 'json/221410_B.json';
const url3 = 'json/244138_A.json';
const url4 = 'json/244138_B.json';
async function fetchData(url) {
    const response = await fetch(url);
    const json = await response.json();
    return(json);
}

fetchData(url1)

async function displayTable(url) {
    const data = await fetchData(url1);
    const container = document.querySelector(".container");
    data.map((item)=>container.innerHTML+=`<br>${item.Redshift}`)
}

displayTable(url1);
displayTable(url2);
displayTable(url3);
displayTable(url4);