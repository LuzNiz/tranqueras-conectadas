import { map, mapDiv } from "../main.js";
import { app } from "../app.js";
import { login } from "../map/components/login/login-logic.js";
import { USER_STATES, RESPONSIVE_DISPLAYS, SIGN_IN_STATUS, OPTIONS_MENU, CLASS_NAME_TYPES, MESSAGES_TYPES } from "./dictionary.js";
import { Notification } from "../../models/Notifications.js";

function openHTMLNavigator(coords) {
    if (app.profile === USER_STATES.IS_LOGGED) {
        const coordenadas = coords.toString().split(', ');

        const latitud = parseFloat(coordenadas[0]);
        const longitud = parseFloat(coordenadas[1]);

        const url = `src/js/map/components/routing/navigator.html?longitud=${longitud}&latitud=${latitud}`;
        window.location.replace(url);
    } else {
        const existingNotification = document.getElementById('notification-container');
        if (!existingNotification) {
            const popupMessage = new Notification(MESSAGES_TYPES.NOT_ACCESS, CLASS_NAME_TYPES.REJECTED);
            mapDiv.insertAdjacentElement('afterEnd', popupMessage.createNotification());
        }
    }
};


function createPopUp(feature, layer) {
    let popupContent = '<div style="margin: 0.5em; font-size: 1.5em; font-weight: bold">'
        + (feature.properties['name'] !== '' ? feature.properties['name'] : '') + '</div>';

    popupContent += '<table>';
    for (let prop in feature.properties) {
        var skippedKeys = ["name", "geo_planil"];
        var skippedKeysProfileDefault = ["contacto", "telefono"];
        if(app.profile === USER_STATES.IS_LOGGED){
            if (feature.properties.hasOwnProperty(prop) &&
                !skippedKeys.includes(prop)) {
                if (app.profile === "default" && !skippedKeysProfileDefault.includes(prop)) {
                    popupContent += '<tr>';
                    popupContent += '<td><strong>' + prop + '</strong></td>';
                    popupContent += '<td>' + (feature.properties[prop] !== null ? feature.properties[prop] : '') + '</td>';
                    popupContent += '</tr>';
                } else {
                    popupContent += '<tr>';
                    popupContent += '<td><strong>' + prop + '</strong></td>';
                    popupContent += '<td>' + (feature.properties[prop] !== null ? feature.properties[prop] : '') + '</td>';
                    popupContent += '</tr>';
                }
        }
        }else{
            if (feature.properties.hasOwnProperty(prop) &&
                !skippedKeys.includes(prop) && !skippedKeysProfileDefault.includes(prop)) {
                if (app.profile === "default" && !skippedKeysProfileDefault.includes(prop)) {
                    popupContent += '<tr>';
                    popupContent += '<td><strong>' + prop + '</strong></td>';
                    popupContent += '<td>' + (feature.properties[prop] !== null ? feature.properties[prop] : '') + '</td>';
                    popupContent += '</tr>';
                } else {
                    popupContent += '<tr>';
                    popupContent += '<td><strong>' + prop + '</strong></td>';
                    popupContent += '<td>' + (feature.properties[prop] !== null ? feature.properties[prop] : '') + '</td>';
                    popupContent += '</tr>';
                }
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
                ${window.innerWidth > RESPONSIVE_DISPLAYS.MOBILE ?
                    `<a href="https://lasflores.gob.ar/" target="_blank">
                        <img src="./images/Logo-Modernizacion-Blanco.png" alt="logo-municipal">
                    </a>
                    <h4>Tranqueras Conectadas</h4>` 
                    :
                    `<div id="toggle-menu">
                        <img src="./images/hamburger_menu.png" style= "width: 35px;  height: 35px">
                    </div>
                    <a href="https://lasflores.gob.ar/" target="_blank">
                        <img src="./images/logo-municipal-flor.svg" style= "width: 40px;  height: 40px"/>
                    </a>`
                }
            </div>
            <div class="wrapper">
                <div class="search-input">
                    <input type="text" placeholder="Buscar tranquera..." autocomplete="off">
                    <div class="autocom-box hidden"></div>
                </div>
            </div>
                ${window.innerWidth > RESPONSIVE_DISPLAYS.MOBILE ?
                `
                <div>
                ${app.profile === USER_STATES.IS_NOT_LOGGED ?
                    `<button id="signInButton" class="button">${SIGN_IN_STATUS.SIGN_IN}</button>`
                    :
                    `<button id="logoutbtn" class="button">${SIGN_IN_STATUS.SIGN_UP}</button>`
                }
                    <div id="toggle-options">
                        <img src="./images/down_arrow_icon.png">
                    </div>
                </div>` : ''
        }
        </header>`
    return headerContent;
}

function menuToggle() {
    let menuToggle;
    if (window.innerWidth <= RESPONSIVE_DISPLAYS.MOBILE) {
        menuToggle = `
        <div id="menuToggleContainer" class='menu-toggle hidden box-shadow'>
            <h3>Tranqueras Conectadas </h3>
            <ul>
            ${app.profile === USER_STATES.IS_NOT_LOGGED ?
                `<li><a id="signInButton">${SIGN_IN_STATUS.SIGN_IN}</a></li>`
                :
                `<li><a id="logoutbtn">${SIGN_IN_STATUS.SIGN_UP}</a></li>`
            }
                <li><a href="./src/js/map/components/help/help.html">${OPTIONS_MENU.HELP_MENU}</a></li>
            </ul>
            <footer>
                <a href="./src/js/map/components/notification-problem/notification-form.html">${OPTIONS_MENU.REPORT_PROBLEM}</a>
                <p>© Secretaría de Modernizacion || Municipalidad de Las Flores </p>
            </footer>
        </div>
        `
        return menuToggle;
    }
}

function addToggleOptions(){
    let containerOptions = `
        <div class="hidden options-toggle box-shadow">
            <a class="help-button" href="./src/js/map/components/help/help.html">
                ${OPTIONS_MENU.HELP_MENU}
            </a>
            <a class="help-button" href="./src/js/map/components/notification-problem/notification-form.html">
                ${OPTIONS_MENU.REPORT_PROBLEM}
            </a>
        </div>
        `
        return containerOptions;
}

function loadLogin(){
    let modalLogin = `
        <div class="hidden">
            <div class="background-message">
            </div>
            <div id="loginModal" class="modal fade" role="dialog" style="position: absolute;">
                <div class="modal-dialog" style="position: relative; top: 12%;">
                    <form id="loginForm"  method="POST" action='https://mapas.lasflores.net.ar/geoserver/j_spring_security_check' class="modal-content form-signin" style="display: flex; flex-wrap: wrap; justify-content: center; padding: 3%;">
                        <img class="mb-4" src="./images/logo-municipal-flor.svg" alt="" width="100" height="100">
                        <h1 class="h3 mb-3" style="width: 100%; text-align: center;">Iniciar sesión</h1>
                        <h6>Uso 
                            <span style="font-weight: bold;">exclusivo</span> para personal municipal</h6>
                        <label for="name" class="sr-only">Nombre de cuenta</label>
                        <input type="text" id="name" class="form-control" placeholder="Nombre de cuenta" required autofocus>
                        <label for="pwd" class="sr-only">Contraseña</label>
                        <input type="password" autocomplete="current-password" id="pwd" class="form-control" placeholder="Contraseña" required>
                        <label for="newPwd" class="sr-only">Nueva contraseña</label>
                        <button type="submit" class="btn btn-lg btn-primary btn-block button" type="button">Ingresar</button>
                        <p style="font-size: 0.75em; margin-top: 2%; text-align: center; ">Para solicitar acceso, por favor, póngase en contacto con la 
                            <span style="font-weight: bold;">Secretaría de Modernización</span></p>
                        <!-- <button id="resetPwd" class="btn btn-lg btn-primary btn-block" type="button">Modificar contraseña</button> -->
                    </form>
                </div>
            </div>
        </div>
    `;

    return modalLogin;
}

function insertLoad() {
    const loadContainer = document.createElement('div');
    loadContainer.classList.add("loading-message");
    loadContainer.innerHTML = `
        <div class="loader"></div>
    `
    return loadContainer;
}

function getSessionCookie() {
    const name = "sessionToken=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}

export { 
    openHTMLNavigator, 
    createPopUp, 
    insertHeader, 
    menuToggle, 
    addToggleOptions, 
    loadLogin, 
    insertLoad,
    getSessionCookie
};