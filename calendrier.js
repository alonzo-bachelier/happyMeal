// 1. Faire le merge avec Alonzo pour récupérer les favoris
// 2. Avec les favoris et sur ta page du calendrier, configurer fullCalendar pour afficher la modal lors du clique sur une date,
// et afficher la liste des favoris pour ajouter sur le calendrier. Il faut ensuite ajouter la date du calendrier + le nom de la
// recette pour garder les évcénements actifs. (C.F: Alexandre à réussi)

document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");

  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    initialDate: "2024-04-07",
    selectable: true,
    editable: true,
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
    events: [
      {
        title: "All Day Event",
        start: "2024-04-01",
      },
    ],
  });

  calendar.render();
  calendarEl.addEventListener("dateClick", function (info) {
    var modal = document.getElementById("exampleModal");
    modal.style.display = "block";
    // Ici, vous pouvez traiter la date cliquée et ajouter le nom de la recette au calendrier
    // Par exemple, vous pouvez utiliser info.dateStr pour obtenir la date cliquée au format "YYYY-MM-DD"
    // Et afficher la date dans la modal pour que l'utilisateur puisse la sélectionner
    console.log("Date cliquée : " + info.dateStr);
  });
});
