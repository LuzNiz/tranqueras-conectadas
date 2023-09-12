import { app } from "./app.js";
import { RESPONSIVE_DISPLAYS , SIGN_IN_STATUS } from "./util/dictionary.js";
import { IS_DEVELOPMENT } from "./test/variables.js";
import { openHTMLNavigator } from "./util/functions.js";

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
const toggleOptions = document.querySelector('header').lastElementChild.lastElementChild;
const optionsContainer = body.querySelector(".options-toggle")
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
}else{
    toggleOptions.addEventListener("click", (e)=>{
        if(optionsContainer.classList.contains("hidden")){
            toggleOptions.innerHTML= '<img id="toggle-menu" src="./images/arrow_top_up_icon.png">'
            optionsContainer.classList.remove("hidden");
        }else {
            toggleOptions.innerHTML= '<img src="./images/down_arrow_icon.png">'
            optionsContainer.classList.add("hidden");
        }
    })
}
export const mapDiv = document.getElementById('map');




