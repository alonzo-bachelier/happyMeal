function afficherecette() {
  fetch("../json/data.json")
    .then((response) => response.json())
    .then((data) => {
      const recettes = data.recettes; // Accéder à la liste des recettes
      const sectionRecettes = document.querySelector(".repas");

      recettes.forEach((recette) => {
        const recetteElement = document.createElement("div");
        recetteElement.classList.add("recette");

        const contenuRecette = `
                    <img src="${
                      recette.images
                    }" style="width:200px; heigth:auto;">
                    <h2>${recette.nom}</h2>
                    <p>Catégorie : ${recette.categorie}</p>
                    <p>Temps de préparation : ${recette.temps_preparation}</p>
                    <h3>Ingrédients :</h3>
                    <ul>
                        ${recette.ingredients
                          .map(
                            (ingredient) =>
                              `<li>${ingredient.nom} : ${ingredient.quantite}</li>`
                          )
                          .join("")}
                    </ul>
                    <h3>Étapes :</h3>
                    <ol>
                        ${recette.etapes
                          .map((etape) => `<li>${etape}</li>`)
                          .join("")}
                    </ol>
                `;

        recetteElement.innerHTML = contenuRecette;
        sectionRecettes.appendChild(recetteElement);
      });
    })
    .catch((error) =>
      console.error("Erreur lors de la récupération des recettes :", error)
    );
}

document.addEventListener("DOMContentLoaded", afficherecette);
