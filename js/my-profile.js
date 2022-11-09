let nombre = document.getElementById("pnombre");
let nombre2 = document.getElementById("p2nombre");
let apellido = document.getElementById("papellido");
let apellido2 = document.getElementById("p2apellido");
let tel = document.getElementById("ptel");
let pIMG = document.getElementById("pIMG");
let email = document.getElementById("pemail");

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("User")) {
    completar();
    validarP();
    console.log("A")
  } else {
    pIMG.src = "./img/img_perfil.png";
    validarP();
  }
});

function validarP() {
  var forms = document.querySelectorAll(".needs-validation");
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          guardarP();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
}

function completar() {
  email.value = localStorage.getItem("user");
  let user = JSON.parse(localStorage.getItem("User"));
  console.log(user.email === localStorage.getItem("user"));
  if (user.email === localStorage.getItem("user")) {
    nombre.value = `${user.nombre}`;
    nombre2.value = `${user.nombre2}`;
    apellido.value = `${user.apellido}`;
    apellido2.value = `${user.apellido2}`;
    tel.value = `${user.tel}`;
    email.value = `${user.email}`;
    user.img != "" ? (pIMG.src = user.img) : (pIMG.src = "./img/img_perfil.png");
  }
}

function guardarP() {
  let img = document.getElementById("pimg");
  console.log(img.files.length)
  if (img.files.length > 0){
  var reader = new FileReader();
  reader.readAsDataURL(img.files[0]);
  reader.onload = function () {
    let user = {
      nombre: nombre.value,
      nombre2: nombre2.value,
      apellido: apellido.value,
      apellido2: apellido2.value,
      email: email.value,
      img: reader.result,
      tel: tel.value,
    };
    localStorage.setItem("User", JSON.stringify(user));
  };    
  }else{
    let user = {
      nombre: nombre.value,
      nombre2: nombre2.value,
      apellido: apellido.value,
      apellido2: apellido2.value,
      email: email.value,
      img: "",
      tel: tel.value,
    };
    localStorage.setItem("User", JSON.stringify(user));
  }
}
