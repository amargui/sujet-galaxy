const url1 = `json/221410_A.json`;
const url2 = `json/221410_B.json`;

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function combineData() {
  const dataA = await fetchData(url1);
  const dataB = await fetchData(url2);

  const combinedData = dataA.map((itemA) => {
    const itemB = dataB.find((item) => item.Redshift === itemA.Redshift);
    const combinedItem = {};

    Object.keys(itemA).forEach((propertyName) => {
      if (itemB.hasOwnProperty(propertyName)) {
        combinedItem[propertyName] = [
          itemA[propertyName],
          itemB[propertyName],
        ];
      } else {
        combinedItem[propertyName] = [itemA[propertyName], null];
      }
    });

    Object.keys(itemB).forEach((propertyName) => {
      if (!itemA.hasOwnProperty(propertyName)) {
        combinedItem[propertyName] = [null, itemB[propertyName]];
      }
    });

    return combinedItem;
  });

  return combinedData;
}

async function comparerDiff() {
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

  const diffTable = new Tabulator("#diff-table", {
    data: diffArray,
    columns: Object.keys(diffArray[0]).map((propertyName) => ({
      title: propertyName,
      field: propertyName,
      sorter: "number",
    })),
  });

  return diffArray;
}

comparerDiff();

async function comparerEcartPourcentage() {
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

  const ecartPourcentageTable = new Tabulator("#e-table", {
    data: diffArray,
    columns: Object.keys(diffArray[0]).map((propertyName) => ({
      title: propertyName,
      field: propertyName,
      sorter: "number",
    })),
  });

  return diffArray;
}

comparerEcartPourcentage();

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

  const ecartPourcentageTable = new Tabulator("#e-table", {
    data: diffArray,
    columns: Object.keys(diffArray[0]).map((propertyName) => ({
      title: propertyName,
      field: propertyName,
      sorter: "number",
    })),
  });

  return diffArray;
}

e();
