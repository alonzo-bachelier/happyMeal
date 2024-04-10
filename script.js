
// Fonction: FETCH POUR RECUP JSON
function getData() {
    fetch('../../json/data.json')
    .then(res => res.json())
    .then(json => {
        jsonData = json; // Stockage des données dans la variable globale
        console.log(jsonData);
        saisieUtilisateurs()
        saisieUtilisateursIngredients()
       
    });
}
    
const champRecherche = document.getElementById ('chercheInput1');
function saisieUtilisateurs() {
    champRecherche.addEventListener('input', function(event) {
        const saisieUtilisateur = event.target.value;
        const suggestions = jsonData.recettes.filter
        (item => item.nom.toLowerCase().includes(saisieUtilisateur.toLowerCase()));

            afficherSuggestions(suggestions);
            });
}

function afficherSuggestions(suggestions) {
    // Sélection de l'élément où afficher les suggestions
    const autocompleteContainer = document.getElementById('autocompleteContainer1');
    autocompleteContainer.innerHTML = '';
 
    // creation liste UL
    const ul = document.createElement('ul');
    suggestions.forEach(suggestion => {
        // Création d'un élément de liste (li) pour chaque suggestion
        const li = document.createElement('li');
// Création d'un lien (a) pour chaque suggestion
const link = document.createElement('a');
link.href = "#"; 
link.textContent = suggestion.nom; 

// evénements pour le clic du lien
link.addEventListener('click', function(event) {
    event.preventDefault(); // Empêcher le comportement par défaut du lien
    champRecherche.value = suggestion.nom;
    autocompleteContainer.innerHTML = '';
 fetchRecetteParNom(suggestion.nom);
});

li.appendChild(link);
ul.appendChild(li);
});
autocompleteContainer.appendChild(ul);
}
//INGREDIENTS ------
    const champRechercheIngredients = document.getElementById('chercheInput2');

function saisieUtilisateursIngredients() {
    champRechercheIngredients.addEventListener('input', function(event) {
        const saisieUtilisateur = event.target.value;
        const suggestionsIngredients = [];
        jsonData.recettes.forEach(item => {
            item.ingredients.forEach(ingredient => {
                if (ingredient.nom && ingredient.nom.toLowerCase().includes(saisieUtilisateur.toLowerCase())) {
                    const ingredientExisteDeja = suggestionsIngredients.find(
                        suggestion => suggestion.nom === ingredient.nom
                    );
                    if (!ingredientExisteDeja) {
                        suggestionsIngredients.push(ingredient);
                    }
                }
            });
        });
        afficherSuggestionsIngredients(saisieUtilisateur, suggestionsIngredients);
    });
}

function afficherSuggestionsIngredients(saisieUtilisateur, suggestionsIngredients) {
    const autocompleteContainer = document.getElementById('autocompleteContainer2');
    autocompleteContainer.innerHTML = '';

    const ul = document.createElement('ul');
    suggestionsIngredients.forEach(suggestion => {
        const li = document.createElement('li');
        li.textContent = suggestion.nom;

        li.addEventListener('click', function() {
            champRechercheIngredients.value = suggestion;
            autocompleteContainer.innerHTML = '';
        });

        ul.appendChild(li);
    });

    autocompleteContainer.appendChild(ul);
}



// AFFICHER LA RECETTE EN CLIQUANT 
function afficherDetailsRecette(recette) {
    // Affichage des détails de la recette (par exemple, vous pouvez les afficher dans une modale)
    console.log("Nom de la recette:", recette.nom);
    console.log("Catégorie:", recette.categorie);
    console.log("Temps de préparation:", recette.temps_preparation);
    console.log("Ingrédients:");
    recette.ingredients.forEach(ingredient => {
        console.log("- " + ingredient.nom + ": " + ingredient.quantite);
    });
    console.log("Étapes:");
    recette.etapes.forEach((etape, index) => {
        console.log((index + 1) + ". " + etape);
    });
}
function fetchRecetteParNom(nomRecette) {
    fetch('../json/data.json')
    .then(res => res.json())
    .then(json => {
        // Recherche de la recette correspondante
        const recette = json.find(item => item.nom === nomRecette);
        // Affichage des détails de la recette
        if (recette) {
            afficherDetailsRecette(recette);
        } else {
            console.log("Aucune recette trouvée pour le nom:", nomRecette);
        }
    })
    .catch(error => console.error("Erreur lors du chargement des données:", error));
}

// Fonction pour gérer le clic sur un lien de suggestion
function handleClickSuggestion(event, nomRecette) {
    event.preventDefault(); // Empêcher le comportement par défaut du lien
    fetchRecetteParNom(nomRecette);
}









getData();
