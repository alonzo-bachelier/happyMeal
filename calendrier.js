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
});

const listefav = document.getElementById("listefav");
const listeFavoris = localStorage.getItem("favoris");
JSON.parse(listeFavoris).forEach((fav) => {
  console.log(fav);
  const p = document.createElement("p");
  p.innerHTML = `${fav} <button id="supprFav">x</button> `;

  listefav.append(p);
});

console.log(listeFavoris);
