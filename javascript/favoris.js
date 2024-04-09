async function jsonDansLocalStorage() {
    try {
        const reponse = await fetch("../json/data.json");
        if (!reponse.ok) {
            throw new Error("Échec du chargement du JSON");
        }
        const json = await reponse.json();
        localStorage.setItem("maCleJson", JSON.stringify(json));
    } catch (erreur) {
        console.error(
            "Erreur lors du chargement ou de la sauvegarde du JSON :",
            erreur
        );
    }
}
jsonDansLocalStorage();

function favoris() {}
