document.addEventListener("DOMContentLoaded", function () {
    function ListeDeCourseEnPDF() {
        if (!localStorage.getItem("courses")) {
            localStorage.setItem("courses", JSON.stringify([]));
        }
        const courses = JSON.parse(localStorage.getItem("courses")) || [];
        let listCourseText = "";
        courses.forEach(ingredient => {
            listCourseText += ingredient + "\n";
        });

        const listeCoursePDF = new window.jspdf.jsPDF();
        listeCoursePDF.text(listCourseText, 10, 10);
        listeCoursePDF.save("listeDeCourse.pdf");
    }

    const afficherListeCourse = document.getElementById("sauvegarderCourses");
    if (afficherListeCourse) {
        afficherListeCourse.addEventListener("click", ListeDeCourseEnPDF);
    }
});
