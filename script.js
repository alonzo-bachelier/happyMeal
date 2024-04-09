
// Fonction: FETCH POUR RECUP JSON
function getData() {
    fetch('../json/data.json')
    .then(res => res.json())
    .then(json => {
        jsonData = json; // Stockage des données dans la variable globale
        console.log(jsonData);
        saisieUtilisateurs()
       
    });
}

function saisieUtilisateurs() {
    const champRecherche = document.getElementById ('chercheInput');
    
    champRecherche.addEventListener('input', function(event) {
        const saisieUtilisateur = event.target.value;

            const suggestions = jsonData.recettes.filter(item => item.nom.toLowerCase().includes(saisieUtilisateur.toLowerCase()));

            afficherSuggestions(suggestions);
            });
}

function afficherSuggestions(suggestions) {
    // Sélection de l'élément où afficher les suggestions
    const autocompleteContainer = document.getElementById('autocompleteContainer');
    // Vide le conteneur des suggestions précédentes
    autocompleteContainer.innerHTML = '';

    // Création d'une liste déroulante (ul) pour afficher les suggestions
    const ul = document.createElement('ul');
    suggestions.forEach(suggestion => {
        // Création d'un élément de liste (li) pour chaque suggestion
        const li = document.createElement('li');
        li.textContent = suggestion.nom; // Remplir l'élément de liste avec le nom de la suggestion
        // Ajout d'un écouteur d'événements pour gérer la sélection de la suggestion
        li.addEventListener('click', function() {
            // Remplir automatiquement la barre de recherche avec le texte de la suggestion sélectionnée
            champRecherche.value = suggestion.nom;
            // Effacer les suggestions une fois que l'utilisateur a sélectionné une suggestion
            autocompleteContainer.innerHTML = '';
        });
        // Ajout de l'élément de liste à la liste déroulante
        ul.appendChild(li);
    });
    // Ajout de la liste déroulante au conteneur des suggestions
    autocompleteContainer.appendChild(ul);
}


getData()
saisieUtilisateurs()