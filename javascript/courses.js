/**
 * 1. Afficher en console un seul ingrédient propre à son bouton, ça marche ? Ajout de cet ingrédient en LocalStorage
 * 2. Faire en sorte d'avoir un LocalStorage de liste de courses avec tous les ingrédients ajoutés
 * 3. Dans la modal de liste de courses, afficher (avec getItem()) tous les ingrédients du localStorage `ListeCourses`
 * 4. Dans la génération de tous les ingrédients dans la modal, créer un petit bouton permettant de supprimer un ingrédient,
 * comme pour les favoris :)
*/

document.addEventListener("DOMContentLoaded", function () {
    // Fonction pour mettre à jour l'affichage des ingrédients en fonction de leur présence dans la liste de courses
    function siIngredientAjoute() {
        // Récupérer la liste des ingrédients de la liste de courses depuis le localStorage
        const listeCourses = JSON.parse(localStorage.getItem("listeCourses")) || [];
        
        // Parcourir les boutons d'ajout aux courses
        document.querySelectorAll(".ajoutIngredientCourse").forEach(function (bouton, index) {
            // Récupérer les ingrédients de la recette associée au bouton
            const ingredientsRecette = Array.from(document.querySelectorAll(`.liste-ingredients-${index + 1} li`)).map(li => li.textContent.trim());

            // Vérifier pour chaque ingrédient s'il est dans la liste de courses
            ingredientsRecette.forEach((ingredient, i) => {
                const logoFav = document.getElementById(`logo-fav${index + 1}-${i + 1}`);
                if (ingredient && listeCourses.includes(ingredient)) {
                    // Si l'ingrédient est dans la liste de courses, changer l'icône du bouton pour indiquer qu'il est déjà dans la liste
                    logoFav.textContent = "delete_forever";
                } else {
                    // Sinon, afficher l'icône normale du bouton
                    logoFav.textContent = "favorite_border";
                }
            });
        });
    }

    // Ajouter un écouteur d'événement pour chaque bouton d'ajout aux courses
    document.querySelectorAll(".ajoutIngredientCourse").forEach(function (bouton, index) {
        bouton.addEventListener("click", function () {
            // Récupérer les ingrédients de la recette associée au bouton
            const ingredientsRecette = Array.from(document.querySelectorAll(`.liste-ingredients-${index + 1} li`)).map(li => li.textContent.trim());

            // Récupérer la liste des courses depuis le localStorage
            let listeCourses = JSON.parse(localStorage.getItem("listeCourses")) || [];

            // Vérifier pour chaque ingrédient s'il est dans la liste de courses
            ingredientsRecette.forEach(ingredient => {
                const index = listeCourses.indexOf(ingredient);
                if (index !== -1) {
                    // Si l'ingrédient est déjà dans la liste de courses, le retirer
                    listeCourses.splice(index, 1);
                } else {
                    // Sinon, l'ajouter à la liste de courses
                    listeCourses.push(ingredient);
                }
            });

            // Mettre à jour la liste de courses dans le localStorage
            localStorage.setItem("listeCourses", JSON.stringify(listeCourses));

            // Mettre à jour l'affichage des icônes des boutons en fonction de la liste de courses mise à jour
            siIngredientAjoute();
        });
    });

    siIngredientAjoute();
});
