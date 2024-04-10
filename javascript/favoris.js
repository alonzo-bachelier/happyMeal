document.addEventListener("DOMContentLoaded", function () {
    const boutonsFavoris = document.querySelectorAll(".bouton-favoris");
    // Charger les favoris depuis le localStorage ou initialiser un tableau vide si rien n'est trouvé
    let favoris = JSON.parse(localStorage.getItem("favoris")) || [];

    boutonsFavoris.forEach(function (bouton) {
        bouton.addEventListener("click", function () {
            let card = this.closest(".card");
            let nomRecettes = [
                card.querySelector(".nom-aleatoire-un")?.textContent,
                card.querySelector(".nom-aleatoire-deux")?.textContent,
                card.querySelector(".nom-aleatoire-trois")?.textContent,
            ].filter(Boolean); // Filtrer les valeurs non définies ou nulles

            nomRecettes.forEach(nom => {
                if (favoris.includes(nom)) {
                    // Supprimer la recette des favoris si elle est déjà présente
                    favoris = favoris.filter(favori => favori !== nom);
                } else {
                    // Ajouter la recette aux favoris si elle n'est pas déjà présente
                    favoris = [...favoris, nom];
                }
            });

            // Mettre à jour le localStorage avec le nouvel état des favoris
            localStorage.setItem("favoris", JSON.stringify(favoris));

            console.log(favoris);
        });
    });

    document
        .getElementById("afficherFavoris")
        .addEventListener("click", function () {
            const listefav = document.getElementById("listefav");
            const listeFavoris = localStorage.getItem("favoris");
            JSON.parse(listeFavoris).forEach(fav => {
                console.log(fav);
                const p = document.createElement("p");
                p.innerHTML = `${fav} <button id="supprFav">x</button> `;

                listefav.append(p);
            });

            console.log(listeFavoris);
        });
});
