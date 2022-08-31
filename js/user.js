let user = localStorage.getItem("user");
let userIMG = localStorage.getItem("userIMG");

document.addEventListener("DOMContentLoaded", () => {
    if (userIMG != null) {
        document.getElementById("user").innerHTML += `
        <img src="${userIMG}">${user}`;
    } else {
        document.getElementById("user").innerHTML += `
        ${user}`;
    }
});
