$(document).ready(() => {
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

            const recettesAleatoires = indices.map(
                index => data.recettes[index]
            );

            // Mise à jour de la première recette
            $(".nom-aleatoire-un").text(recettesAleatoires[0].nom);
            $("#ingredients-un").empty();
            recettesAleatoires[0].ingredients.forEach(ingredient => {
                $("#ingredients-un").append(
                    `<li>${ingredient.quantite} de ${ingredient.nom}</li>`
                );
            });
            $("#img-recette1").html(
                `<img src="${recettesAleatoires[0].images}" class="activator img-recettes" style="width: 100%;">`
            );

            // Mise à jour de la deuxième recette
            $(".nom-aleatoire-deux").text(recettesAleatoires[1].nom);
            $("#ingredients-deux").empty();
            recettesAleatoires[1].ingredients.forEach(ingredient => {
                $("#ingredients-deux").append(
                    `<li>${ingredient.quantite} de ${ingredient.nom}</li>`
                );
            });
            $("#img-recette2").html(
                `<img src="${recettesAleatoires[1].images}" class="activator img-recettes" style="width: 100%;">`
            );

            // Mise à jour de la troisième recette
            $(".nom-aleatoire-trois").text(recettesAleatoires[2].nom);
            $("#ingredients-trois").empty();
            recettesAleatoires[2].ingredients.forEach(ingredient => {
                $("#ingredients-trois").append(
                    `<li>${ingredient.quantite} de ${ingredient.nom}</li>`
                );
            });
            $("#img-recette3").html(
                `<img src="${recettesAleatoires[2].images}" class="activator img-recettes" style="width: 100%;">`
            );
        })
        .catch(error =>
            console.error("Erreur lors du chargement des données JSON:", error)
        );
});
