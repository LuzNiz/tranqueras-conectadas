import { map, markerReferences } from "../js/main.js";
import { createPopUp } from "../js/util/functions.js";
import { pointProperties } from "../js/main.js";
import { app } from "../js/app.js";

export class Layer {
    type;
    peso;
    nombre;
    short_abstract;
    layers;
    seccion;
    servicio;
    version;
    host;
    defaultParameters;

    constructor(type, peso, nombre, short_abstract, layers, seccion, servicio, version, host) {
        this.type = type;
        this.peso = peso;
        this.nombre = nombre;
        this.short_abstract = short_abstract;
        this.layers = layers;
        this.seccion = seccion;
        this.servicio = servicio;
        this.version = version;
        this.host = host;
    }

    getHostWFS(typeName) {
        if(this.servicio === 'WFS'){
            this.defaultParameters = {
                service: this.servicio,
                version: this.version,
                request: 'GetFeature',
                typeName: typeName,
                outputFormat: 'application/json'
            };
            let parameters = L.Util.extend(this.defaultParameters);
            return this.host + L.Util.getParamString(parameters);
        }
    }

    requestLayerWFS(typeName) {
        $.ajax({
            url : this.getHostWFS(typeName),
            success: function (data){
                var customIcon = L.icon({
                    iconUrl: '../../images/icon_tranqueras.svg',
                    iconSize: [40, 40],
                    iconAnchor: [0, 0]
                });
                
                const layer = new L.geoJson(data, {
                    onEachFeature: function(feature, layer){
                        if(feature.geometry.type === "MultiPolygon"){
                            const centroid = layer.getBounds().getCenter();

                            const labelMarker = L.marker(centroid, {
                                icon: L.divIcon({
                                    className: 'label-marker',
                                    html: feature.properties.cuartel_rom
                                })
                            });
                            
                            let labelAdded = false;

                            if(!labelAdded){
                                labelMarker.addTo(map);
                                labelAdded = true;
                            }
                            
                        }else if (feature.geometry.type === 'Point'){
                            createPopUp(feature, layer);
                        }
                    },
                    style: function(feature){
                        if(feature.geometry.type === 'MultiPolygon'){
                            return {
                                fillColor: 'transparent',
                                color: '#949494',
                                weight: 2,
                                opacity: 0.8,
                                dashArray: '2, 5'       
                            };
                        }
                    },
                    pointToLayer: function(feature, latlng){
                        if (feature.geometry.type === 'Point') {
                            const propertiesKey = JSON.stringify(feature.properties);
                            pointProperties[propertiesKey] = feature.properties;
                            return L.marker(latlng, { icon: customIcon });
                        }
                    }
                });
        
                const markers = new L.MarkerClusterGroup({showCoverageOnHover: true,
                    spiderfyDistanceMultiplier: 2});
                    markers.addLayer(layer);
                    map.addLayer(markers);
                    app.layers[typeName]= markers;
            }
        })
    }
}

export class BaseLayer {
    titulo;
    nombre;
    servicio;
    version;
    attribution;
    host;
    legendImg;
    peso;
    selected
    zoom;

    constructor(titulo, nombre, servicio, version, attribution, host, legendImg, peso,
        selected,zoom){
            this.titulo = titulo;
            this.nombre = nombre;
            this.servicio = servicio;
            this.version = version;
            this.attribution = attribution;
            this.host = host;
            this.legendImg = legendImg;
            this.peso = peso;
            this.selected = selected;
            this.zoom = zoom
        }
}
