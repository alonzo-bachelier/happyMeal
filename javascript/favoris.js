document.addEventListener("DOMContentLoaded", function () {
    siRecetteEnFavoris();

    document.querySelectorAll(".bouton-favoris").forEach(function (bouton) {
        bouton.addEventListener("click", function () {
            const card = this.closest(".card");
            const nomRecette = card.querySelector(
                ".nom-aleatoire-un, .nom-aleatoire-deux, .nom-aleatoire-trois"
            ).textContent;

            let favoris = JSON.parse(localStorage.getItem("favoris")) || [];

            if (favoris.includes(nomRecette)) {
                favoris = favoris.filter(favori => favori !== nomRecette);
            } else {
                favoris.push(nomRecette);
            }

            localStorage.setItem("favoris", JSON.stringify(favoris));
            listefav.classList.add("cacherLaListe");

            siRecetteEnFavoris();
        });
    });

    document
        .getElementById("afficherFavoris")
        .addEventListener("click", function () {
            const listefav = document.getElementById("listefav");
            listefav.innerHTML = "";
            const listeFavoris =
                JSON.parse(localStorage.getItem("favoris")) || [];
            listeFavoris.forEach(fav => {
                const ul = document.createElement("ul");
                ul.setAttribute("id", "ul-fav");
                ul.innerHTML = `<li><span>${fav}</span><i class="x-btn-favList tiny material-icons">delete_forever</i></li>`;
                listefav.appendChild(ul);
            });
            siRecetteEnFavoris();
        });

    document
        .getElementById("listefav")
        .addEventListener("click", function (event) {
            if (event.target.classList.contains("x-btn-favList")) {
                const li = event.target.closest("li");
                const favoriTexte = li.querySelector("span").textContent;

                let favoris = JSON.parse(localStorage.getItem("favoris")) || [];
                favoris = favoris.filter(fav => fav !== favoriTexte);

                localStorage.setItem("favoris", JSON.stringify(favoris));

                li.remove();
                siRecetteEnFavoris();
            }
        });
});

function siRecetteEnFavoris() {
    const listeFavoris = JSON.parse(localStorage.getItem("favoris")) || [];
    let nomRecettes = [
        document.querySelector(".nom-aleatoire-un")?.textContent,
        document.querySelector(".nom-aleatoire-deux")?.textContent,
        document.querySelector(".nom-aleatoire-trois")?.textContent,
    ].filter(Boolean);

    document.getElementById("logo-fav1").textContent = "favorite_border";
    document.getElementById("logo-fav2").textContent = "favorite_border";
    document.getElementById("logo-fav3").textContent = "favorite_border";

    nomRecettes.forEach((nom, index) => {
        if (nom && listeFavoris.includes(nom)) {
            document.getElementById(`logo-fav${index + 1}`).textContent =
                "delete_forever";
        }
    });
}