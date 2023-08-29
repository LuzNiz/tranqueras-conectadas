'use strict';
// $.getJSON("../../../../../data/instructions.json", (data)=>{
//     console.log(data);
//     data.instructions.forEach(elem =>{
//         console.log(elem);
//     })
//     body.appendChild(insertInstructions(data))
// })

// function insertInstructions(data){
//     const div = document.createElement('div');
//     data.instructions.forEach(elem =>{
//         div.innerHTML = `
//         <img src=${elem.img}/>`
//     })
//     return div;
// }

// const body = document.querySelector('body');


function logItem(e) {
    const item = e.currentTarget.closest('li').querySelector('.collapse-content');
    item.classList.toggle("hidden");
}
const collapseButton = document.querySelectorAll('.collapse-button');

collapseButton.forEach((item)=>{
    item.addEventListener('click', logItem);
})
