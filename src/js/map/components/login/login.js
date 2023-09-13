import { login } from "./login-logic.js";

document.addEventListener("DOMContentLoaded", () => {
    const buttonSignIn = document.getElementById('signInButton');
    const buttonLogout = document.getElementById('logoutbtn');
    const modalForm = document.getElementById('loginModal');

        buttonSignIn.addEventListener("click", () => {
            if(buttonSignIn.id === 'signInButton'){
                if(modalForm.parentNode.classList.contains("hidden")){
                    modalForm.parentNode.classList.remove("hidden");
                }
            }
        });

    document.body.querySelector('.background-message').addEventListener('click', ()=>{
        console.log('click en back')
        modalForm.parentNode.classList.add("hidden");
    });
});
