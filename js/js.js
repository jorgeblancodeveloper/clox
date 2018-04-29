var asaltos = 4;
var tiempo_asaltos = 3;
var tiempo_descanso = 1;
var preaviso = 0;
var seconds = 60;
var crono;
var theme = 0;
var texto_asaltos = "Asaltos: ";
var texto_tiempo_asaltos = "Tiempo asalto: ";
var texto_tiempo_descanso = "Tiempo descanso: ";
var texto_preaviso = "Preaviso: ";
var texto_sonido_asaltos = "Asalto: ";
var texto_sonido_descanso = "Descanso: ";
var texto_sonido_preaviso = "Preaviso: ";
var texto_sonido_fin = "Fin combate: ";
var texto_theme = "Theme: ";
var txt_sonidos = ["sirena", "campana", "dong","buzzer","slap","timbre"]
var txt_preavisos = ["ninguno","Asalto", "Descanso", "Asalto y descanso"]
var txt_themes = ["Estandar","Dark","Light", "Color"]

var sesion = {
    sesiones: [{
            nombre: "combate",
            rounds: 4,
            time_round: 3,
            time_stop: 60,
            alert: 0
        },
        {
            nombre: "calentamiento",
            rounds: 4,
            time_round: 3,
            time_stop: 60,
            alert: 0
        },
        {
            nombre: "entrene",
            rounds: 4,
            time_round: 3,
            time_stop: 60,
            alert: 0
        },
    ]
};




var sonido_asaltos = 1;
var sonido_descanso = 0;
var sonido_preaviso = 2;
var sonido_fin = 3;

var sonidos_mp3 = [];
sonido[0] = new Audio("mp3/sirena.mp3");
sonido[1] = new Audio("mp3/campana.mp3");
sonido[2] = new Audio("mp3/dong.mp3");
sonido[3] = new Audio("mp3/buzzer.mp3");
sonido[4] = new Audio("mp3/slap.mp3");
sonido[5] = new Audio("mp3/timbre.mp3");

var click = new Audio("mp3/click.mp3");
var fail = new Audio("mp3/fail.mp3");

$(document).ready(function() {
  var height =  window.innerHeight-60;

$("body,html").css("height", height);
    refresh();
    if (localStorage.getItem("data")) {
        sesion = JSON.parse(localStorage.getItem("data"))
    }
    populate();

    $("#panel_main .boton").click(function(e) {
        suma($(this).attr("data-value"), $(this).parent().attr("id"));
          click.play();
          refresh();
    });

    $("#panel_sonido .boton").click(function(e) {
        sonido($(this).attr("data-value"), $(this).parent().attr("id"));
    });
    $("#panel_config #theme .boton").click(function(e) {
       console.log("clic");
        tema($(this).attr("data-value"));

    });
    $("#button_go").click(function() {
        $("body").addClass("clock");
        countdown(tiempo_asaltos, asaltos);
    })

    $(".icono").click(function() {
        if ($("body").hasClass("home")) {
          click.play();
            $(this).addClass("full");
            $('body').addClass($(this).attr("id"));
            $('body').removeClass("home");
        } else {
            fail.play();
            $(".full").removeClass("full");
            $('body').removeClass();
            $('body').addClass("home");
        }
    })

    $(".pause").click(function() {
       fail.play();
          clearTimeout(crono);
        closes();
    })

$("#add_sesion").click(function() {
      click.play();
        if (!$("#panel_sesiones .modal").hasClass("on")) {
            $("#panel_sesiones .modal").addClass("on");
            $("#add_sesion").html("Confirmar");
        } else {
          $("#add_sesion").html("Añadir sesión");
            sesion.sesiones.push({
                nombre: $("#name").val(),
                rounds: asaltos,
                time_round: tiempo_asaltos,
                time_stop: tiempo_descanso,
                alert: preaviso
            });
            $("#panel_sesiones .botonera").append(fillnode(sesion.sesiones.length - 1, "getout"));
            save();
            setTimeout(function() {
                $("#panel_sesiones .botonera .boton:last-child").removeClass("getout");
            }, 10);
            $("#panel_sesiones .modal").removeClass("on");
        }
    })
    $("#panel_sesiones .botonera").scroll(function() {
       set_shadows();
});
});

function closes() {
    $(".full").removeClass("full");
    $('body').removeClass();
    $('body').addClass("home");
}
function set_shadows(){
 element=$("#panel_sesiones .botonera");
   if ($("#panel_sesiones .botonera").scrollTop() > 0) {
            $("#panel_sesiones .botonera").addClass("shadow_top");
              console.log("hagp scrol");
        } else {
            $("#panel_sesiones .botonera").removeClass("shadow_top");
        }
        if ($("#panel_sesiones .botonera").scrollTop == ($("#panel_sesiones .botonera").scrollHeight - $("#panel_sesiones .botonera").offsetHeight)) {}
        if ($("#panel_sesiones .botonera").scrollTop() - $("#panel_sesiones .botonera").height() == $("#panel_sesiones .botonera").outerHeight()) {
            //alert("bottom!");
        }
    
}

function remove(ses) {
    fail.play();
   $("#panel_sesiones .botonera .boton:nth-child(" + ($(ses).index() + 1) + ")").addClass("getout").delay(800).fadeOut(600);
    sesion.sesiones.splice($(this).parent().index(), 1);
    save();
    set_shadows();
};

function populate() {
    var node = "";
    for (var i = 0; i < sesion.sesiones.length; i++) {
        node += "<div class='boton' onclick='activa_sesion($(this))'>" + sesion.sesiones[i].nombre;
        node += "<p>rounds: " + sesion.sesiones[i].rounds + " de " + sesion.sesiones[i].time_round + "m descanso: " + sesion.sesiones[i].time_stop + "m </br> Preaviso de " + sesion.sesiones[i].alert + "</p>";
        node += "<div class='remove'  onclick='remove($(this).parent())'></div></div>";
    }
    $("#panel_sesiones .botonera").html(node);
    set_shadows();
    save();
}

function fillnode(index, clase) {
    var node = "";
    node += "<div class='boton " + clase + "' onclick='activa_sesion($(this))'>" + sesion.sesiones[index].nombre;
    node += "<p>rounds: " + sesion.sesiones[index].rounds + " de " + sesion.sesiones[index].time_round + "m descanso: " + sesion.sesiones[index].time_stop + "m </br> Preaviso de " + txt_preavisos[sesion.sesiones[index].alert] + "</p>";
    node += "<div class='remove' onclick='remove($(this).parent())'></div></div>";
    set_shadows();
    return node;
}

function save() {
    var myJSON = JSON.stringify(sesion);
    localStorage.setItem("data", myJSON);
}

function activa_sesion(index) {
$("#panel_sesiones .boton").removeClass("activo");
 $(index).addClass("activo");
 asaltos = sesion.sesiones[$(index).index()].rounds;
 tiempo_asaltos =  sesion.sesiones[$(index).index()].time_round;
 tiempo_descanso = sesion.sesiones[$(index).index()].time_stop;
 preaviso = sesion.sesiones[$(index).index()].alert;
 refresh();
    click.play();
}

function suma(valor,variable) {
    window[variable] += Number(valor);
    $("#" + variable + " h2").html(window["texto_" + variable] + window[variable]);
}
function tema(valor){
    theme+=Number(valor);
    //if (theme>txt_themes.lenght) theme=0;
    $("#wrap").removeClass();
     $("#wrap").addClass(txt_themes[theme]);
    refresh();
}
function sonido(valor, variable) {
    window[variable] += Number(valor);
    if ( window[variable]>(txt_sonidos.length-1)){ window[variable]=0}
          if ( window[variable]<0){ window[variable]=txt_sonidos.length-1}
    $("#" + variable + " h2").html(window["texto_" + variable] + txt_sonidos[window[variable]]);
    sonido[window[variable]].play();
}

function round() {
    temp_asaltos = asaltos;
}

function countdown(minutes, howrounds) {
    seconds = 60;
    $("#clock #rounds").html(((asaltos - howrounds) + 1) + " de " + asaltos);
    var mins = minutes;

    function tick() {
        var counter = document.getElementById("counter");
        var current_minutes = mins - 1
        seconds--;
        counter.innerHTML = current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
        if ((seconds==30) && (current_minutes==0) && (!$("body").hasClass("descanso")) && ((preaviso==1) || (preaviso==3))) {  sonido[sonido_preaviso].play();console.log("preaviso")}
        if ((seconds==10) && ($("body").hasClass("descanso")) && ((preaviso==2) || (preaviso==3))) {  sonido[sonido_preaviso].play();console.log("preaviso")}


        if (seconds > 0) {
            crono = setTimeout(tick, 100);
        } else {
            if (mins > 1) {
                countdown(mins - 1, howrounds);
            } else {
                if (!$("body").hasClass("descanso")) {
                    if ((howrounds - 1) == 0) {
                        return
                    }
                    $("body").addClass("descanso");
                     sonido[sonido_descanso].play();
                    countdown(tiempo_descanso, howrounds);
                      
                } else {
                    howrounds--;
                    $("body").removeClass("descanso");
                    countdown(tiempo_asaltos, howrounds)
                     sonido[sonido_asaltos].play();
                }

            }
        }
    }
    tick();
}

function refresh() {
    $("#tiempo_asaltos h2").html(window["texto_tiempo_asaltos"] + tiempo_asaltos);
    $("#asaltos h2").html(window["texto_asaltos"] + asaltos);
    $("#tiempo_descanso h2").html(window["texto_tiempo_descanso"] + tiempo_descanso);
    if (preaviso>(txt_preavisos.length-1)) {preaviso=0}
      if (preaviso<0) {preaviso=(txt_preavisos.length-1)}
    $("#theme h2").html(window["texto_theme"] +  txt_themes[theme]);
    $("#preaviso h2").html(window["texto_preaviso"] + txt_preavisos[preaviso]);
    $("#sonido_asaltos h2").html(window["texto_sonido_asaltos"] + txt_sonidos[sonido_asaltos]);
    $("#sonido_descanso h2").html(window["texto_sonido_descanso"] + txt_sonidos[sonido_descanso]);
    $("#sonido_fin h2").html(window["texto_sonido_fin"] + txt_sonidos[sonido_fin]);
    $("#sonido_preaviso h2").html(window["texto_sonido_preaviso"] + txt_sonidos[sonido_preaviso]);
}
