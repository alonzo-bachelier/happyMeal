$(document).ready(() => {
    fetch("../json/data.json")
        .then(response => response.json())
        .then(data => {
            const recettes = data.recettes;
            const indexAleatoire = Math.floor(Math.random() * recettes.length);
            const recetteAleatoire = recettes[indexAleatoire];

            $(".nom-aleatoire-un").text(recetteAleatoire.nom);

            $("#ingredients-un").empty();
            recetteAleatoire.ingredients.forEach(ingredient => {
                $("#ingredients").append(
                    `<li>${ingredient.quantite} de ${ingredient.nom}</li>`
                );
            });
        })
        .catch(error =>
            console.error("Erreur lors du chargement des données JSON:", error)
        );
    fetch("../json/data.json")
        .then(response => response.json())
        .then(data => {
            const recettes = data.recettes;
            const indexAleatoire = Math.floor(Math.random() * recettes.length);
            const recetteAleatoire = recettes[indexAleatoire];

            $(".nom-aleatoire-deux").text(recetteAleatoire.nom);

            $("#ingredients-deux").empty();
            recetteAleatoire.ingredients.forEach(ingredient => {
                $("#ingredients").append(
                    `<li>${ingredient.quantite} de ${ingredient.nom}</li>`
                );
            });
        })
        .catch(error =>
            console.error("Erreur lors du chargement des données JSON:", error)
        );
    fetch("../json/data.json")
        .then(response => response.json())
        .then(data => {
            const recettes = data.recettes;
            const indexAleatoire = Math.floor(Math.random() * recettes.length);
            const recetteAleatoire = recettes[indexAleatoire];

            $(".nom-aleatoire-trois").text(recetteAleatoire.nom);

            $("#ingredients-trois").empty();
            recetteAleatoire.ingredients.forEach(ingredient => {
                $("#ingredients").append(
                    `<li>${ingredient.quantite} de ${ingredient.nom}</li>`
                );
            });
        })
        .catch(error =>
            console.error("Erreur lors du chargement des données JSON:", error)
        );
    fetch("../json/data.json")
        .then(response => response.json())
        .then(data => {
            let indices = [];

            while (indices.length < 3) {
                let indexAleatoire = Math.floor(
                    Math.random() * data.recettes.length
                );
                if (!indices.includes(indexAleatoire)) {
                    indices.push(indexAleatoire);
                }
            }

            $(".nom-aleatoire-un").text(data.recettes[indices[0]].nom);
            $(".nom-aleatoire-deux").text(data.recettes[indices[1]].nom);
            $(".nom-aleatoire-trois").text(data.recettes[indices[2]].nom);
        });
});
