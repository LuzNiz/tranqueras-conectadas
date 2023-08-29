import { map } from "../main.js";
import { app } from "../app.js";
import { IS_DEVELOPMENT } from "../test/variables.js";

function openHTMLNavigator(coords) {
    if(app.profile === 'logged'){
        const coordenadas = coords.toString().split(', ');
    
        const latitud = parseFloat(coordenadas[0]);
        const longitud = parseFloat(coordenadas[1]);
    
        const url = `src/js/map/components/routing/navigator.html?longitud=${longitud}&latitud=${latitud}`;
        window.location.replace(url);
    }else {
        const mapDiv = document.getElementById('map');
        const popupMessage = createPopupMessage("Debe iniciar sesión para acceder a esta función");
        const popupContainer = document.createElement('div');
        popupContainer.className = 'popup-container';
        popupContainer.appendChild(popupMessage);
        
        mapDiv.parentElement.appendChild(popupContainer);
    }
};

function createPopUp(feature, layer) {
    // layer.on({
    //     mouseout: function (e) {
    //         layer.resetStyle(e.target);
    //     },
    //     mouseover: highlightFeature,
    // });


    let popupContent = '<div style="margin: 0.5em; font-size: 1.5em; font-weight: bold">'
        + (feature.properties['name'] !== '' ? feature.properties['name'] : '') + '</div>';

    popupContent += '<table>';
    for (let prop in feature.properties) {
        var skippedKeys = ["name", "geo_planil", "contacto", "telefono"];
        var skippedKeysProfileDefault = ["contacto", "telefono"]
        if (feature.properties.hasOwnProperty(prop) &&
            !skippedKeys.includes(prop)) {
            if (app.profile === "default" && !skippedKeysProfileDefault.includes(prop)) {
                popupContent += '<tr>';
                popupContent += '<td><strong>' + prop + '</strong></td>';
                popupContent += '<td>' + (feature.properties[prop] !== null ? feature.properties[prop] : '') + '</td>';
                popupContent += '</tr>';
                if (IS_DEVELOPMENT) console.log('PERFIL DEFAULT');
            } else {
                popupContent += '<tr>';
                popupContent += '<td><strong>' + prop + '</strong></td>';
                popupContent += '<td>' + (feature.properties[prop] !== null ? feature.properties[prop] : '') + '</td>';
                popupContent += '</tr>';
                if (IS_DEVELOPMENT) console.log('PERFIL LOGGED');
            }
        }
    }
    popupContent += '</table>';
    popupContent += `<button id="boton-navigator"; coords="${feature.properties['geo_planil']}" style="display: flex; justify-content: center; align-items: center; border-radius: 100px; margin:1em auto; background-color:#383861; border: none; width:30px; height: 30px; cursor: pointer"> 
    <img src="../../images/navigator_icon.svg" style="width: 18px; height: 18px; display: block; margin: 0 auto;" />
    </button>`;

    layer.bindPopup(popupContent, { maxWidth: 200 });

    map.on('popupopen', function (e) {
        let button = document.getElementById('boton-navigator');

        button.addEventListener('click', function () {
            const coords = button.getAttribute('coords');
            openHTMLNavigator(coords);
        });
    });
};

function insertHeader() {
    const headerContent = `
        <header>
            <div>
            ${window.innerWidth > 768 ?
                `<a href="https://lasflores.gob.ar/" target="_blank">
                    <img src="./images/Logo-Modernizacion-Blanco.png" alt="logo-municipal">
                </a>
                <h4>Tranqueras Conectadas</h4>` :
                `<div id="toggle-menu">
                    <img src="./images/hamburger_menu.png" style= "width: 35px;  height: 35px">
                </div>
                <a href="https://lasflores.gob.ar/" target="_blank">
                <img src="./images/logo-municipal-flor.svg" style= "width: 40px;  height: 40px"/>
                </a>
                `
            }
            </div>
            <div class="wrapper">
                <div class="search-input">
                    <input type="text" placeholder="Buscar tranquera..." autocomplete="off">
                    <div class="autocom-box hidden"></div>
                </div>
            </div>
                ${window.innerWidth > 768 ?
                `
                <div>
                    <button class="button"> Ingresar </button>
                    <a class="help-button" href="./src/js/map/components/help/help.html">
                        <img src="./images/icon-help.png" alt="icon-help">
                    </a>
                </div>` : ''
                }
        </header>`
    return headerContent;
}

function menuToggle() {
    let menuToggle;
    if (window.innerWidth <= 768) {
        menuToggle = `
        <div id="menuToggleContainer" class='menu-toggle hidden'>
            <h3>Tranqueras Conectadas </h3>
            <ul>
                <li><a href="">Iniciar Sesion</a></li>
                <li><a href="./src/js/map/components/help/help.html">Ayuda</a></li>
            </ul>
            <footer>
                <p>© Secretaría de Modernizacion || Municipalidad de Las Flores </p>
            </footer>
        </div>
        `
        return menuToggle;
    }
}

function createPopupMessage(message){
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message-container');
    messageContainer.innerHTML = `
        <p>${message}</p>
    `
    return messageContainer;
} 

export { openHTMLNavigator, createPopUp, insertHeader, menuToggle, createPopupMessage };