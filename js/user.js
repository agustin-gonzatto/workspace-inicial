let user = localStorage.getItem("user");
let userIMG = localStorage.getItem("userIMG");
document.addEventListener("DOMContentLoaded",()=>{
    document.getElementById("user").innerHTML+=`
    <img class="gb_Ba gbii" src="${userIMG}">${user}`; 
});
