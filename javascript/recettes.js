// Chargement des recettes au chargement de la page 2
document.addEventListener("DOMContentLoaded", () => {
    fetch("../json/data.json")
        .then(response => response.json())
        .then(data => {
            recettes = data.recettes; // Stockage des recettes dans la variable globale
            const totalRecettes = recettes.length;
            const totalPages = Math.ceil(totalRecettes / recettesParPage);
            currentPage = Math.min(currentPage, totalPages);
            if (window.location.href === "recettes2.html") {
                afficherRecettes2(currentPage); // Afficher les recettes de la deuxième page
            } else {
                afficherRecettes1(currentPage); // Par défaut, afficher les recettes de la première page
            }
        })
        .catch(error =>
            console.error(
                "Erreur lors de la récupération des recettes :",
                error
            )
        );
});

// Fonction pour afficher les recettes en fonction de la page actuelle pour la page 2
function afficherRecettes2(page) {
    const sectionRecettes = document.getElementsByClassName(".repas2");
    sectionRecettes.innerHTML = ""; // Clear la section des recettes

    const startIdx = (page - 1) * recettesParPage;
    const endIdx = Math.min(startIdx + recettesParPage, recettes.length);

    for (let index = startIdx; index < endIdx; index++) {
        const recette = recettes[index];
        const recetteElement = document.createElement("div");
        recetteElement.classList.add("recette");
        recetteElement.setAttribute("id", "recette-" + index); // id unique

        const contenuRecette = `
      <img src="${recette.images}" style="width:200px; height:auto;">
      <h2>${recette.nom}</h2>
      <p>Catégorie : ${recette.categorie}</p>
      <p>Temps de préparation : ${recette.temps_preparation}</p>
      <h3>Ingrédients :</h3>
      <ul>
        ${recette.ingredients
            .map(
                ingredient =>
                    `<li>${ingredient.nom} : ${ingredient.quantite}<button class="btn btn-success bouton-ingredient d-flex align-items-center justify-content-center"> <i class="tiny material-icons ajoutIngredientCourse" data-ingredient="${ingredient.nom}">add</i></button></li>`
            )
            .join("")}
      </ul>
      <h3>Étapes :</h3>
      <ol>
        ${recette.etapes.map(etape => `<li>${etape}</li>`).join("")}
      </ol>
    `;

        recetteElement.innerHTML = contenuRecette;
        sectionRecettes.appendChild(recetteElement);
    }
    mettreAJourAffichageIngredients();
}

let recettes = []; // Variable globale pour stocker toutes les recettes
let currentPage = 1; // Page actuelle
const recettesParPage = 5; // Nombre de recettes par page

// Fonction pour afficher les recettes en fonction de la page actuelle
function afficherRecettes1(page) {
    const sectionRecettes = document.querySelector(".repas1");
    sectionRecettes.innerHTML = ""; // Clear la section des recettes

    const startIdx = (page - 1) * recettesParPage;
    const endIdx = Math.min(startIdx + recettesParPage, recettes.length);

    for (let index = startIdx; index < endIdx; index++) {
        const recette = recettes[index];
        const recetteElement = document.createElement("div");
        recetteElement.classList.add("recette");
        recetteElement.setAttribute("id", "recette-" + index); // id unique

        const contenuRecette = `
      <img src="${recette.images}" style="width:200px; height:auto;">
      <h2>${recette.nom}</h2>
      <p>Catégorie : ${recette.categorie}</p>
      <p>Temps de préparation : ${recette.temps_preparation}</p>
      <h3>Ingrédients :</h3>
      <ul>
        ${recette.ingredients
            .map(
                ingredient =>
                    `<li>${ingredient.nom} : ${ingredient.quantite}<button class="btn btn-success bouton-ingredient d-flex align-items-center justify-content-center"> <i class="tiny material-icons ajoutIngredientCourse" data-ingredient="${ingredient.nom}">add</i></button></li>`
            )
            .join("")}
      </ul>
      <h3>Étapes :</h3>
      <ol>
        ${recette.etapes.map(etape => `<li>${etape}</li>`).join("")}
      </ol>
    `;

        recetteElement.innerHTML = contenuRecette;
        sectionRecettes.appendChild(recetteElement);
    }
    mettreAJourAffichageIngredients();
}

// Fonction pour afficher les recettes en fonction de la page actuelle
function afficherRecettes3(page3) {
    const sectionRecettes = document.querySelector(".repas3");
    sectionRecettes.innerHTML = ""; // Clear la section des recettes

    const startIdx = (page3 - 1) * recettesParPage;
    const endIdx = Math.min(startIdx + recettesParPage, recettes.length);

    for (let index = startIdx; index < endIdx; index++) {
        const recette = recettes[index];
        const recetteElement = document.createElement("div");
        recetteElement.classList.add("recette");
        recetteElement.setAttribute("id", "recette-" + index); // id unique

        const contenuRecette = `
      <img src="${recette.images}" style="width:200px; height:auto;">
      <h2>${recette.nom}</h2>
      <p>Catégorie : ${recette.categorie}</p>
      <p>Temps de préparation : ${recette.temps_preparation}</p>
      <h3>Ingrédients :</h3>
      <ul>
        ${recette.ingredients
            .map(
                ingredient =>
                    `<li>${ingredient.nom} : ${ingredient.quantite}<button class="btn btn-success bouton-ingredient d-flex align-items-center justify-content-center"> <i class="tiny material-icons ajoutIngredientCourse" data-ingredient="${ingredient.nom}">add</i></button></li>`
            )
            .join("")}
      </ul>
      <h3>Étapes :</h3>
      <ol>
        ${recette.etapes.map(etape => `<li>${etape}</li>`).join("")}
      </ol>
    `;

        recetteElement.innerHTML = contenuRecette;
        sectionRecettes.appendChild(recetteElement);
    }
    mettreAJourAffichageIngredients();
}

// Fonction pour changer de page
function changerPage(page) {
    currentPage = page;
    afficherRecettes1(currentPage);
    mettreAJourAffichageIngredients();
}

// Gestion des événements pour la pagination
document.getElementById("btn_prev").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        changerPage(currentPage);
    }
});
document.getElementById("btn_next").addEventListener("click", () => {
    if (currentPage < 3) {
        currentPage++;
        changerPage(currentPage); // Met à jour la page actuelle
        if (window.location.href === "recettes2.html") {
            afficherRecettes2(currentPage); // Affiche les 5 recettes suivantes sur la page 2
        } else if (window.location.href === "recettes3.html") {
            afficherRecettes3(currentPage); // Affiche les 5 recettes suivantes sur la page 3
        }
    }
    mettreAJourAffichageIngredients();
});

document.getElementById("btn_next").addEventListener("click", () => {
    if (currentPage < 3) {
        currentPage++;
        changerPage(currentPage);
    }
    mettreAJourAffichageIngredients();
});

// Chargement des recettes au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
    fetch("../json/data.json")
        .then(response => response.json())
        .then(data => {
            recettes = data.recettes; // Stockage des recettes dans la variable globale
            afficherRecettes1(currentPage); // Afficher les recettes de la première page
        })
        .catch(error =>
            console.error(
                "Erreur lors de la récupération des recettes :",
                error
            )
        );
    if (window.location.href === "recettes2.html") {
        afficherRecettes2(currentPage);
    } else if (window.location.href === "recettes3.html") {
        afficherRecettes3(currentPage);
    } else {
        console.log("erreur");
    }
    mettreAJourAffichageIngredients();
});
document.addEventListener("DOMContentLoaded", () => {
    fetch("../json/data.json")
        .then(response => response.json())
        .then(data => {
            const repas2 = document.querySelector(".repas2"); // Déplacer cette ligne en dehors de la boucle

            let contenuRecettes = ""; // Créer une variable pour stocker le contenu de toutes les recettes

            for (let i = 5; i <= 9; i++) {
                const recette = data.recettes[i];
                contenuRecettes += `
          <div class="recette">
            <img src="${recette.images}" style="width:200px; height:auto;">
            <h2>${recette.nom}</h2>
            <p>Catégorie : ${recette.categorie}</p>
            <p>Temps de préparation : ${recette.temps_preparation}</p>
            <h3>Ingrédients :</h3>
            <ul class="ingredients">
              ${recette.ingredients
                  .map(
                      ingredient =>
                          `<li>${
                              typeof ingredient === "string"
                                  ? ingredient
                                  : `${ingredient.quantite} de ${ingredient.nom}<button class="btn btn-success bouton-ingredient d-flex align-items-center justify-content-center"> <i class="tiny material-icons ajoutIngredientCourse" data-ingredient="${ingredient.nom}">add</i></button>`
                          }</li>`
                  )
                  .join("")}
            </ul>
            <h3>Étapes :</h3>
            <ol>
              ${recette.etapes.map(etape => `<li>${etape}</li>`).join("")}
            </ol>
          </div>
        `;
            }

            repas2.innerHTML = contenuRecettes; // Affecter le contenu de toutes les recettes une seule fois
        });
    mettreAJourAffichageIngredients();
});
document.addEventListener("DOMContentLoaded", () => {
    fetch("../json/data.json")
        .then(response => response.json())
        .then(data => {
            const repas3 = document.querySelector(".repas3"); // Déplacer cette ligne en dehors de la boucle

            let contenuRecettes = ""; // Créer une variable pour stocker le contenu de toutes les recettes

            for (let i = 10; i <= 12; i++) {
                const recette = data.recettes[i];
                contenuRecettes += `
          <div class="recette">
            <img src="${recette.images}" style="width:200px; height:auto;">
            <h2>${recette.nom}</h2>
            <p>Catégorie : ${recette.categorie}</p>
            <p>Temps de préparation : ${recette.temps_preparation}</p>
            <h3>Ingrédients :</h3>
            <ul class="ingredients">
              ${recette.ingredients
                  .map(
                      ingredient =>
                          `<li>${
                              typeof ingredient === "string"
                                  ? ingredient
                                  : `${ingredient.quantite} de ${ingredient.nom}<button class="btn btn-success bouton-ingredient d-flex align-items-center justify-content-center"> <i class="tiny material-icons ajoutIngredientCourse" data-ingredient="${ingredient.nom}">add</i></button>`
                          }</li>`
                  )
                  .join("")}
            </ul>
            <h3>Étapes :</h3>
            <ol>
              ${recette.etapes.map(etape => `<li>${etape}</li>`).join("")}
            </ol>
          </div>
        `;
            }

            repas3.innerHTML = contenuRecettes; // Affecter le contenu de toutes les recettes une seule fois
        });
    mettreAJourAffichageIngredients();
});
