document.addEventListener("DOMContentLoaded", function () {
    let calendrierElement = document.getElementById("calendrier");

    let calendrier = new FullCalendar.Calendar(calendrierElement, {
        initialView: "dayGridMonth",
        selectable: true,
        editable: true,
        headerToolbar: {
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
        },
        //Events est une méthode de FullCalendar permettant la gestion d'événements
        events: function (fetchInfo, successCallback, failureCallback) {
            // Récupérer le planning actuel depuis le localStorage
            let planning = JSON.parse(localStorage.getItem("planning")) || [];

            // Transformer les données du localStorage en un tableau d'événements
            let evenements = planning.map(function (recette) {
                return {
                    title: recette.recette,
                    start: recette.date,
                };
            });

            // L'appel de la fonction successCallback permet à FullCalendar d'afficher les événements dans le calendrier
            successCallback(evenements);
        },
        eventClick: function (info) {
            // Fonction appelée lorsqu'un événement est cliqué
            let modalSuppression = document.getElementById(
                "modalRecetteCliquee-main"
            );
            let modal = new bootstrap.Modal(modalSuppression);

            // Ajouter un gestionnaire d'événements pour le clic sur le bouton de suppression
            let btnSupprimer = modalSuppression.querySelector(
                "#supprimeRecettePlanning-main"
            );
            btnSupprimer.addEventListener("click", function () {
                supprimerRecette(info.event.title); // Supposons que le titre de l'événement correspond au nom de la recette
                modal.hide(); // Cacher la modal après la suppression
                location.reload();
            });

            modal.show();
        },
        //dateClick est une méthode de FullCalendar permettant d'effectuer des actions sur un clic sur le planning
        dateClick: function (info) {
            // Ouvrir la modal Bootstrap au clic sur une date
            let modalPlanning = new bootstrap.Modal(
                document.getElementById("modalRecettes-main")
            );
            modalPlanning.show();

            afficherRecettesFavoris();

            // Gestionnaire d'événement pour le clic sur le bouton "Ajouter au planning"
            document
                .getElementById("ajoutRecettePlanning-main")
                .addEventListener("click", function () {
                    // Récupérer la recette sélectionnée dans le dropdown ainsi que la date sélectionnée dans FullCalendar avec le formattage de celle-ci
                    let recette =
                        document.getElementById("recetteDropdown").value;
                    let date = info.date;

                    let jour = date.getDate();
                    let mois = date.getMonth() + 1;
                    let annee = date.getFullYear();

                    let dateFormattee = annee + "-0" + mois + "-" + jour;

                    // Récupération le planning actuel depuis le localStorage
                    let planning =
                        JSON.parse(localStorage.getItem("planning")) || [];

                    // Vérifier si une recette existe déjà pour cette date
                    let recetteExistante = planning.findIndex(
                        donnee => donnee.recette === recette
                    );

                    if (recetteExistante !== -1) {
                        // Remplacer la date de la recette existante
                        planning[recetteExistante].date = dateFormattee;
                    } else {
                        // Ajouter une nouvelle entrée au tableau
                        planning.push({
                            recette: recette,
                            date: dateFormattee,
                        });
                    }

                    // Enregistrer le planning mis à jour dans le localStorage
                    localStorage.setItem("planning", JSON.stringify(planning));
                    modalPlanning.hide();
                    location.reload();
                });
        },
        // Permet de mettre à jour les recettes déplacées dans le planning en Drag & Drop
        eventDrop: function (info) {
            let planning = JSON.parse(localStorage.getItem("planning")) || [];
            let evenementIndex = planning.findIndex(
                evenement => evenement.recette === info.event.title
            );
            if (evenementIndex !== -1) {
                planning[evenementIndex].date = info.event.startStr; // Mettre à jour la date avec la nouvelle date de l'événement
                localStorage.setItem("planning", JSON.stringify(planning)); // Enregistrer les modifications dans le local storage
            }
        },
    });

    calendrier.render();
});

function supprimerRecette(nomRecette) {
    let planning = JSON.parse(localStorage.getItem("planning")) || [];
    let index = planning.findIndex(recette => recette.recette === nomRecette);
    if (index !== -1) {
        planning.splice(index, 1);
        localStorage.setItem("planning", JSON.stringify(planning));
    }
}

// Fonction pour afficher la liste des recettes favorites dans la modal
function afficherRecettesFavoris() {
    const listefav = document.getElementById("listefav-main");
    listefav.innerHTML = "";

    const listeFavoris = JSON.parse(localStorage.getItem("favoris")) || [];

    const select = document.createElement("select");
    select.setAttribute("id", "recetteDropdown");
    select.setAttribute("class", "form-select");

    listeFavoris.forEach(fav => {
        const option = document.createElement("option");
        option.textContent = fav;
        option.value = fav;
        select.appendChild(option);
    });

    listefav.appendChild(select);
}

//Ajout du JS de favoris
document.addEventListener("DOMContentLoaded", function () {
    siRecetteEnFavorisCalendrier();

    document
        .getElementById("listefav-main")
        .addEventListener("click", function (event) {
            if (event.target.classList.contains("x-btn-favList-main")) {
                const li = event.target.closest("li");
                const favoriTexte = li.querySelector("span").textContent;

                let favoris = JSON.parse(localStorage.getItem("favoris")) || [];
                favoris = favoris.filter(fav => fav !== favoriTexte);

                localStorage.setItem("favoris", JSON.stringify(favoris));

                li.remove();
                siRecetteEnFavorisCalendrier();
            }
        });
});

function siRecetteEnFavorisCalendrier() {
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
            document.getElementById(`logo-fav-main${index + 1}`).textContent =
                "delete_forever";
        }
    });
}
