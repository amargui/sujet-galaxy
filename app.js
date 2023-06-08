fetch('json/221410_A.json')
  .then(response => response.json())
  .then(data => {
    let labels = [];
    let values = [];

    // Parcourir les objets JSON et extraire les valeurs des clés "Rank" et "Redshift"
    data.forEach(obj => {
      labels.push(obj.Rank);
      values.push(obj.Redshift);
    });

    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Valeurs',
          data: values,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  })
  .catch(error => {
    console.error('Une erreur s\'est produite :', error);
  });
