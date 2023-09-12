import { pointProperties, map} from "../../../main.js";
import { IS_DEVELOPMENT } from "../../../test/variables.js";
import { MESSAGES_TYPES } from "../../../util/dictionary.js";

const body = document.getElementById('body');
const searchWrapper = document.querySelector('.search-input');
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");

function showSuggestions(suggestions) {
    suggBox.innerHTML = suggestions.join('');
}

let emptyArray;
let emptyArrayHTML;

inputBox.addEventListener("input", (e) => {
    let userData = e.target.value.trim(); 

    if(IS_DEVELOPMENT) console.log(userData);
    
    emptyArray = [];
    emptyArrayHTML = [];

    if (userData !== "") {
        suggBox.classList.remove('hidden');
        for (let key in pointProperties) {
            if (pointProperties.hasOwnProperty(key)) {
                let item = pointProperties[key];
                let name = item.name;
                let coordenadas = item.geo_planil.toString().split(', ');
                if (name && name.toLowerCase().includes(userData.toLowerCase())) {
                    emptyArray.push({ 
                        name: item.name, 
                        referencia: item.referencia,
                        latitud: coordenadas[0],
                        longitude: coordenadas[1]
                    });
                }else if (item.referencia && item.referencia.toLowerCase().includes(userData.toLowerCase())){
                    emptyArray.push({ 
                        name: item.name, 
                        referencia: item.referencia,
                        latitud: coordenadas[0],
                        longitude: coordenadas[1]
                    });
                }
            }
        } 

        if(emptyArray.length > 0){
            emptyArrayHTML = emptyArray.map((data) => {
                if (data.referencia == null) return `<li><span>${data.name}</span></li>`;
                else return `<li><span>${data.name}</span> - ${data.referencia}</li>`;
            });
        }else{
            emptyArrayHTML = [`<div class="res-not-found">
            <p>${MESSAGES_TYPES.TRANQUERA_NOT_FOUND}</p>
            <img src="../../../../images/not-found.svg"/>
            <p>${MESSAGES_TYPES.ENTER_AGAIN_TRANQUERA}</p>
            </div>`];
        }
    } else {
        suggBox.classList.add('hidden');
    }
    searchWrapper.classList.add('active');
    showSuggestions(emptyArrayHTML);
});


suggBox.addEventListener("click", (e) => {
    if (e.target.tagName === "LI" || e.target.tagName === "SPAN") {
        let selectedText = e.target.textContent;
        let selectedParts = selectedText.split(' - ');
        let selectedName = selectedParts[0];
        if(IS_DEVELOPMENT) console.log(selectedName);
        if(IS_DEVELOPMENT) console.log(emptyArray);

        let selectedLocation = emptyArray.find(item => item.name === selectedName || item.referencia === selectedName);
        if(IS_DEVELOPMENT) console.log(selectedLocation);
        if (selectedLocation) {
            let coords = {
                latitude: selectedLocation.latitud,
                longitude: selectedLocation.longitude
            };
            if(IS_DEVELOPMENT) console.log("Selected name:", selectedName,"Latitude:", coords.latitude,"Longitude:", coords.longitude);
            map.flyTo([coords.latitude, coords.longitude], 18, {
                duration: 2
            }).on('moveend', ()=>{
                var highlightCircle = L.circleMarker([coords.latitude, coords.longitude], {
                    radius: 45,
                    color: 'transparent',
                    fillColor: '#72A0C1',
                    fillOpacity: 0.5
                }).addTo(map);
                
                setTimeout(function() {
                    map.removeLayer(highlightCircle);
                }, 5000); 
            });


            inputBox.value = "";
            suggBox.classList.add('hidden');
        }
    }
});

body.addEventListener('click', (e)=>{
    if(!suggBox.classList.contains('hidden')){
        suggBox.classList.add('hidden');
    }
})
