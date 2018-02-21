// footer copyleft (nova godina se mjenja automatski)
var copyleft = document.querySelector(".copyleft");
copyleft.innerHTML = "Copyleft <span class='cl'>&copy;</span> " + new Date().getFullYear() + ". - Danijel Gavranović, prof.";

// ------- Propeller Ripple Effect component js function ------- //
$(document).ready(function() {

    $(".ripple-effect").on('mousedown touchstart', function(e) {
        var rippler = $(this);
        $('.ink').remove();
        // create .ink element if it doesn't exist
        if (rippler.find(".ink").length == 0) {
            rippler.append("<span class='ink'></span>");
        }
        var ink = rippler.find(".ink");
        // prevent quick double clicks
        ink.removeClass("animate");
        // set .ink diametr
        if (!ink.height() && !ink.width()) {
            var d = Math.max(rippler.outerWidth(), rippler.outerHeight());
            ink.css({
                height: d,
                width: d
            });
        }
        // get click coordinates
        var x = e.pageX - rippler.offset().left - ink.width() / 2;
        var y = e.pageY - rippler.offset().top - ink.height() / 2;
        // set .ink position and add class .animate
        ink.css({
            top: y + 'px',
            left: x + 'px'
        }).addClass("animate");

        setTimeout(function() {
            ink.remove();
        }, 1500);
    });
});



// dodaje na sve .btn class ripple-effect
function rippleEffect() {
    let ripple = document.querySelectorAll(".portfolio-item"),
        linkovi = document.querySelectorAll("a");

    for (let i = 0; i < ripple.length; i++) {
        ripple[i].classList += " ripple-effect";
    }
    for (let i = 0; i < linkovi.length; i++) {
        linkovi[i].classList += " ripple-effect";
    }
}
rippleEffect();

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
