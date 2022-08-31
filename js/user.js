let user = localStorage.getItem("user");
let userIMG = localStorage.getItem("userIMG");
document.addEventListener("DOMContentLoaded",()=>{
    document.getElementById("user").innerHTML+=`
    <img src="${userIMG}"  size="20" height="20" width="20" class="circle">${user}`; 
});
