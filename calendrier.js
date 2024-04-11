document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");

  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    initialDate: "2024-04-07",
    selectable: true,
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
var calendar = new FullCalendar.Calendar(calendarEl, {
  // no plugin configuration required!
  editable: true,
});
