import { Layer } from "../models/Layer.js"
import { insertHeader, menuToggle, addToggleOptions, loadLogin } from "./util/functions.js";
import { body, map, mapDiv} from "./main.js";
import { USER_STATES, MAP_TYPE } from "./util/dictionary.js";

let layersControlAdded = false;
let miniMapAdded = false;
let elementsAdded = false;

export const app = {
    profile: USER_STATES.IS_NOT_LOGGED,
    baseMap: {},
    profiles: {},
    layers: {},

    _load: function () {
        const mapDiv = document.getElementById('map');
        if(!document.querySelector('header')){
            const headerContent = insertHeader();
            mapDiv.insertAdjacentHTML('beforebegin', headerContent);
        }
        
        if(!elementsAdded){
            const menuToggleContent = menuToggle();
            mapDiv.insertAdjacentHTML('afterEnd', menuToggleContent);
            mapDiv.insertAdjacentHTML('afterEnd', addToggleOptions());
            mapDiv.insertAdjacentHTML('afterEnd', loadLogin());
            elementsAdded = true;
        }

        $.getJSON("data/data.json", function (data) {
            const maps = data.items;
            app.addBaseMap(maps);
            if (!layersControlAdded) {
                L.control.layers(app.baseMap).addTo(map);
                layersControlAdded = true;
            };
            app.addLayers(maps)
        });

    },

    addBaseMap: function (data) {
        data.forEach(mapas => {
            if (mapas.type === MAP_TYPE.BASE_MAP) {
                mapas.capas.forEach(capa => {
                    let baseLayer = L.tileLayer(capa.host, {
                        attribution: capa.attribution,
                        minZoom: capa.zoom.min,
                        maxZoom: capa.zoom.max,
                        minNativeZoom: capa.zoom.nativeMin,
                        maxNativeZoom: capa.zoom.nativeMax,
                    });
                    if (capa.selected) {
                        baseLayer.addTo(map);
                        if(!miniMapAdded){
                            let layerMinimap = L.tileLayer(capa.host);
                            new L.Control.MiniMap(layerMinimap, {
                                toggleDisplay: true,
                                minimized: false,
                                position: "bottomright"
                            }).addTo(map);
                            miniMapAdded = true;
                        }
                    }
                    this.baseMap[capa.titulo] = baseLayer;
                });
            }
        });
    },

    addLayers: (data) => {
        data.forEach(items => {
            if (items.type !== MAP_TYPE.BASE_MAP) {
                let layer = new Layer(
                    items.type,
                    items.peso,
                    items.nombre,
                    items.short_abstract,
                    items.layers,
                    items.seccion,
                    items.servicio,
                    items.version,
                    items.host,
                );
                layer.layers.forEach(capa => {
                    try{
                        layer.requestLayerWFS(capa);
                    }catch(error){
                        throw new Error('Capa no disponible');
                    }
                });
            }
        })
    },

    reset: function () {
        for (const key in this.layers) {
            if (this.layers.hasOwnProperty(key)) {
                const layer = this.layers[key];
                map.removeLayer(layer);
            }
        }

        for (const key in this.baseMap) {
            if (this.baseMap.hasOwnProperty(key)) {
                const layerBase = this.baseMap[key];
                map.removeLayer(layerBase);
            }
        }
        this.layers = {};
        this.baseMap = {};
    },
    
    

    changeProfile: function (profile){
        this.profile = profile;
        // body.removeChild(mapDiv.parentNode.firstElementChild)
        this.reset();
        this._load();
    }
};

