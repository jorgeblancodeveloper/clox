
var asaltos=4;
var tiempo_asaltos=3;
var tiempo_descanso=1;
var preaviso=0;
var seconds = 60;
var crono;

var texto_asaltos="Asaltos: "
var texto_tiempo_asaltos="Tiempo asalto: ";
var texto_tiempo_descanso="Tiempo descanso: ";
var texto_preaviso="Preaviso";



//var data = {rounds:4, time_round:3, time_stop:60, alert:0};

$(document).ready(function() {
refresh();
$(".botonera .boton").click(function(e){
	e.stopPropagation();

  suma( $(this).attr("data-value"),$(this).parent().attr("id"))  ;

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
$("#"+variable+" h2").html(window["texto_"+variable] +  window[variable]);
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
}
