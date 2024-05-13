document.addEventListener("DOMContentLoaded", function () {
    mettreAJourAffichageIngredients();
    if (!localStorage.getItem("courses")) {
        localStorage.setItem("courses", JSON.stringify([]));
    }

    function mettreAJourAffichageIngredients() {
        const courses = JSON.parse(localStorage.getItem("courses")) || [];
        document.querySelectorAll("[data-ingredient]").forEach(bouton => {
            const ingredient = bouton.getAttribute("data-ingredient");
            bouton.textContent = courses.includes(ingredient)
                ? "remove"
                : "add";
        });
    }

    document.body.addEventListener("click", function (evenement) {
        if (evenement.target.matches(".ajoutIngredientCourse")) {
            const ingredient = evenement.target.getAttribute("data-ingredient");
            let courses = JSON.parse(localStorage.getItem("courses")) || [];

            if (courses.includes(ingredient)) {
                courses = courses.filter(i => i !== ingredient);
            } else {
                courses.push(ingredient);
            }

            localStorage.setItem("courses", JSON.stringify(courses));
            mettreAJourAffichageIngredients();
            afficherListeCourses();
        }
    });

    function afficherListeCourses() {
        const courses = JSON.parse(localStorage.getItem("courses")) || [];
        const elementListe = document.getElementById("listeCourses");
        elementListe.innerHTML = "";

        courses.forEach(ingredient => {
            const element = document.createElement("li");
            element.setAttribute("class", "text-liste-courses");
            element.textContent = ingredient;
            const boutonSupprimer = document.createElement("i");
            boutonSupprimer.setAttribute(
                "class",
                "delete-listeCourses material-icons"
            );
            boutonSupprimer.textContent = "delete_forever";
            boutonSupprimer.addEventListener("click", function () {
                const nouvellesCourses = courses.filter(i => i !== ingredient);
                localStorage.setItem(
                    "courses",
                    JSON.stringify(nouvellesCourses)
                );
                afficherListeCourses();
                mettreAJourAffichageIngredients();
            });
            element.appendChild(boutonSupprimer);
            elementListe.appendChild(element);
        });
    }

    document
        .getElementById("afficherListeCourse")
        .addEventListener("click", afficherListeCourses);

    mettreAJourAffichageIngredients();
});
