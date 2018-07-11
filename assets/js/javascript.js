$(document).ready(function() {
/*----- Lanzar a pantalla completa al hacer doble click -----*/
function launchFullscreen(element) {
    if(element.requestFullscreen) {
        element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}
window.onclick = function() {
launchFullscreen(document.documentElement);
}

/*----- Desactivar click derecho para darle mas similitud respecto a MAC -----*/
document.addEventListener('contextmenu', event => event.preventDefault());

/*----- FIX -> No permitir parámetros a la entrada al simulador para evitar errores -----*/
if(window.location.href.search("#") > -1)
{
	window.location = window.location.href.split('#')[0];
}
/*----- Reloj -----*/
var dias = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];

var newDate = new Date();
newDate.setDate(newDate.getDate());
$('#fechaMenu').html(dias[newDate.getDay()].substr(0,3).toUpperCase() + " ");

setInterval( function() {
	var minutos = new Date().getMinutes();
	$(".min, .mins").html(( minutos < 10 ? "0" : "" ) + minutos);
    },1000);
	
setInterval( function() {
	var horas = new Date().getHours();
	$(".hora, .horas").html(( horas < 10 ? "0" : "" ) + horas);
    }, 1000);
	
/*----- Formulario de coexión -----*/
$('.submit').click(function() {
	var ValPassword = $('input[type=password]').val() === 'DAW1';
    if (ValPassword === true) {
		$('input[type=password]').addClass('valid');
		$('.sugerenciaContraseña').hide();
		$('.submit').removeClass('submit').addClass('charge');
		$('capaDeCarga').addClass('initLog').delay(1900).queue(function() { $(this).removeClass('initLog').addClass('initLogExit'); $(this).dequeue(); });;
		$('#escritorio, #cabecera').delay(2500).queue(function() { $(this).addClass('vis'); $(this).dequeue(); });
		$('.ventana').delay(3000).queue(function() {
			$(this).addClass('ventanas-vis'); $(this).dequeue();
			new Audio('assets/sounds/conexion.mp3').play();});
		event.preventDefault();
    }
    else {
		$('.sugerenciaContraseña').hide();
		$('input[type=password]').select();
    	$('.validarConexion').addClass('error').delay(510).queue(function() { $(this).removeClass('error'); $(this).dequeue(); $('.sugerenciaContraseña').show(); });
			return false;
    	}
});

/*----- Permitir mover ventanas -----*/
$('.content').remove();

var a = 3;
$('.content,.specific,.project,.share').draggable({ handle: '.title-inside', start: function(event, ui) { $(this).css("z-index", a++); }});
$(".ventana").draggable({ handle: '.titleInside, .nombreMAC, .tab', refreshPositions: true, containment: 'ventana', start: function(event, ui) { $(this).css("z-index", a++); } });
$(".ventana").bind('mouseup', function(){$(this).css("z-index", a++);});
$(".ventana").bind('mousedown', function(){$(this).css("z-index", a++);});


/*----- Dock (Menu MAC) -----*/
$('#dock ul li').hover(
	function(){
		$(this).addClass('ok').prev().addClass('prev').prev().addClass('prev-ancor');
		$(this).addClass('ok').next().addClass('next').next().addClass('next-ancor');
	},
	function(){
		$('#dock ul li').removeClass('ok prev next next-ancor prev-ancor');
	}
);

/*----- Ocultar y cerrar ventanas -----*/
var left = 50 + '%';
var top = 15 + '%';
var item = $('<div class="fresh"></div>').hide();
var itemR = $('<div class="fresh"></div>').hide();

$("a[data-rel=cerrarVentana]").click(function(e) {
    e.preventDefault();
    $(this.hash).fadeOut(200, function() {
		$(this).css({ top: top, left: left });
	});
});

$("a[data-rel=show]").click(function(e) {
    e.preventDefault();
    $(this.hash).show();
});

$("#dock li a[data-rel=mostrarVentana]").click(function(e) {
    e.preventDefault();
	$(this).addClass('bounce').delay(600).queue(function() { $(this).removeClass('bounce'); $(this).append(item); item.fadeIn(500); $(this).dequeue(); });
    $("#precaucion").delay(600).queue(function() { $(this).show(); $(this).dequeue(); });
});

$("#precaucion a[data-rel=cerrarVentana]").click(function(e) {
    e.preventDefault();
	item.fadeOut(500);
    $(this.hash).hide();
});

$("#dock li a[data-rel=mostrarVentanaPapelera]").click(function(e) {
    e.preventDefault();
	$(this).addClass('bounce').delay(600).queue(function() { $(this).removeClass('bounce'); $(this).append(itemR); itemR.fadeIn(500); $(this).dequeue(); });
    $("#papelera").delay(600).queue(function() { $(this).show(); $(this).dequeue(); });
});

$("#dock li a[data-rel=virusErasto]").click(function(e) {
    e.preventDefault();
	$(this).addClass('bounce').delay(600).queue(function() { $(this).removeClass('bounce'); $(this).append(itemR); itemR.fadeIn(500); $(this).dequeue(); });
    $("#virusErasto").delay(600).queue(function() { $(this).show(); $(this).dequeue(); });
});

$("[data-rel=mostrarConfirmacionPapelera]").click(function(e) {
    e.preventDefault();
	$(this).addClass('bounce').delay(600).queue(function() { $(this).removeClass('bounce'); $(this).append(itemR); itemR.fadeIn(500); $(this).dequeue(); });
    $("#papelera").queue(function() { $(this).hide(); $(this).dequeue(); });
    $("#confirmacionPapelera").delay(600).queue(function() { $(this).show(); $(this).dequeue(); });
});

$("#papelera a[data-rel=cerrarVentana]").click(function(e) {
    e.preventDefault();
	itemR.fadeOut(500);
    $(this.hash).hide();
});
});