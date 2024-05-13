function recupererRecettes() {
    return fetch("../json/data.json")
        .then(reponse => reponse.json())
        .then(json => json.recettes);
}

function obtenirRequeteRecherche() {
    const parametresURL = new URLSearchParams(window.location.search);
    return parametresURL.get("search");
}

function afficherResultats(recettes, recherche) {
    const elementResultat = document.getElementById("resultats");
    if (!elementResultat) {
        console.error("Élément #resultats introuvable.");
        return;
    }

    elementResultat.innerHTML = "";

    const recettesFiltrees = recettes.filter(
        recette =>
            recette.nom.toLowerCase().includes(recherche.toLowerCase()) ||
            (recette.ingredients &&
                recette.ingredients.some(
                    ingredient =>
                        ingredient.nom &&
                        ingredient.nom
                            .toLowerCase()
                            .includes(recherche.toLowerCase())
                ))
    );

    if (recettesFiltrees.length) {
        recettesFiltrees.forEach((recette, index) => {
            const carte = document.createElement("div");
            carte.className = "card recettes";
            carte.style.width = "18rem";
            carte.innerHTML = `
                <img src="${recette.images}" class="card-img-top activator img-recettes" alt="Image de ${recette.nom}">
                <div class="card-body">
                    <h5 class="card-title resultat">${recette.nom}</h5>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exempleModal${index}">
                        Détails recette
                    </button>
                </div>
            `;
            elementResultat.appendChild(carte);

            const modal = document.createElement("div");
            modal.className = "modal fade";
            modal.id = `exempleModal${index}`;
            modal.tabIndex = "-1";
            modal.setAttribute("aria-labelledby", `titreModal${index}`);
            modal.setAttribute("aria-hidden", "true");
            modal.innerHTML = `
                <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="titreModal${index}">${
                recette.nom
            }</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <img src="${
                                recette.images
                            }" class="img-fluid mb-2" alt="Image de ${
                recette.nom
            }">
                            <p><strong>Catégorie:</strong> ${
                                recette.categorie
                            }</p>
                            <p><strong>Temps de préparation:</strong> ${
                                recette.temps_preparation
                            }</p>
                            <p><strong>Ingrédients:</strong></p>
                            <ul>
                                ${recette.ingredients
                                    .map(
                                        ingredient =>
                                            `<li>${
                                                ingredient.quantite
                                                    ? ingredient.quantite +
                                                      " de "
                                                    : ""
                                            }${ingredient.nom}</li>`
                                    )
                                    .join("")}
                            </ul>
                            <p><strong>Étapes:</strong></p>
                            <ol>
                                ${recette.etapes
                                    .map(etape => `<li>${etape}</li>`)
                                    .join("")}
                            </ol>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Quitter</button>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        });
    } else {
        elementResultat.innerHTML = "<p>Aucune recette trouvée.</p>";
    }
}

function principal() {
    const requeteRecherche = obtenirRequeteRecherche();
    if (requeteRecherche) {
        recupererRecettes().then(recettes =>
            afficherResultats(recettes, requeteRecherche)
        );
    }
}
document.addEventListener("DOMContentLoaded", function () {
    principal();
});
