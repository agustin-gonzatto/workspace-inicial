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
  if (!user) {
    location.href = "index.html";
  }
});

function cerrarSesion() {
  localStorage.removeItem("user");
}
