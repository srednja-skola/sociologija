// footer copyleft (nova godina se mjenja automatski)
var copyleft = document.querySelector(".copyleft"),
  izbornik = document.querySelector(".navbar");
// copyleft.innerHTML = "Copyleft <span class='cl'>&copy;</span> " + new Date().getFullYear() + ". - Danijel Gavranović, prof.";

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


// rute za pojedinu stranicu

var route = {
  _routes: {}, // The routes will be stored here
  add: function(url, action) {
    this._routes[url] = action;
  },
  run: function() {
    jQuery.each(this._routes, function(pattern) {
      if (location.href.match(pattern)) {
        // "this" points to the function to be executed
        this();
      }
    });
  }
}

route.add("", function() {
  // footer
  copyleft.innerHTML = "Copyleft <span class='cl'>&copy;</span> " + new Date().getFullYear() + ". - Danijel Gavranović, prof.";
  // izbornik
  izbornik.innerHTML = "<div class='container'><div class='navbar-header'><button type='button' class='navbar-toggle' data-toggle='collapse' data-target='#bs-example-navbar-collapse-1'><span class='sr-only'>Pokaži izbornik</span><span class='icon-bar'></span><span class='icon-bar'></span><span class='icon-bar'></span></button><a class='navbar-brand' href='index.html'><i class='fa fa-home ikonica'></i> Sociologija - šk.god. 2017./18.</a></div> <div class='collapse navbar-collapse' id='bs-example-navbar-collapse-1'><ul class='nav navbar-nav desno'><li><a href='ispitivanje.html'><i class='fa fa-exclamation-circle ikonica'></i> <span class='tekst-izbornik'>Ispitivanje</span></a></li><li><a href='istrazivanje.html'><i class='fa fa-bar-chart-o ikonica'></i> <span class='tekst-izbornik'>Istraživanje</span></a></li><li><a href='prezentacije.html'><i class='fa fa-image ikonica'></i> <span class='tekst-izbornik'>Prezentacije</span></a></li><li><a href='dodatni-materijal.html' title='Dodatni materijali'><i class='fa fa-hand-spock-o ikonica'></i> <span class='tekst-izbornik'>Dodatni materijal</span></a></li><li><a href='stare-zadace.html' title='Stare zadaće'><i class='fa fa-file-word-o ikonica'></i> <span class='tekst-izbornik'>Stare zadaće</span></a> </li><li><a href='pitaj-profesora.html' title='Pitaj profesora'><i class='fa fa-question-circle ikonica' ></i> <span class='tekst-izbornik'>Pitaj profesora</span></a></li></ul></div></div>";
// aktivni link na izborniku
  if (window.location.href.indexOf("ispitivanje.html") > -1) {
    $(".nav > li:nth-child(1) > a:nth-child(1)").addClass("active");
  } else if (window.location.href.indexOf("istrazivanje.html") > -1) {
    $(".nav > li:nth-child(2) > a:nth-child(1)").addClass("active");
  } else if (window.location.href.indexOf("prezentacije.html") > -1) {
    $(".nav > li:nth-child(3) > a:nth-child(1)").addClass("active");
  } else if (window.location.href.indexOf("dodatni-materijal.html") > -1) {
    $(".nav > li:nth-child(4) > a:nth-child(1)").addClass("active");
  } else if (window.location.href.indexOf("stare-zadace.html") > -1) {
    $(".nav > li:nth-child(5) > a:nth-child(1)").addClass("active");
  } else if (window.location.href.indexOf("pitaj-profesora.html") > -1) {
    $(".nav > li:nth-child(6) > a:nth-child(1)").addClass("active");
  } else {
    console.log("nema aktivnog linka");
}
});

// pozivanje route funkcije
route.run();
