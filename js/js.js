
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
//var data = {rounds:4, time_round:3, time_stop:60, alert:0};

$(document).ready(function() {
refresh();

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
    $(this).addClass("full");
    $('body').addClass($(this).attr("id"));
})

$(".close").click(function(){
    $(".full").removeClass("full");
    $('body').removeClass();
  clearTimeout(crono);
})

});


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

		$("#clock #rounds").html((asaltos-howrounds)+1);	
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
            		
            		//rounds=Number(rounds);
            		
            	
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
