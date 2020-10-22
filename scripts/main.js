import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
var coursesTbody = document.getElementById('courses');
var infoStudentTBody = document.getElementById('infoStudent');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var inputLimInf = document.getElementById('limInf');
var inputLimSup = document.getElementById('limSup');
var btnfilterByCreditos = document.getElementById("button-filterByCreditos");
var totalCreditElm = document.getElementById("total-credits");
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCreditos.onclick = function () { return applyFilterByCreditos(); };
renderCoursesInTable(dataCourses);
renderStudentInTable(dataStudent);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderStudentInTable(infoStudent) {
    console.log('Desplegando la información del estudiante');
    infoStudent.forEach(function (infoStudent) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + infoStudent.key + "</td>\n                                <td>" + infoStudent.value + "</td>";
        infoStudentTBody.appendChild(trElement);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function applyFilterByCreditos() {
    var limInf = inputLimInf.value;
    var limSup = inputLimSup.value;
    if (limInf == null || limInf == undefined) {
        limInf = '0';
    }
    if (limSup == null || limSup == undefined) {
        limSup = '20';
    }
    var limInfNumber = parseInt(limInf);
    var limSupNumber = parseInt(limSup);
    clearCoursesInTable();
    var coursesFiltered = searchCourseByCredits(limInfNumber, limSupNumber, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function searchCourseByCredits(limInf, limSup, courses) {
    var cursosNuevo = [];
    for (var i = 0; i < courses.length; i++) {
        if (courses[i].credits >= limInf && courses[i].credits <= limSup) {
            cursosNuevo.push(courses[i]);
        }
    }
    return cursosNuevo;
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
