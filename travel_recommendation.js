const searchBar = document.getElementById("searchBar");
const section = document.querySelectorAll("section");

function toggleSearchBar() {
    const hash = window.location.hash || "#home";
    const target = hash.substring(1);
    searchBar.style.display = (target === "home" || hash === "") ? "flex" : "none";
    section.forEach((sec) => {
        if (sec.id === target) {
            sec.style.display = "flex";
        } else {
            sec.style.display = "none";
        }
    })
}

toggleSearchBar();

window.addEventListener("hashchange", toggleSearchBar);