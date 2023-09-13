import { login } from "./login-logic.js";

document.addEventListener("DOMContentLoaded", () => {

    const modalForm = document.getElementById('loginModal');

    document.body.querySelector('.background-message').addEventListener('click', ()=>{
        console.log('click en back')
        modalForm.parentNode.classList.add("hidden");
    });
});
