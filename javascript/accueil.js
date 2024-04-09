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

                $(".nom-aleatoire-trois").text(recettesAleatoires[2].nom);
                $("#ingredients-trois").empty();
                recettesAleatoires[2].ingredients.forEach(ingredient => {
                    if (typeof ingredient === "string") {
                        $("#ingredients-trois").append(
                            `<li>${ingredient}</li>`
                        );
                    } else {
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
                console.error(
                    "Erreur lors du chargement des données JSON:",
                    error
                )
            );
    }
    recharger();
    $("#recharger").on("click", () => {
        recharger();
        $("#logo-fav1").text("favorite_border");
        $("#logo-fav2").text("favorite_border");
        $("#logo-fav3").text("favorite_border");
    });

    $("body").on("click", "#add-bouton1", function () {
        let icon = $("#logo-fav1").text();
        if (icon === "favorite_border") {
            $("#logo-fav1").text("delete_forever");
        } else {
            $("#logo-fav1").text("favorite_border");
        }
    });

    $("body").on("click", "#add-bouton2", function () {
        let icon = $("#logo-fav2").text();
        if (icon === "favorite_border") {
            $("#logo-fav2").text("delete_forever");
        } else {
            $("#logo-fav2").text("favorite_border");
        }
    });

    $("body").on("click", "#add-bouton3", function () {
        let icon = $("#logo-fav3").text();
        if (icon === "favorite_border") {
            $("#logo-fav3").text("delete_forever");
        } else {
            $("#logo-fav3").text("favorite_border");
        }
    });
});
