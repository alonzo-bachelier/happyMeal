let recette = [
  "Poulet rôti aux herbes",
  "Salade de quinoa aux légumes grillés",
  "Tarte aux pommes",
  "Soupe de lentilles",
  "Pâtes Carbonara",
  "Salade de fruits frais",
  "Ratatouille provençale",
  "Salade César",
  "Risotto aux champignons",
  "Muffins aux myrtilles",
  "Lasagnes végétariennes",
  "Salade niçoise",
  "Tiramisu",
];

function afficherRecettes(page) {
  fetch("../json/data.json")
    .then((response) => response.json())
    .then((data) => {
      const recettes = data.recettes; // Accéder à la liste des recettes
      const sectionRecettes = document.querySelector(".repas");

      recettes.forEach((recette, index) => {
        if (index < 5) {
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
        }
      });
    })
    .catch((error) =>
      console.error("Erreur lors de la récupération des recettes :", error)
    );
}

document.addEventListener("DOMContentLoaded", afficherRecettes);

function afficherRecettes() {}
const startIdx = (page - 1) * 5;
const endIdx = startIdx + 5;

const sectionRecettes = document.querySelector(".repas");
sectionRecettes.innerHTML = ""; // Clear la section des recettes
for (let index = startIdx; index < endIdx && index < recette.length; index++)
  function changerPage(page) {
    currentPage = page;
    afficherRecettes(currentPage);
  }

document.getElementById("precedent").addEventListener("click", () => {
  if (currentPage > 1) {
    changerPage(currentPage - 1);
  }
});

document.getElementById("suivant").addEventListener("click", () => {
  if (currentPage < 3) {
    changerPage(currentPage + 1);
  }
});

document.getElementById("1").addEventListener("click", () => {
  changerPage(1);
});

document.getElementById("2").addEventListener("click", () => {
  changerPage(2);
});

document.getElementById("3").addEventListener("click", () => {
  changerPage(3);
});

document.addEventListener("DOMContentLoaded", () => {
  afficherRecettes(currentPage);
});
