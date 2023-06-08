<?php

//lire le contenu des fichiers JSON
$jsonB = file_get_contents('json/221410_B.json');
$jsonA = file_get_contents('json/221410_A.json');

//Convertir les fichiers JSON en tableau PHP
$tableauB = json_decode($jsonB, true);
$tableauA = json_decode($jsonA, true);

//Comparer les valeurs et calculer les differences relatives
$result = array();

foreach ($tableauB as $key => $valueB) {
    if (isset($tableauA[$key])) {
        $diff = abs($tableauA[$key] - $valueB) / $valueB;
        $result[$key] = $diff;
    }
}

//Afficher les résultats
echo json_encode($result, JSON_PRETTY_PRINT);
