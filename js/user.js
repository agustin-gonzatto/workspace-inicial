let user = localStorage.getItem("user");
let userIMG = localStorage.getItem("userIMG");

document.addEventListener("DOMContentLoaded", () => {
    if (userIMG != null) {
        document.getElementById("user").innerHTML += `
        <img src="${userIMG}"  size="20" height="20" width="20"> ${user}
`;
    } else {
        document.getElementById("user").innerHTML += `
        ${user}
    `;
    }
});

function cerrarSesion() {
    localStorage.removeItem("user");
    localStorage.removeItem("userIMG");
}
