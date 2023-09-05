import { app } from "./app.js";
import { RESPONSIVE_DISPLAYS , SIGN_IN_STATUS } from "./util/dictionary.js";
import { IS_DEVELOPMENT } from "./test/variables.js";
import { createPopupMessage, openHTMLNavigator } from "./util/functions.js";

export let pointProperties = [];
export const markerReferences = {};
const body = document.querySelector("body");

export let map = L.map('map', {
    zoomControl: true,
    maxZoom: 15,
    minZoom: 10,
    dragging: true,
}).setView([-36.01494877362484, -59.10050714352874], 0);

var ResetMapControl = L.Control.extend({
    options: {
        position: 'topleft',
    },
    onAdd: function(map) {
        var container = L.DomUtil.create('div', 'reset-map-control');
        var button = L.DomUtil.create('button', '', container);
        button.classList.add('button-control')
        button.innerHTML = `
            <img src="../../images/world_icon.png" >
        `;
        L.DomEvent.on(button, 'click', this._resetMap, this);
        return container;
    },
    _resetMap: function() {
        this._map.setView([-36.01494877362484, -59.10050714352874], 0);
    }
});

var resetMapControl = new ResetMapControl();

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


if(window.innerWidth <= RESPONSIVE_DISPLAYS.MOBILE){
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

const buttonSingIn = document.getElementById('signInButton');
export const mapDiv = document.getElementById('map');


buttonSingIn.addEventListener('click', (e)=>{
    e.preventDefault();
    if(e.target.textContent === SIGN_IN_STATUS.SIGN_IN){
        if(IS_DEVELOPMENT) console.log(e.target.textContent);
        openHTMLNavigator();
    }else{
        console.log("Cerrando sesión...")
    }
});

const messagePopUp = body.querySelector(".message-container");


// messagePopUp.firstElementChild.addEventListener("click", (e)=>{
//     if(IS_DEVELOPMENT) console.log(e.target);
//     messagePopUp.classList.add("hidden");
// })


