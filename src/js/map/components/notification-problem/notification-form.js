"use strict";
import { CLASS_NAME_TYPES, MESSAGES_TYPES } from "../../../util/dictionary.js";
import { Notification } from "../../../../models/Notifications.js";

const form = document.getElementById('sheetdb-form');
const loadingMessage = document.querySelector('.loading-message');
const fechaHoraInput = document.querySelector('input[name="data[fecha_hora]"]');

form.addEventListener("submit", (e) => {
    e.preventDefault();
    loadingMessage.classList.remove(CLASS_NAME_TYPES.HIDDEN);
    const currentDateTime = new Date().toLocaleString();
    fechaHoraInput.value = currentDateTime;
    const formData = new FormData(form);
    
    fetch(form.action, {
        method: "POST",
        body: formData,
    })
    .then(response => {
        loadingMessage.classList.add(CLASS_NAME_TYPES.HIDDEN);
        if (response.ok) {
            form.reset();
            const message = new Notification(MESSAGES_TYPES.MESSAGE_SENT, CLASS_NAME_TYPES.SUCESS);
            document.body.appendChild(message.createNotification());
            // setTimeout(()=> {
            //     window.location.href = "../../../../../index.html"
            // }, 1500);
        } else {
            const message = new Notification(MESSAGES_TYPES.MESSAJE_REJECTED, CLASS_NAME_TYPES.REJECTED);
            document.body.appendChild(message.createNotification());
            throw new Error('Error en la solicitud.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

form.addEventListener("reset", (e)=>{
    form.reset();
    setTimeout(()=> {
        window.location.href = "../../../../../index.html"
    }, 1500);
})