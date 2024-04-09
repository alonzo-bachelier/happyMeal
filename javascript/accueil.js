function recharger() {
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

            $(".nom-aleatoire-un").text(recettesAleatoires[0].nom);
            $("#ingredients-un").empty();
            recettesAleatoires[0].ingredients.forEach(ingredient => {
                if (typeof ingredient === "string") {
                    $("#ingredients-un").append(`<li>${ingredient}</li>`);
                } else {
                    $("#ingredients-un").append(
                        `<li>${ingredient.quantite} de ${ingredient.nom}</li>`
                    );
                }
            });
            $("#img-recette1").html(
                `<img src="${recettesAleatoires[0].images}" class="activator img-recettes" style="width: 100%;">`
            );

            $(".nom-aleatoire-deux").text(recettesAleatoires[1].nom);
            $("#ingredients-deux").empty();
            recettesAleatoires[1].ingredients.forEach(ingredient => {
                if (typeof ingredient === "string") {
                    $("#ingredients-deux").append(`<li>${ingredient}</li>`);
                } else {
                    $("#ingredients-deux").append(
                        `<li>${ingredient.quantite} de ${ingredient.nom}</li>`
                    );
                }
            });
            $("#img-recette2").html(
                `<img src="${recettesAleatoires[1].images}" class="activator img-recettes" style="width: 100%;">`
            );

            // Correction supposée
            $(".nom-aleatoire-trois").text(recettesAleatoires[2].nom);
            $("#ingredients-trois").empty();
            recettesAleatoires[2].ingredients.forEach(ingredient => {
                // Vérifie si l'ingrédient est une chaîne pour la 'Salade de fruits frais'
                if (typeof ingredient === "string") {
                    $("#ingredients-trois").append(`<li>${ingredient}</li>`);
                } else {
                    // Sinon, l'ingrédient est traité comme un objet
                    $("#ingredients-trois").append(
                        `<li>${ingredient.quantite} de ${ingredient.nom}</li>`
                    );
                }
            });

            $("#img-recette3").html(
                `<img src="${recettesAleatoires[2].images}" class="activator img-recettes" style="width: 100%;">`
            );
        })
        .catch(error =>
            console.error("Erreur lors du chargement des données JSON:", error)
        );
    $("#add-bouton1").click(() => {
        recettesAleatoires[0];
    });
}
recharger();
$("#recharger").on("click", recharger);

$("#add-bouton1").on("click", () => {
    $(this).text("delete_forever");
});
$("#add-bouton2").on("click", () => {
    $(this).text("delete_forever");
});
$("#add-bouton3").on("click", () => {
    $(this).text("delete_forever");
});
