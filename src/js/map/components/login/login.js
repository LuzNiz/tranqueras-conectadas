import { SIGN_IN_STATUS } from "../../../util/dictionary.js";
import { app } from "../../../app.js";
import { login } from "./login-logic.js";
import { body } from "../../../main.js";

document.addEventListener("DOMContentLoaded", () => {
    const buttonSignIn = document.getElementById('signInButton');
    const modalForm = document.getElementById('loginModal');
    const formLogin = document.getElementById('loginForm');

    buttonSignIn.addEventListener("click", () => {
        if(buttonSignIn.textContent === SIGN_IN_STATUS.SIGN_IN ) {
            if(modalForm.parentNode.classList.contains("hidden")){
                modalForm.parentNode.classList.remove("hidden");
            }else{
                console.log(buttonSignIn);
                login.logout;
            }
        }else {
            app.changeProfile(SIGN_IN_STATUS.SIGN_IN)
        }
    });
    body.querySelector('.background-message').addEventListener('click', ()=>{
        modalForm.parentNode.classList.add("hidden");
    });
});
