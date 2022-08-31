let user = localStorage.getItem("user")
document.addEventListener("DOMContentLoaded",()=>{
    document.getElementById("user").innerHTML+=`
${user}`; 
});
