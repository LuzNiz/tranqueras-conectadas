
let map = L.map('map').setView([-36.014268753, -59.099863977], 10);

L.tileLayer('http://a.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

const urlParams = new URLSearchParams(window.location.search);

const longitud = urlParams.get('longitud');
const latitud = urlParams.get('latitud');

let currentLat;
let currentLon;


function getPosition(position) {
    var currentLat = position.coords.latitude;
    var currentLon = position.coords.longitude;
    var control = L.Routing.control({
        waypoints: [ 
            // L.latLng(currentLat, currentLon),
            L.latLng(currentLat !== undefined ? currentLat  : -36.014389267137986 , currentLon !== undefined ? currentLon : -59.10090002591088),
            // L.latLng(-36.014389267137986, -59.10090002591088),
            L.latLng(latitud, longitud)
        ],
        draggableWaypoints: false,
        routeWhileDragging: false,
        lineOptions : {
            addWaypoints: false
        },
        router: L.Routing.mapbox('pk.eyJ1IjoibW9kZXJubGYiLCJhIjoiY2xrMGVxOGsxMGw3MDNxbzR5ZjM5dWtzayJ9.HP7ifw3GCyFaYjYZgWHrsw', {language: 'es'})
    }).addTo(map);
    L.Routing.errorControl(control).addTo(map);
}

function handleGeolocationError(error) {
    console.error('Error al obtener la ubicación:', error.message);
}

if (!navigator.geolocation) {
    console.log('Navegador no soporta la ubicación');
} else {
    navigator.geolocation.getCurrentPosition(getPosition, handleGeolocationError);
}