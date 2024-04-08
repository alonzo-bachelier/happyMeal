fetch('../json/data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        return response.json();
    })
    .then(data => {

        console.log('Données récupérées :', data);

        if (data && data.length > 0) {
          
            const recettes = data.map(recette => recette.nom);
            autocomplete(document.getElementById("chercheInput"), recettes);
        } else {
            console.error('Les données récupérées sont vides ou non valides');
        }
    })
    .catch(error => console.error('Erreur lors du chargement des données :', error));

function autocomplete(input, arr) {

    function updateSuggestions(filteredRecettes) {
        autocompleteContainer.innerHTML = '';

        // Afficher nouvelles suggestions
        filteredRecettes.forEach(recette => {
            const suggestion = document.createElement('div');
            suggestion.textContent = recette;
            suggestion.classList.add('suggestion');

            // Lorsque l'utilisateur clique sur une suggestion
            suggestion.addEventListener('click', () => {
                input.value = recette;
                autocompleteContainer.innerHTML = '';
            });

            autocompleteContainer.appendChild(suggestion);
        });
    }

    // Conteneur pour les suggestions
    const autocompleteContainer = document.getElementById('autocompleteContainer');

    // Écoute les événements de saisie dans le champ de recherche
    input.addEventListener('input', () => {
        const userInput = input.value.toLowerCase();
        const filteredRecettes = arr.filter(recette => recette.toLowerCase().startsWith(userInput));
        updateSuggestions(filteredRecettes);
    });
}