/**
 * Ce qu'il reste à faire :
 * 
 * 2. Faire en sorte que lors de la recherche, soit cela redirige sur recettes.html
 * et affiche les recettes recherchées, soit les affiches directement (si tu es déjà sur
 * recettes.html).
*/


// Fonction: FETCH POUR RECUP JSON
function getData() {
    fetch('../../json/data.json')
    .then(res => res.json())
    .then(json => {
        jsonData = json; // Stockage des données dans la variable globale
        console.log(jsonData);
        saisieUtilisateurs()
        recettes = jsonData.recettes;
       
    });
}
    
const champRecherche = document.getElementById ('chercheInput1');

function saisieUtilisateurs() {
    champRecherche.addEventListener('input', function(event) {
        const saisieUtilisateur = event.target.value.trim().toLowerCase();

        // Suggestions de recettes par nom
        const suggestions = jsonData.recettes.filter(item => item.nom.toLowerCase().includes(saisieUtilisateur));

        // Suggestions d'ingrédients
        const suggestionsIngredients = [];
        jsonData.recettes.forEach(item => {
            item.ingredients.forEach(ingredient => {
                if (ingredient.nom && ingredient.nom.toLowerCase().includes(saisieUtilisateur)) {
                    const ingredientExisteDeja = suggestionsIngredients.find(
                        suggestion => suggestion.nom === ingredient.nom
                    );
                    if (!ingredientExisteDeja) {
                        suggestionsIngredients.push(ingredient);
                    }
                }
            });
        });

        // Recettes trouvées par ingrédient
        let trouverParIngredient = [];
        jsonData.recettes.forEach(recette => {
            recette.ingredients.forEach(ingredient => {
                if (ingredient.nom && ingredient.nom.toLowerCase().includes(saisieUtilisateur)) {
                    if (!trouverParIngredient.includes(recette) && !suggestions.includes(recette)) {
                        trouverParIngredient.push(recette);
                    }
                }
            });
        });
        

        // Afficher les suggestions
        afficherSuggestions(suggestions, trouverParIngredient);
        afficherRecettesIngredientsPopup(suggestions, trouverParIngredient);


   // Gestion du clic sur les suggestions
   const autocompleteContainer = document.getElementById('autocompleteContainer1');
   autocompleteContainer.querySelectorAll('li a').forEach(link => {
       link.addEventListener('click', function(event) {
           event.preventDefault(); 
           const suggestionNom = this.textContent;
           champRecherche.value = suggestionNom;
           autocompleteContainer.innerHTML = '';
       
           // Vérifie si vous êtes déjà sur recettes.html
           if(window.location.pathname.includes("recettes.html")) {
               // Si oui, utilisez une fonction pour afficher directement les recettes
               afficherRecettes(suggestionNom); // Remplacez suggestionNom par le nom de la recette sélectionnée
           } else {
               // Sinon, redirigez l'utilisateur vers recettes.html avec les paramètres de recherche
               window.location.href = "recettes.html?search=" + encodeURIComponent(suggestionNom);
           }
       });
   });
});
}

function afficherSuggestions(suggestions, recettesParIngredient) {
    const autocompleteContainer = document.getElementById('autocompleteContainer1');
    autocompleteContainer.innerHTML = '';

    // Création d'une liste pour afficher les résultats
    const ul = document.createElement('ul');

    // Ajout des suggestions de recettes
    suggestions.forEach(suggestion => {
        const li = document.createElement('li');
        const link = document.createElement('a');

        const recettePage = trouverPageRecette(suggestion.nom); // Définir recettePage avant de l'utiliser
        const recetteIndex = recettes.indexOf(suggestion); // Obtenir l'index de la recette dans le tableau recettes
        link.href = recettePage + '#recette-' + recetteIndex;
        link.textContent = suggestion.nom; 

        // Événement clic sur le lien : remplir le champ avec le nom de la suggestion et vider la liste
        link.addEventListener('click', function(event) {
            event.preventDefault(); 
            champRecherche.value = suggestion.nom;
            autocompleteContainer.innerHTML = '';
        });

        li.appendChild(link);
        ul.appendChild(li);
        autocompleteContainer.appendChild(ul)
    });

    // Vérifie si recettesParIngredient est défini avant d'ajouter les recettes trouvées par ingrédient
    if (recettesParIngredient) {
        recettesParIngredient.forEach(recette => {
            const li = document.createElement('li');
            const link = document.createElement('a');
    // Ajoutez l'attribut href avec l'URL de la page de la recette et l'ID
            const recettePage = trouverPageRecette(recette.nom); 
            const recetteIndex = recettes.indexOf(recette); // Obtenir l'index de la recette dans le tableau recettes
            link.href = recettePage + '#recette-' + recetteIndex;
            link.textContent = recette.nom; 

            // Événement clic sur lien : remplir le champ avec le nom de la recette et vider la liste
            link.addEventListener('click', function(event) {
                event.preventDefault(); 
                champRecherche.value = recette.nom;
                autocompleteContainer.innerHTML = '';
            });

            li.appendChild(link);
            ul.appendChild(li);
        });
    }

    autocompleteContainer.appendChild(ul);
}

function afficherRecettesIngredientsPopup(suggestions, trouverParIngredient) {
    const popupContainer = document.getElementById('recettesContainer');
    popupContainer.innerHTML = '';
    // Mélanger suggestions recettes + recettes par ingrédient
    const toutesLesRecettes = [...suggestions, ...trouverParIngredient];
    // chaque recette ; création card dans une div
    toutesLesRecettes.forEach(recette => { 
        
        const card = document.createElement('div');
        card.classList.add('card');
        card.style.width = '18rem';

        // Création de l'image de la recette avec la classe "card-img-top" de Bootstrap
        const img = document.createElement('img');
        img.classList.add('card-img-top');
        img.src = recette.images; // Utilisation de recette au lieu de suggestion
        img.alt = 'Image de la recette';
        card.appendChild(img);

        // Création d'une div avec la classe "card-body" de Bootstrap
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        // Ajout du titre de la recette à la carte avec la classe "card-title" de Bootstrap
        const title = document.createElement('h5');
        title.classList.add('card-title');
        title.textContent = recette.nom; // Utilisation de recette au lieu de suggestion
        cardBody.appendChild(title);

        // Création de la liste des ingrédients pour la recette
        const ingredientsList = document.createElement('ul');
        recette.ingredients.forEach(ingredient => {
            const ingredientItem = document.createElement('li');
            ingredientItem.textContent = `${ingredient.nom} : ${ingredient.quantite}`;
            ingredientsList.appendChild(ingredientItem);
        });
        cardBody.appendChild(ingredientsList);

        // Création d'un bouton "Voir la recette" avec la classe "btn btn-primary" de Bootstrap
        const button = document.createElement('a');
        button.classList.add('btn', 'btn-primary');
        button.href = '#';
        button.textContent = 'Voir la recette';
        cardBody.appendChild(button);

        // Ajout de la div "card-body" à la div "card"
        card.appendChild(cardBody);

        // Ajout de la carte au conteneur pour les recettes
        popupContainer.appendChild(card);
    });
}

function trouverPageRecette(nomRecette) {
    let recette = recettes.find(recetteItem => recetteItem.nom === nomRecette); // Utiliser un autre nom de variable pour l'élément actuel du tableau
    let recetteIndex = recettes.indexOf(recette);

    if (recetteIndex >= 0 && recetteIndex < 5) {
        return "affiche.html";
      } else if (recetteIndex >= 5 && recetteIndex < 10) {
        return "affiche2.html";
      } else if (recetteIndex >= 10 && recetteIndex < 15) {
        return "affiche3.html";
      } else {
        return "";
      }
}


getData();
