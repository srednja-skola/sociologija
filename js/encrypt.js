// encrypt
var pokrivac = document.querySelector(".pokrivac");

function sifra() {
    var unos = prompt("Upiši šifru kako bi vidio sadržaj");
    if (unos === null || unos === undefined || unos === "") {
       pokrivac.classList = "pokrivac";
    } else if (unos === "alfa") {
        pokrivac.classList = "";
    } else {
        pokrivac.classList = "pokrivac";
    }
}
sifra();
