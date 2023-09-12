export class Notification {
    message;
    className;
    haveButton;

    constructor(message, className, haveButton){
        this.message = message;
        this.className = className;
        this.haveButton = haveButton
    }

    addEvenListener() {
        document.body.addEventListener("click", (e)=>{
        const element = e.target;
        console.log(notificationContainer);
        if(element.id === 'close-btn'){
            const notificationContainer = body.querySelector('.background-message');
            document.body.removeChild(notificationContainer);
        }
        })
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
            <p id="close-btn">x</p>
        `
        }
        messageContainer.innerHTML += `
            <p>${this.message}</p>
        `
        return messageContainer;
    }

    createNotification() {
        const notification = document.createElement('div');
        notification.appendChild(this.createBackground());
        notification.appendChild(this.createMessage());
        this.addEvenListener();
        return notification;
    }
}