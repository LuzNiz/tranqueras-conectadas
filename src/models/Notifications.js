import { createBackground } from "../js/util/createElements.js";

export class Notification {
    message;
    className;

    constructor(message, className, haveButton){
        this.message = message;
        this.className = className;
        this.haveButton = haveButton
    }

    addEvenListener() {
        document.body.addEventListener("click", (e)=>{
        const element = e.target;
        if(element.id === 'close-btn'){
            const notificationContainer = document.getElementById('notification-container');
            if(notificationContainer){
                console.log('hizo click en el boton close');
                document.body.removeChild(notificationContainer);
            }
        }
        })
    }
    
    createMessage(){
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('message-container','box-shadow');
        messageContainer.classList.add(this.className);
        messageContainer.innerHTML = `
        <p id="close-btn">x</p>
        `
        messageContainer.innerHTML += `
            <p>${this.message}</p>
        `
        return messageContainer;
    }

    createNotification() {
        const notification = document.createElement('div');
        notification.id = 'notification-container'
        notification.appendChild(createBackground());
        notification.appendChild(this.createMessage());
        this.addEvenListener();
        return notification;
    }
}