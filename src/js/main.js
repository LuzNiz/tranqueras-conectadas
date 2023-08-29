import { app } from "./app.js";
import { IS_DEVELOPMENT } from "./test/variables.js";

export let pointProperties = [];
export const markerReferences = {};

export let map = L.map('map', {
    zoomControl: true,
    maxZoom: 15,
    minZoom: 10,
    dragging: true,
}).setView([-36.01494877362484, -59.10050714352874], 0);

// Define la clase para el control personalizado
var ResetMapControl = L.Control.extend({
    options: {
        position: 'topleft',
    },
    onAdd: function(map) {
        // Crear un botón en el contenedor del control
        var container = L.DomUtil.create('div', 'reset-map-control');
        var button = L.DomUtil.create('button', '', container);
        button.classList.add('button-control')
        button.innerHTML = `
            <img src="../../images/world_icon.png" >
        `;
        
        // Agregar un evento de clic al botón para volver a la posición inicial
        L.DomEvent.on(button, 'click', this._resetMap, this);
        
        return container;
    },
    
    
    _resetMap: function() {
        // Centrar el mapa en la posición inicial y restablecer el nivel de zoom
        this._map.setView([-36.01494877362484, -59.10050714352874], 0);
    }
});

// Crear una instancia del control personalizado
var resetMapControl = new ResetMapControl();

// Agregar el control personalizado al mapa
resetMapControl.addTo(map);
app._load();

$.getJSON("data/data.json", function (data) {
    const maps = data.items;
    app.addBaseMap(maps);
    L.control.layers(app.baseMap).addTo(map);
    app.addLayers(maps)
})

const menuToggle = document.getElementById('toggle-menu');
const menuToggleContainer = document.getElementById('menuToggleContainer');

if(IS_DEVELOPMENT) console.log(app.baseMap);

if(window.innerWidth <= 768){
    menuToggle.addEventListener('click', ()=>{
        if(menuToggleContainer.classList.contains('hidden')){
            menuToggle.innerHTML= '<img id="toggle-menu" src="./images/close_icon.png" style= "width: 20px;  height: 20px">'
            menuToggleContainer.classList.remove('hidden')
        }else {
            menuToggleContainer.classList.add('hidden')
            menuToggle.innerHTML= '<img id="toggle-menu" src="./images/hamburger_menu.png" style= "width: 35px;  height: 35px">'
        }
    });
}


// var lc = L.control
//   .locate({
//     position: "topright",
//     strings: {
//       title: "Show me where I am, yo!"
//     }
//   })
//   .addTo(map);

// function login (options) {
//     // url del servlet del geoserver
//     var url = options.server + "geoserver/j_spring_security_check";
//     // parametros para el login
//     let params = "username=" + options["user"] + "&password="
//                 + options["password"];

//     var contentType = "application/x-www-form-urlencoded";
//     //se inicializa la petición ajax
//     var ajax = $.ajax({
//         data : params,
//         type : "POST",
//         contentType : contentType,
//         url : url
//     });
//     // se ejecuta cuando la peticion finaliza
//     ajax.done(function() {

//         if ($.cookie("JSESSIONID") != null && options && options.success) {
//             options.success();
//         }
//     });
//     // si ocurrio un error al realizar la peticion
//     ajax.fail(function(data) {
//         if (options && options.failure) {
//             options.failure(data);
//         }
//     });
//     // se ejecuta siempre al final de la petición, sin importar que esta
//     // haya fallado
//     ajax.always(function() {
//         if (options && options.always) {
//             options.always();
//         }
//     });
// };

// login({
//     user:"admin", //geoserver user
//     password: "adminPassword", 
//     server : "http://mapas.lasflores.net.ar:8080/", //geoserver host
//     success : function(){
//         alert("Login OK!");
//     },
//     failure : function(){
//         alert("Login fail!");
//     }
// });