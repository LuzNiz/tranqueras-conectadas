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
    formLogin.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log('Se ha apretado el botón enviar');
      
        // Obtener valores del formulario correctamente usando loginForm.elements
        const username = formLogin.name.value;
        const password = formLogin.pwd.value;
        const cameFrom = 'http://127.0.0.1:5500/index.html'; // Reemplaza con el valor que necesitas
        console.log("username=" + username + "&password=" + password + "&came_from=" + cameFrom);
      
        const formData = new URLSearchParams();
        formData.append('j_username', username);
        formData.append('j_password', password);
        formData.append('came_from', cameFrom);
      
        const requestOptions = {
          method: 'POST',
          body: formData.toString(),
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          }
        };
      
        fetch(formLogin.action, requestOptions)
          .then(res => {
            if (res.ok) {
              // Autenticación exitosa, manejar el resultado aquí
            } else {
              formLogin.reset();
              modalForm.classList.add("hidden");
            }
          });
      });
      
//     formLogin.addEventListener("submit", (e) => {
//         e.preventDefault();
//         console.log('Se ha apretado el botón enviar');
        
//         // Obtener valores del formulario correctamente usando loginForm.elements
//         const username = formLogin.name.value;
//         const password = formLogin.pwd.value;
//         console.log("username=" + username + "&password=" + password);
//         const requestData = {
//             "params": "username=" + username + "&password=" + password,
//             "reqHeader": {
//                 "key": "Content-type",
//                 "val": "application/x-www-form-urlencoded"
//             },

//         };

//         const requestOptions = {
//             method: 'POST',
//             body: JSON.stringify(requestData),
//             headers: {
//                 "Content-type": "application/json" // Usar application/json ya que estamos enviando JSON en el cuerpo
//             }
//         };

//         fetch(formLogin.action, requestOptions)
//         .then(res => {
//             if(res.ok){


//             }else {
//                 formLogin.reset();
//                 modalForm.classList.add("hidden");
//             }
//         });
//     });
});
