const e = document.getElementById("courseList")
  , t = document.getElementById("courseForm");
function o() {
    let e = localStorage.getItem("courses");
    return e ? JSON.parse(e) : []
}
function n(e) {
    localStorage.setItem("courses", JSON.stringify(e))
}
function d(t) {
    if (e) {
        let r = document.createElement("li");
        r.id = `course-${t.code}`,
        r.innerHTML += `
        <strong>${t.code}</strong> - <strong >${t.name}</strong> <br>
        Progression:${t.progression} <br>
         <a href="${t.url}">${t.url}</a>
         <button class="edit">Redigera</button>
        `,
        e.appendChild(r);
        let l = r.querySelector(".edit");
        l && l.addEventListener("click", () => {
            !function(t) {
                let r = document.getElementById(`editCourseForm-${t.code}`);
                r && r.remove();
                let l = document.createElement("form");
                l.id = `editCourseForm-${t.code}`,
                l.setAttribute("data-course-code", t.code),
                l.innerHTML = `
        <input type="text" id="editCourseCode" class="editinput" placeholder="Kurskod" value="${t.code}">
        <input type="text" id="editCourseName" class="editinput" placeholder="Kursnamn" value="${t.name}">
        <input type="url" id="editUrl" class="editinput" placeholder="URL" value="${t.url}">
        <select id="editProg" class="editinput">
            <option value="A" ${"A" === t.progression ? "selected" : ""}>A</option>
            <option value="B" ${"B" === t.progression ? "selected" : ""}>B</option>
            <option value="C" ${"C" === t.progression ? "selected" : ""}>C</option>
        </select>
        <button type="submit" id="updateBtn">Uppdatera</button>
    `;
                let i = document.getElementById(`course-${t.code}`);
                i && (i.appendChild(l),
                l.addEventListener("submit", r => {
                    var i;
                    r.preventDefault();
                    let c = {
                        code: document.getElementById("editCourseCode").value,
                        name: document.getElementById("editCourseName").value,
                        url: document.getElementById("editUrl").value,
                        progression: document.getElementById("editProg").value
                    }
                      , s = o();
                    if (!u(c.code, s.filter(e => e.code !== t.code))) {
                        alert("Kurskoden måste vara unik");
                        return
                    }
                    n(s = s.map(e => e.code === t.code ? c : e)),
                    n(i = s),
                    e && (e.innerHTML = "",
                    i.forEach(e => {
                        d(e)
                    }
                    )),
                    l.remove()
                }
                ))
            }(t)
        }
        )
    }
}
document.getElementById("reset"),
window.addEventListener("load", () => {
    o().forEach(e => {
        d(e)
    }
    )
}
);
const r = document.getElementById("clear");
function u(e, t) {
    return !t.some(t => t.code === e)
}
r && r.addEventListener("click", () => {
    e && (e.innerHTML = ""),
    n([])
}
),
t.addEventListener("submit", function(e) {
    e.preventDefault();
    let r = document.getElementById("courseName").value
      , l = document.getElementById("courseCode").value
      , i = document.getElementById("url").value
      , c = {
        code: l,
        name: r,
        progression: document.getElementById("prog").value,
        url: i
    }
      , s = o();
    if (!u(c.code, s)) {
        alert("Kurskoden måste vara unik");
        return
    }
    d(c),
    function(e) {
        let t = o();
        t.push(e),
        n(t)
    }(c),
    t.reset()
});
//# sourceMappingURL=index.js.map
