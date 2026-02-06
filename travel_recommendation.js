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

const members = [
    {
        img: "",
        name: "John Doe",
        description: "John is a fantastic CEO",
        title: "CEO"
    },
    {
        img: "./ronald.jpg",
        name: "Ronald McDonald",
        description: "Ronald puts a smile on everyone's face!",
        title: "Mascot"
    },
    {
        img: "./jake.jpg",
        name: "Jake Gyllenhaal",
        description: "Responsible for spreading our image and product throughout the world, Mr. Gyllenhaal does a fantastic job of promoting Traveloria!",
        title: "Ambassador"
    }
]

const memberList = document.getElementById("member-list");

function showMembers() {

    for (const mem of members) {
        const newImg = document.createElement("img");
        const newMember = document.createElement("div");
    }
}

toggleSearchBar();

window.addEventListener("hashchange", toggleSearchBar);