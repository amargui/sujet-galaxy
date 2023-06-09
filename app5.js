const mainTitle = (document.querySelector("h1").innerText = document.title);
const url1 = `json/221410_A.json`;
const url2 = `json/221410_B.json`;

async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    // console.log("data => ", data);
    return data;
}

async function combineData() {
    const dataA = await fetchData(url1);
    const dataB = await fetchData(url2);

    const combinedData = dataA.map((itemA) => {
        const itemB = dataB.find((item) => item.Redshift === itemA.Redshift);
        const combinedItem = {};

        // Parcourir les propriétés de itemA
        Object.keys(itemA).forEach((propertyName) => {
            // Vérifier si la propriété existe dans itemB
            if (itemB.hasOwnProperty(propertyName)) {
                combinedItem[propertyName] = [
                    itemA[propertyName],
                    itemB[propertyName],
                ]; // Stocker les deux valeurs dans un tableau
            } else {
                combinedItem[propertyName] = [itemA[propertyName], null]; // Si la propriété n'existe pas dans itemB, stocker la valeur de itemA et null dans un tableau
            }
        });

        // Parcourir les propriétés de itemB pour vérifier si elles existent dans itemA
        Object.keys(itemB).forEach((propertyName) => {
            if (!itemA.hasOwnProperty(propertyName)) {
                combinedItem[propertyName] = [null, itemB[propertyName]]; // Si la propriété existe uniquement dans itemB, stocker null et la valeur de itemB dans un tableau
            }
        });

        console.log("combinedItem => ", combinedItem);
        return combinedItem;
    });

    return combinedData;
}

async function diff() {
    const data = await combineData();
    const diffArray = data.map((item) => {
        const diffValues = {};
        Object.keys(item).forEach((propertyName) => {
            const [valueA, valueB] = item[propertyName];
            if (typeof valueA === "number" && typeof valueB === "number") {
                diffValues[propertyName] = valueA - valueB;
            } else {
                diffValues[propertyName] = null;
            }
        });

        return diffValues;
    });
    console.log(
        "diff ***********************************************************"
    );
    console.table(diffArray);
    return diffArray;
}

diff();

async function e() {
    const data = await combineData();
    const diffArray = data.map((item) => {
        const diffValues = {};
        Object.keys(item).forEach((propertyName) => {
            const [valueA, valueB] = item[propertyName];
            if (typeof valueA === "number" && typeof valueB === "number") {
                diffValues[propertyName] = ((valueA - valueB) / valueB) * 100;
            } else {
                diffValues[propertyName] = null;
            }
        });

        return diffValues;
    });
    console.log(
        "Ecart en % *********************************************************** "
    );
    console.table(diffArray);
    return diffArray;
}

e();
