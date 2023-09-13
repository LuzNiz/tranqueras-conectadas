import { SIGN_IN_STATUS } from "../../../util/dictionary.js";
import { app } from "../../../app.js";

document.addEventListener("DOMContentLoaded", () => {
    const buttonSignIn = document.getElementById('signInButton');
    const modalForm = document.getElementById('loginModal');
    const formLogin = document.getElementById('loginForm');

    buttonSignIn.addEventListener("click", () => {
        if(buttonSignIn.textContent === SIGN_IN_STATUS.SIGN_IN ) {
            if(modalForm.classList.contains("hidden")){
                modalForm.classList.remove("hidden");
            }else{
                modalForm.classList.add("hidden");
            }
        }else {
            app.changeProfile(SIGN_IN_STATUS.SIGN_IN)
        }
    });
    
});
