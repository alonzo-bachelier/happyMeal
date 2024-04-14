// 2. Avec les favoris et sur ta page du calendrier, configurer fullCalendar pour afficher la modal lors du clique sur une date,
// et afficher la liste des favoris pour ajouter sur le calendrier. Il faut ensuite ajouter la date du calendrier + le nom de la
// recette pour garder les évcénements actifs.

document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");

  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    selectable: true,
    editable: true,
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
  });

  calendar.render();
  calendarEl.addEventListener("dateClick", function () {
    var modal = document.getElementById("exampleModal");
    modal.style.display = "block";
  });
});
