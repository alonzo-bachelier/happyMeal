/**
 * 1. Afficher en console un seul ingrédient propre à son bouton, ça marche ? Ajout de cet ingrédient en LocalStorage
 * 2. Faire en sorte d'avoir un LocalStorage de liste de courses avec tous les ingrédients ajoutés
 * 3. Dans la modal de liste de courses, afficher (avec getItem()) tous les ingrédients du localStorage `ListeCourses`
 * 4. Dans la génération de tous les ingrédients dans la modal, créer un petit bouton permettant de supprimer un ingrédient,
 * comme pour les favoris :)
 */
document.addEventListener("DOMContentLoaded", function () {
    // Initialise la liste de courses dans le localStorage s'il n'existe pas
    if (!localStorage.getItem("courses")) {
        localStorage.setItem("courses", JSON.stringify([]));
    }

    // Mise à jour de l'affichage des ingrédients basé sur le localStorage
    function updateIngredientDisplay() {
        const courses = JSON.parse(localStorage.getItem("courses")) || [];
        document.querySelectorAll("[data-ingredient]").forEach(button => {
            const ingredient = button.getAttribute("data-ingredient");
            button.textContent = courses.includes(ingredient)
                ? "remove"
                : "add";
        });
    }

    // Gère l'ajout ou la suppression d'ingrédients dans le localStorage
    document.body.addEventListener("click", function (event) {
        if (event.target.matches(".ajoutIngredientCourse")) {
            const ingredient = event.target.getAttribute("data-ingredient");
            let courses = JSON.parse(localStorage.getItem("courses")) || [];

            if (courses.includes(ingredient)) {
                courses = courses.filter(i => i !== ingredient); // Supprime l'ingrédient
            } else {
                courses.push(ingredient); // Ajoute l'ingrédient
            }

            localStorage.setItem("courses", JSON.stringify(courses)); // Met à jour le localStorage
            updateIngredientDisplay(); // Met à jour l'affichage des boutons
            displayCoursesList(); // Met à jour la liste des courses dans la modal
        }
    });

    // Affiche la liste des courses dans la modal
    function displayCoursesList() {
        const courses = JSON.parse(localStorage.getItem("courses")) || [];
        const listElement = document.getElementById("listeCourses");
        listElement.innerHTML = ""; // Efface les entrées existantes

        courses.forEach(ingredient => {
            const item = document.createElement("li");
            item.textContent = ingredient;
            const removeButton = document.createElement("i");
            removeButton.setAttribute("class", "material-icons");
            removeButton.textContent = "delete_forever";
            removeButton.addEventListener("click", function () {
                const newCourses = courses.filter(i => i !== ingredient);
                localStorage.setItem("courses", JSON.stringify(newCourses));
                displayCoursesList(); // Met à jour la liste
                updateIngredientDisplay(); // Met à jour les boutons
            });
            item.appendChild(removeButton);
            listElement.appendChild(item);
        });
    }

    // Ajoute l'évènement pour ouvrir la modal et afficher la liste à jour
    document
        .getElementById("afficherListeCourse")
        .addEventListener("click", displayCoursesList);

    // Appel initial pour configurer l'affichage correct des boutons.
    updateIngredientDisplay();
});
