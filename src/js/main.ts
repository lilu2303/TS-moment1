// Hämtar element utifrån id som näms i html koden
const courseList: HTMLElement | null = document.getElementById('courseList') as HTMLUListElement;
const courseForm: HTMLFormElement | null = document.getElementById('courseForm') as HTMLFormElement;
const resetBtn: HTMLButtonElement | null = document.getElementById('reset') as HTMLButtonElement | null;

//Interface som definierar strukturen för ett nytt kursobjekt
interface courseInfo {
    code: string;
    name: string;
    progression: string;
    url: string;
}

//Sparar kurser till localstorage 
function saveCourses(courses: courseInfo[]): void {
    localStorage.setItem("courses", JSON.stringify(courses));
}

//Hämtar kurser från local storage i funktionen nedan
function getCourses(): courseInfo[] {
    const courseJSON: string | null = localStorage.getItem("courses");
    return courseJSON ? JSON.parse(courseJSON) : [];
}

//när sidan laddas skrivs sparade kurser ut
window.addEventListener("load", () => {
    const courses: courseInfo[] = getCourses();
    courses.forEach(course => {
        displayCourse(course);
    });
});

//funktion som skriver ut kurserna till webbsidan
function displayCourse(course: courseInfo): void {

    if (courseList) {

        // Skapa ett nytt <li> element
        const listItem: HTMLLIElement = document.createElement('li');

        // Vad som ska skrivas ut i det nya <li> elementet
        listItem.id = `course-${course.code}`;
        listItem.innerHTML += `
        <strong>${course.code}</strong> - <strong >${course.name}</strong> <br>
        Progression:${course.progression} <br>
         <a href="${course.url}">${course.url}</a>
         <button class="edit">Redigera</button>
        `;

        // Lägger till det nya <li> elementet till <ul> listan
        courseList.appendChild(listItem);

        // Eventlyssnare för klick på redigeringsknappen
        const editBtn: HTMLButtonElement | null = listItem.querySelector('.edit');
        if (editBtn) {
            editBtn.addEventListener('click', () => {
                editCourse(course);
            });
        }
    }
}
