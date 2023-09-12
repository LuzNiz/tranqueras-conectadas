export class Notification {
    message;
    className;
    haveButton;

    constructor(message, className, haveButton){
        this.message = message;
        this.className = className;
        this.haveButton = haveButton
    }

    createBackground() {
        const background = document.createElement('div');
        background.classList.add('background-message');

        return background;
    }

    createMessage(){
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('message-container');
        messageContainer.classList.add('box-shadow');
        messageContainer.classList.add(this.className);
        if(this.haveButton){
            messageContainer.innerHTML = `
            <p>x</p>
        `
        }
        messageContainer.innerHTML += `
            <p>${this.message}</p>
        `
        return messageContainer;
    }

    createNotification() {
        const notification = document.createElement('div');
        notification.appendChild(this.createBackground())
        notification.appendChild(this.createMessage())
        return notification;
    }
}