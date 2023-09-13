let map = L.map('map').setView([-36.014268753, -59.099863977], 10);

L.tileLayer('http://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

const urlParams = new URLSearchParams(window.location.search);

const longitud = urlParams.get('longitud');
const latitud = urlParams.get('latitud');

let currentLat = -36.014389267137986; // Valor inicial para latitud
let currentLon = -59.10090002591088;  // Valor inicial para longitud

function getPosition(position) {
    currentLat = position.coords.latitude;
    currentLon = position.coords.longitude;

    // Actualizar la ubicación en el control de enrutamiento (si es necesario)
    control.setWaypoints([
        L.latLng(currentLat, currentLon),
        L.latLng(latitud, longitud)
    ]);
}

function handleGeolocationError(error) {
    console.error('Error al obtener la ubicación:', error.message);
}

if (!navigator.geolocation) {
    console.log('Navegador no soporta la ubicación');
} else {
    const control = L.Routing.control({
        waypoints: [
            L.latLng(currentLat, currentLon),
            L.latLng(latitud, longitud)
        ],
        draggableWaypoints: false,
        routeWhileDragging: false,
        lineOptions: {
            addWaypoints: false
        },
        router: L.Routing.mapbox('pk.eyJ1IjoibW9kZXJubGYiLCJhIjoiY2xrMGVxOGsxMGw3MDNxbzR5ZjM5dWtzayJ9.HP7ifw3GCyFaYjYZgWHrsw', { language: 'es' })
    }).addTo(map);

    L.Routing.errorControl(control).addTo(map);

    // Usar watchPosition para rastrear la ubicación continuamente
    navigator.geolocation.watchPosition(getPosition, handleGeolocationError);
}
