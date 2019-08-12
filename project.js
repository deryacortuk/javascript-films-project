const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");



eventListeners();

function eventListeners() {

    form.addEventListener("submit", addFilm);
    document.addEventListener("DOMContentLoaded", function() {
        let films = Storage.getFilmFromStorage();
        UI.loadAllFilms(films);

    });
    cardBody.addEventListener("click", deleteFilm);
    clear.addEventListener("click", clearAllFilms);
}

function addFilm(e) {
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if (title === "" || director === "" || url === "") {
        UI.displayMessages("required", "danger");
    } else {
        const newFilm = new Film(title, director, url);
        UI.addFilmToUI(newFilm);
        Storage.addFilmToStorage(newFilm); //storage adds film

        UI.displayMessages("added", "success")
    }
    UI.clearInputs(titleElement, urlElement, directorElement);



    e.preventDefault();
}

function deleteFilm(e) {
    if (e.target.id === "delete-film") {
        UI.deleteFilmUI(e.target);
        Storage.deleteFilmStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        UI.displayMessages("film was cleaned.", "success");
    }
}

function clearAllFilms() {
    if (confirm("really?")) {
        UI.clearAllFilmsUI();
        Storage.clearAllFilmsStorage();
    }

}