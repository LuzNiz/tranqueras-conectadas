import { Notification } from "../../../../models/Notifications.js";
import { app } from "../../../app.js";
import { mapDiv, body } from "../../../main.js";
import { USER_STATES, MESSAGES_TYPES, CLASS_NAME_TYPES, SIGN_IN_STATUS } from "../../../util/dictionary.js";

export const login = {
    res: {},

    _ajax: function (data, callback) {

        let xhr = new XMLHttpRequest();
        let res = {};
        xhr.onreadystatechange = function () {
            res = { response: xhr.response, status: xhr.status };
            if (xhr.readyState === XMLHttpRequest.DONE) {
                let status = xhr.status;
                if (status >= 200 && status < 400) {
                    callback ? callback(res) : res;
                } else {
                    console.log(`Ajax request returned error: ${xhr.response}`);
                }
            }
        }

        xhr.open(data.method, data.url, true);
        if (data.method == 'PUT' ) { 
            let credentials = btoa(data.usr + ":" + data.pwd);
            xhr.withCredentials = true;
            xhr.setRequestHeader('Authorization', `Basic ${credentials}`);
        }
        xhr.setRequestHeader(data.reqHeader.key, data.reqHeader.val);
        xhr.send(data.params);

    },

    _append: async function (file, format, parent) {
        // file must match '/path/to/file.extension'
        let parentElement = null;
        let path = window.location.pathname;

        parentElement = parent == 'body' ? document.body : document.getElementById(parent);

        let element = document.createElement("div");
    
        const elementContent = await fetch(window.location.origin + path.replace('index.html', '') + file)
        .then(res => {
            return res.text();
        });

        element.innerHTML = elementContent;
        parentElement.appendChild(element);
    },

    _listeners: function () {
        // Obtén el formulario por su ID
        const loginForm = document.getElementById("loginForm");
        // Asigna la función submit al evento submit del formulario
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            console.log('cargando funcion _geoserver');
            login._geoserver(loginForm.name.value, loginForm.pwd.value);
        });
    },

    load: async function () {
        login._listeners();
    },

    submit: function (event) {
        event.preventDefault();
        body.appendChild.insertLoad();
        console.log('cargando funcion _geoserver')
        login._geoserver(loginForm.name.value, loginForm.pwd.value);
    },

    resetPwd: function (event) {
        event.preventDefault();
        let nPwd = document.createElement("input");
        nPwd.id = "newPwd";
        nPwd.classList.add("form-control");
        nPwd.type = "password";
        nPwd.placeholder = "Nueva contraseña";
        nPwd.required = "true";

        if (!loginForm.newPwd) {
            loginForm.insertBefore(nPwd, loginForm.submit);
        }

        if (login.server == undefined) {
            login.server = window.location.origin;
        }

        let resetOptions = {
            name: loginForm.name.value,
            pwd: loginForm.pwd.value,
            host: login.server,
            newPwd: loginForm.newPwd.value
        }, r = resetOptions;
        if (r.name !== "" && r.pwd !== "" && r.newPwd !== "") {
            login._gsResetPwd(resetOptions);
        }
    },

    _gsResetPwd: function (o) {
        let params = `{ "newPassword": "${o.newPwd}" }`,
            gsHost = o.host,
            gsUrl = gsHost + '/geoserver/rest/security/self/password',
            _usr = o.name,
            _pwd = o.pwd,
            data = {
                params: params,
                url: gsUrl,
                method: 'PUT',
                usr: _usr,
                pwd: _pwd,
                reqHeader: {
                    key: 'Content-type',
                    val: 'application/json'
                }
            };
        login._ajax(data, (res) => {
            console.info(`Server response: ${res.response}, Status: ${res.status}`);
            $('#loginModal').modal('hide');
        });
    },


    _geoserver: function (name, pwd) {
        let usrPwd = `username=${name}&password=${pwd}`,
            gsUrl = `https://mapas.lasflores.net.ar/geoserver/j_spring_security_check`,
            data = {
                params: usrPwd,
                url: gsUrl,
                method: 'POST',
                reqHeader: {
                    key: 'Content-type',
                    val: 'application/x-www-form-urlencoded'
                }
            };
        login._ajax(data, (res) => {
            console.info(`Response status ${res.status}`);
        if (res.status === 200) {
            const responseText = res.response;
            if (responseText.includes('error=true')) {
                const notification = new Notification(MESSAGES_TYPES.INCORRECT_LOGIN, CLASS_NAME_TYPES.REJECTED )
                mapDiv.insertAdjacentElement('afterEnd', notification.createNotification());
                setTimeout(()=> {
                    window.location.href = "../../../../../index.html"
                }, 1500);
            } else {
                const notification = new Notification(MESSAGES_TYPES.CORRECT_LOGIN, CLASS_NAME_TYPES.SUCESS )
                mapDiv.insertAdjacentElement('afterEnd', notification.createNotification());
                const modalContainer = document.getElementById('loginModal').parentNode;
                modalContainer.classList.add('hidden');

                const button = document.getElementById('signInButton');
                button.id = 'logoutbtn';
                button.textContent = SIGN_IN_STATUS.SIGN_UP;
                app.changeProfile(USER_STATES.IS_LOGGED);
            }
            loginForm.name.value = '';
            loginForm.pwd.value = '';
        }   
        });
    },


    logout: function () {
        let gsUrl = 'https://mapas.lasflores.net.ar/geoserver/j_spring_security_logout',
            data = {
                params: "",
                url: gsUrl,
                method: 'POST',
                reqHeader: {
                    key: 'Content-type',
                    val: 'application/x-www-form-urlencoded'
                }
            };
        login._ajax(data, (res) => {
            const notification = new Notification(MESSAGES_TYPES.CORRECT_SING_UP, CLASS_NAME_TYPES.SUCESS);
            mapDiv.insertAdjacentElement('afterEnd', notification.createNotification());
            const buttonSingIn = document.getElementById('logoutbtn');
            buttonSingIn.textContent = SIGN_IN_STATUS.SIGN_IN;
            buttonSingIn.id = 'signInButton';
            app.changeProfile(USER_STATES.IS_NOT_LOGGED);
        });
    }
}
