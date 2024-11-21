let currentPage =1;

const characterList = document.getElementById("character-list");
const prevPageButton = document.getElementById("prev-page");
const nextPageButton = document.getElementById("next-page");

function fetchCharacters(page) {
    fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
    .then((response) => {
        if (!response.ok) {
            throw new Error("Error al obtener la respuesta");
        }
        return response.json()
    })
    .then((data) => {
        displayCharacters(data.results)
    })
    .catch((error) => {
        characterList.innerHTML = "<p> Error: no se pudo obtener los datos </p>";
        console.error(error);
    })
}

function displayCharacters(characters) {
    characterList.innerHTML = "";
    characters.forEach(character => {
        const listItem = document.createElement("li");
        listItem.classList.add("character-item");

        const img = document.createElement("img");
        img.src = character.image;
        img.alt = character.name;
        img.classList.add("character-image");

        const name = document.createElement("h2");
        name.textContent = character.name;

        const species = document.createElement("p");
        species.textContent = character.species;

        listItem.appendChild(img);
        listItem.appendChild(name);
        listItem.appendChild(species);
        characterList.appendChild(listItem);
    })
}

prevPageButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        fetchCharacters(currentPage);
    };
})

nextPageButton.addEventListener("click", () => {
    currentPage++;
    fetchCharacters(currentPage);
});

document.addEventListener("DOMContentLoaded", () => {
    fetchCharacters(currentPage);
})














/* fetch(url, opcionales)
.then(response => {
    //respuesta del servidor
})
.catch(error => {
    //manejar errores
});
.finally(final => {
    //mensaje final
}) */
