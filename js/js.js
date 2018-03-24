
var asaltos=4;
var tiempo_asaltos=3;
var tiempo_descanso=1;
var preaviso=0;
var seconds = 60;
var crono;

var texto_asaltos="Asaltos: ";
var texto_tiempo_asaltos="Tiempo asalto: ";
var texto_tiempo_descanso="Tiempo descanso: ";
var texto_preaviso="Preaviso";

var sonidos=["gong", "campana","sirena","bocina","silbato"]
var sonido_asaltos=1;
var sonido_descanso=1;
var sonido_preaviso=1;
var sonido_fin=1;

var texto_sonido_asaltos="Asalto: ";
var texto_sonido_descanso="Descanso: ";
var texto_sonido_preaviso="Preaviso: ";
var texto_sonido_fin="Fin combate: ";
var sesion = {sesiones:[
{nombre:"combate", rounds:4, time_round:3, time_stop:60, alert:0},
{nombre:"calentamiento", rounds:4, time_round:3, time_stop:60, alert:0},
{nombre:"entrene", rounds:4, time_round:3, time_stop:60, alert:0},
]};

$(document).ready(function() {
refresh();
  console.log(localStorage.getItem("data"));
   sesion = JSON.parse(localStorage.getItem("data"))
  populate();
$("#main .boton").click(function(e){
	//e.stopPropagation();
  suma( $(this).attr("data-value"),$(this).parent().attr("id"))  ;
} );

$("#panel_sonido .boton").click(function(e){
    //e.stopPropagation();
  sonido( $(this).attr("data-value"),$(this).parent().attr("id"))  ;
} );

$("#button_go").click(function(){
    $("body").addClass("clock");
    countdown(tiempo_asaltos, asaltos);
})

$(".icono").click(function(){
  if ($("body").hasClass("home")){
    $(this).addClass("full");
   // $(".close").html('<div class="info">'+$(this).attr("id")+ '</div>')
    $('body').addClass($(this).attr("id"));
    $('body').removeClass("home");
} else {

      $(".full").removeClass("full");
    $('body').removeClass();
     $('body').addClass("home");
  clearTimeout(crono);
}
})
$("#add_sesion").click(function(){
  if (!$("#panel_sesiones .modal").hasClass("on")){
$("#panel_sesiones .modal").addClass("on");

} else {

  sesion.sesiones.push({ nombre: "id", rounds: 9, time_stop:90,alert:90 });
 populate();
  $("#panel_sesiones .modal").removeClass("on");
}
})
});
function remove(ses){
  console.log($(this).parent().index());
  $("#panel_sesiones .botonera .boton:nth-child("+(ses+1)+")").addClass("getout").delay(800).fadeOut(600);
sesion.sesiones.splice($(this).parent().index(), 1); 
save();
//populate();
};
function populate(){
	var node="";
	for (var i=0; i<sesion.sesiones.length; i++){
    console.log("voy por "+i);
	 node+="<div class='boton' onclick='activa_sesion()'>"+sesion.sesiones[i].nombre;
	 node+="<p>rounds: "+sesion.sesiones[i].rounds+" de "+ sesion.sesiones[i].time_round+"m descanso: "+ sesion.sesiones[i].time_stop+"m </br> Preaviso de "+  sesion.sesiones[i].alert+"</p>";
	 node+="<div class='remove'  onclick='remove("+i+")'></div></div>";
	}
	$("#panel_sesiones .botonera").html(node);
save();
}
 
function save(){
    var myJSON = JSON.stringify(sesion);
  localStorage.setItem("data", myJSON);
}

function activa_sesion(){
	$(this).addClass("activo");
}

function suma(valor, variable){
  window[variable]+=Number(valor);
$("#"+variable+" h2").html(window["texto_"+variable] + window[variable]);
}

function sonido(valor, variable){
  window[variable]+=Number(valor);
$("#"+variable+" h2").html(window["texto_"+variable] +   sonidos[window[variable]]);
}

function round(){
	temp_asaltos=asaltos;
}


function countdown(minutes, howrounds) {
	seconds=60;

		$("#clock #rounds").html(((asaltos-howrounds)+1)+ " de "+asaltos);	
    var mins = minutes

    function tick() {
        var counter = document.getElementById("counter");
        var current_minutes = mins-1
        seconds--;
        counter.innerHTML = current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
        if( seconds > 0 ) {
             crono=setTimeout(tick, 100);
        } else {
            if(mins > 1){
                countdown(mins-1, howrounds);           
            } else {    
            	if(!$("body").hasClass("descanso")){
            	if ((howrounds-1)==0) {return}       
            	$("body").addClass("descanso");
    			countdown(tiempo_descanso, howrounds);

   				} else {
howrounds--;
				$("body").removeClass("descanso");
    			countdown(tiempo_asaltos, howrounds)}

   				}     
        }
    }
    tick();
}


function refresh(){
	$("#tiempo_asaltos h2").html(window["texto_tiempo_asaltos"]+tiempo_asaltos);
	$("#asaltos h2").html(window["texto_asaltos"]+asaltos);
	$("#tiempo_descanso h2").html(window["texto_tiempo_descanso"]+tiempo_descanso);

    $("#sonido_asaltos h2").html(window["texto_sonido_asaltos"]+sonidos[sonido_asaltos]);
    $("#sonido_descanso h2").html(window["texto_sonido_descanso"]+sonidos[sonido_descanso]);
    $("#sonido_fin h2").html(window["texto_sonido_fin"]+sonidos[sonido_fin]);
      $("#sonido_preaviso h2").html(window["texto_sonido_preaviso"]+sonidos[sonido_preaviso]);
 /*   var texto_sonido_asaltos="Sonido Asalto: ";
var texto_sonido_descanso="Sonido descanso: ";
var texto_sonido_preaviso="Sonido preaviso: ";
var texto_sonido_fin="Sonido fin: ";*/
}
