$(document).ready(function () {
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

                // Mise à jour de la première recette
                $(".nom-aleatoire-un").text(recettesAleatoires[0].nom);
                $("#ingredients-un").empty();
                recettesAleatoires[0].ingredients.forEach(ingredient => {
                    if (typeof ingredient === "string") {
                        $("#ingredients-un").append(`<li>${ingredient}</li>`);
                    } else {
                        $("#ingredients-un").append(
                            `<li>${ingredient.quantite} de ${ingredient.nom} <button class="tiny material-icons ajoutIngredientCourse" data-ingredient="${ingredient.nom}">add</button></li>`
                        );
                    }
                });
                $("#img-recette1").html(
                    `<img src="${recettesAleatoires[0].images}" class="activator img-recettes" style="width: 100%;">`
                );
                $("#duree1")
                    .empty()
                    .append(
                        `<p>Temps de préparation: ${recettesAleatoires[0].temps_preparation}</p>`
                    );
                $("#etapes1")
                    .empty()
                    .append(`<p>Etapes: ${recettesAleatoires[0].etapes}</p>`);

                // Mise à jour de la deuxième recette
                $(".nom-aleatoire-deux").text(recettesAleatoires[1].nom);
                $("#ingredients-deux").empty();
                recettesAleatoires[1].ingredients.forEach(ingredient => {
                    if (typeof ingredient === "string") {
                        $("#ingredients-deux").append(`<li>${ingredient}</li>`);
                    } else {
                        $("#ingredients-deux").append(
                            `<li>${ingredient.quantite} de ${ingredient.nom} <button class="tiny material-icons ajoutIngredientCourse" data-ingredient="${ingredient.nom}">add</button></li>`
                        );
                    }
                });
                $("#img-recette2").html(
                    `<img src="${recettesAleatoires[1].images}" class="activator img-recettes" style="width: 100%;">`
                );
                $("#duree2")
                    .empty()
                    .append(
                        `<p>Temps de préparation: ${recettesAleatoires[1].temps_preparation}</p>`
                    );
                $("#etapes2")
                    .empty()
                    .append(`<p>Etapes: ${recettesAleatoires[1].etapes}</p>`);

                // Mise à jour de la troisième recette
                $(".nom-aleatoire-trois").text(recettesAleatoires[2].nom);
                $("#ingredients-trois").empty();
                recettesAleatoires[2].ingredients.forEach(ingredient => {
                    if (typeof ingredient === "string") {
                        $("#ingredients-trois").append(
                            `<li>${ingredient}</li>`
                        );
                    } else {
                        $("#ingredients-trois").append(
                            `<li>${ingredient.quantite} de ${ingredient.nom} <button class="tiny material-icons ajoutIngredientCourse" data-ingredient="${ingredient.nom}">add</button></li>`
                        );
                    }
                });
                $("#img-recette3").html(
                    `<img src="${recettesAleatoires[2].images}" class="activator img-recettes" style="width: 100%;">`
                );
                $("#duree3")
                    .empty()
                    .append(
                        `<p>Temps de préparation: ${recettesAleatoires[2].temps_preparation}</p>`
                    );
                $("#etapes3")
                    .empty()
                    .append(`<p>Etapes: ${recettesAleatoires[2].etapes}</p>`);
            })
            .then(() => {
                siRecetteEnFavoris();
            })
            .catch(error =>
                console.error(
                    "Erreur lors du chargement des données JSON:",
                    error
                )
            );
    }

    recharger();
    $("#recharger").on("click", recharger);

    $("body").on("click", ".bouton-fermer-ouvrir", function () {
        let card = $(this).closest(".card");
        card.hasClass("revealed")
            ? card.removeClass("revealed")
            : card.addClass("revealed");
    });
});
