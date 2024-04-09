
// Fonction: FETCH POUR RECUP JSON
function getData() {
    fetch('../json/data.json')
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
    // Ici, vous pouvez afficher la recette correspondante en fonction de suggestion.nom
    // Vous pouvez soit afficher la recette directement dans cette fonction,
    // soit rediriger l'utilisateur vers une page dédiée à la recette en utilisant l'URL correcte dans link.href
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

getData();
