function getData() {
    fetch("../json/data.json")
        .then(res => res.json())
        .then(json => {
            jsonData = json;
            saisieUtilisateurs();
        })
        .catch(error => console.error("Error loading JSON:", error));
}

const champRecherche = document.getElementById("chercheInput1");

function saisieUtilisateurs() {
    champRecherche.addEventListener("input", function (event) {
        const saisieUtilisateur = event.target.value.trim().toLowerCase();
        console.log("User input:", saisieUtilisateur);

        const suggestions = jsonData.recettes.filter(item =>
            item.nom.toLowerCase().includes(saisieUtilisateur)
        );
        const suggestionsIngredients = [];

        jsonData.recettes.forEach(item => {
            item.ingredients.forEach(ingredient => {
                if (
                    ingredient.nom &&
                    ingredient.nom.toLowerCase().includes(saisieUtilisateur)
                ) {
                    const ingredientExisteDeja = suggestionsIngredients.find(
                        suggestion => suggestion.nom === item.nom
                    );
                    if (!ingredientExisteDeja) {
                        suggestionsIngredients.push(item);
                    }
                }
            });
        });

        afficherSuggestions(suggestions, suggestionsIngredients);
    });
}

function afficherSuggestions(suggestions, recettesParIngredient) {
    const autocompleteContainer = document.getElementById(
        "autocompleteContainer1"
    );
    autocompleteContainer.innerHTML = "";
    const ul = document.createElement("ul");

    suggestions.forEach(suggestion => {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.href = `resultat.html?search=${encodeURIComponent(
            suggestion.nom
        )}`;
        link.textContent = suggestion.nom;
        li.appendChild(link);
        ul.appendChild(li);
    });

    recettesParIngredient.forEach(recette => {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.href = `resultat.html?search=${encodeURIComponent(recette.nom)}`;
        link.textContent = recette.nom;
        li.appendChild(link);
        ul.appendChild(li);
    });

    autocompleteContainer.appendChild(ul);
    saisieUtilisateurs();
}

getData();
