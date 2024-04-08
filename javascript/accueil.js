$(document).ready(() => {
    fetch("../json/data.json")
        .then(response => response.json())
        .then(data => {
            const recettes = data.recettes;
            const indexAleatoire = Math.floor(Math.random() * recettes.length);
            const recetteAleatoire = recettes[indexAleatoire];

            $(".nom-aleatoire-un").text(recetteAleatoire.nom);

            $("#ingredients").empty();
            recetteAleatoire.ingredients.forEach(ingredient => {
                $("#ingredients").append(
                    `<li>${ingredient.quantite} de ${ingredient.nom}</li>`
                );
            });
        })
        .catch(error =>
            console.error("Erreur lors du chargement des données JSON:", error)
        );
});
