import { Layer } from "./map/components/Layer.js";
import { insertHeader, menuToggle } from "./util/functions.js";
import { map } from "./main.js";
import { USER_STATES, MAP_TYPE } from "./util/dictionary.js";

export const app = {
    profile: USER_STATES.IS_NOT_LOGGED,
    baseMap: {},
    profiles: {},

    _load: function () {
        const headerContent = insertHeader();
        const menuToggleContent = menuToggle();
        const mapDiv = document.getElementById('map');
        mapDiv.insertAdjacentHTML('beforebegin', headerContent);
        mapDiv.insertAdjacentHTML('afterEnd', menuToggleContent);
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
                        let layerMinimap = L.tileLayer(capa.host);
                        new L.Control.MiniMap(layerMinimap, {
                            toggleDisplay: true,
                            minimized: false,
                            position: "bottomright"
                        }).addTo(map)
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
    }
};
