import { Course } from './course.js';
import { Student } from './student.js'
import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
let infoStudentTBody: HTMLElement = document.getElementById('infoStudent')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement>document.getElementById("search-box")!;
const inputLimInf: HTMLInputElement = <HTMLInputElement>document.getElementById('limInf');
const inputLimSup: HTMLInputElement = <HTMLInputElement>document.getElementById('limSup');
const btnfilterByCreditos: HTMLElement = document.getElementById("button-filterByCreditos")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;


btnfilterByName.onclick = () => applyFilterByName();

btnfilterByCreditos.onclick = () => applyFilterByCreditos();

renderCoursesInTable(dataCourses);

renderStudentInTable(dataStudent);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`;


function renderCoursesInTable(courses: Course[]): void {
    console.log('Desplegando cursos');
    courses.forEach((course) => {
        let trElement = document.createElement("tr");
        trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
        coursesTbody.appendChild(trElement);
    });
}

function renderStudentInTable(infoStudent: Student[]): void {
    console.log('Desplegando la información del estudiante');
    infoStudent.forEach((infoStudent) => {
        let trElement = document.createElement("tr");
        trElement.innerHTML = `<td>${infoStudent.key}</td>
                                <td>${infoStudent.value}</td>`;
        infoStudentTBody.appendChild(trElement);
    });
}

function applyFilterByName() {
    let text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}

function applyFilterByCreditos() {
    let limInf = inputLimInf.value;
    let limSup = inputLimSup.value;
    if (limInf == null || limInf == undefined || limInf =='') { limInf = '0'; }
    if (limSup == null || limSup == undefined || limSup =='') { limSup = '20'; }
    let limInfNumber = parseInt(limInf);
    let limSupNumber = parseInt(limSup);
    clearCoursesInTable();
    let coursesFiltered: Course[] = searchCourseByCredits(limInfNumber, limSupNumber, dataCourses);
    renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
    return nameKey === '' ? dataCourses : courses.filter(c =>
        c.name.match(nameKey));
}

function searchCourseByCredits(limInf: number, limSup: number, courses: Course[]): Course[] {
    let cursosNuevo: Course[] = [];
    for (let i = 0; i < courses.length; i++) {
        if (courses[i].credits >= limInf && courses[i].credits <= limSup) {
            cursosNuevo.push(courses[i]);
        }
    }
    return cursosNuevo;
}

function getTotalCredits(courses: Course[]): number {
    let totalCredits: number = 0;
    courses.forEach((course) => totalCredits = totalCredits + course.credits);
    return totalCredits;
}

function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);

        }
    }
}