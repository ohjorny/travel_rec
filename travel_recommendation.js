const searchBar = document.getElementById("searchBar");
const section = document.querySelectorAll("section");
const searchBtn = document.getElementById("search-btn");
const resetBtn = document.getElementById("reset-btn");
const searchInput = document.getElementById("search-input");

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
        const newMember = document.createElement("div");
        const newImg = document.createElement("img");
        const newName = document.createElement("h4");
        const newTitle = document.createElement("p");
        const newDescription = document.createElement("h4");

        newImg.src = mem.img || "./placeholder.png";
        newName.textContent = mem.name;
        newTitle.textContent = mem.title;
        newDescription.textContent = mem.description;

        newMember.appendChild(newImg);
        newMember.appendChild(newName);
        newMember.appendChild(newTitle);
        newMember.appendChild(newDescription);

        memberList.appendChild(newMember);
    }
}

function displayResults(results) {
    const resultsContainer = document.getElementById("results-container");
    resultsContainer.innerHTML = "";

    if (results.length === 0) {
        const noResultDiv = document.createElement("div");
        const noResultMsg = document.createElement("p");
        noResultMsg.textContent = "No results found. Please try a different search term.";
        noResultDiv.appendChild(noResultMsg);
        noResultDiv.classList.add("result-item");
        resultsContainer.appendChild(noResultDiv);
        return;
    }

    results.forEach(result => {
        const resultDiv = document.createElement("div");
        const resultImg = document.createElement("img");
        const resultName = document.createElement("h3");
        const resultDescription = document.createElement("p");

        resultImg.src = result.imageUrl || "./placeholder.png";
        resultName.textContent = result.name || "No name available";
        resultDescription.textContent = result.description || "No description available";

        resultDiv.appendChild(resultImg);
        resultDiv.appendChild(resultName);
        resultDiv.appendChild(resultDescription);
        resultDiv.classList.add("result-item");

        resultsContainer.appendChild(resultDiv);
    })
}

function searchData() {
    const query = document.querySelector(".nav-search").value.trim().toLowerCase();

    if (!query) {
        document.getElementById("results-container").innerHTML = "";
        return;
    }

    const data = fetch("travel_recommendation_api.json")
        .then(response => response.json())

    data.then(jsonData => {
        const results = [];
        for (const category in jsonData) {
            const items = jsonData[category];
            if (category === "countries") {
                items.forEach(item => {
                    if (item.name.toLowerCase().includes(query)) {
                        item.cities.forEach(city => results.push(city));
                    }
                    item.cities.forEach(city => {
                        if (city.name.toLowerCase().includes(query) ||
                            city.description.toLowerCase().includes(query)) {
                            results.push(city);
                        }
                    });
                });
            }
            else {
                items.forEach(item => {
                    if (item.name.toLowerCase().includes(query) ||
                        item.description.toLowerCase().includes(query)) {
                        results.push(item);
                    }
                });
            }
        }
        const container = document.getElementById("results-container");
        container.innerHTML = "";
        displayResults(results);
    }).catch(error => console.error("Error fetching data: ", error));
}

function clearResults() {
    const resultsContainer = document.getElementById("results-container");
    resultsContainer.innerHTML = "";
    queryInput.value = "";
    searchInput.value = "";
}

showMembers();
toggleSearchBar();
searchData();

window.addEventListener("hashchange", toggleSearchBar);
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    searchData();
});
resetBtn.addEventListener("click", clearResults);
