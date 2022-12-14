let user_c = 25801;
let cost = 1;
let artCost = [];
let articles = [];

fetch(`${CART_INFO_URL}${user_c}.json`)
  .then((response) => response.json())
  .then((data) => {
    let cart = JSON.parse(localStorage.getItem("comprar"));
    if (cart.articles.find((arr) => arr.id === data.articles[0].id)) {
      showCart(cart.articles);
    } else {
      cart.articles = data.articles.concat(cart.articles);
      localStorage.setItem("comprar", JSON.stringify(cart));
      showCart(cart.articles);
    }
    articles = cart.articles;

    metododepago();
    validar();
  });

function showCart(data) {
  document.getElementById("cart").innerHTML = `
    <table class="table table-hover">
        <thead>
            <tr>
                <th scope="col"></th>
                <th scope="col">Nombre</th>
                <th scope="col">Costo</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Subtotal</th>
                <th scope="col"></th>
            </tr>
        </thead>
  <tbody id="prods"></tbody>`;

  for (let i = 0; i < data.length; i++) {
    document.getElementById("prods").innerHTML += `
            <tr>
                <td  scope="row"><img src="${data[i].image}" style="max-width:150px;width:100%;"></img></td>
                <td>${data[i].name}</td>
                <td>${data[i].currency} ${data[i].unitCost}</td>
                <td><input class="cont form-control" type="number" name="number" min="1" value="${
                  data[i].count
                }" required></td>
                <td class="cost" >${data[i].currency} ${data[i].unitCost * data[i].count}</td>
                <td><i role="button" id="${data[i].id}" class="fa fa-trash"></i></td>
            </tr>`;
    data[i].currency === "USD" ? artCost.push(data[i].unitCost) : artCost.push(Math.round(data[i].unitCost / 41));
    costos(artCost);
  }

  for (let i = 0; i < document.getElementsByClassName("cont").length; i++) {
    document.getElementsByClassName("cont")[i].addEventListener("click", () => {
      document.getElementsByClassName("cost")[i].innerHTML = `${data[i].currency} ${
        data[i].unitCost * document.getElementsByClassName("cont")[i].value
      } `;
      costos(artCost);
    });
  }
  document.getElementsByTagName("fieldset")[0].addEventListener("click", () => {
    costos(artCost);
  });
  remover();
}

function costos(arr) {
  let subtotal = 0;
  let envio = 0;

  //SubTotal
  for (let i = 0; i < arr.length; i++) {
    subtotal += arr[i];
  }
  document.getElementById("subtotal").innerHTML = `USD ${subtotal}`;

  //Envio
  document.querySelectorAll(".envio").forEach((element) => {
    if (element.checked) {
      envio = Math.round(subtotal * element.value);
    }
    document.getElementById("costoenvio").innerHTML = `USD ${envio}`;
  });

  //Total
  document.getElementById("ptotal").innerHTML = `USD ${subtotal + envio}`;
}

function metododepago() {
  document.querySelectorAll(".tde").forEach((element) => {
    element.addEventListener("click", () => {
      if (element.id === "tdc") {
        document.getElementById("pbanco").disabled = true;
        document.getElementById("ptarjeta").disabled = false;
        document.getElementById("formadepago").innerHTML = "Tarjeta de cr??dito";
        document.getElementById("cambiarforma").innerHTML = "Cambiar forma de pago";
      }
      if (element.id === "transbank") {
        document.getElementById("ptarjeta").disabled = true;
        document.getElementById("pbanco").disabled = false;
        document.getElementById("formadepago").innerHTML = "Transferencia bancaria";
        document.getElementById("cambiarforma").innerHTML = "Cambiar forma de pago";
      }
    });
  });
}

function validar() {
  let alertdatos = document.getElementById("faltadedatos");

  var forms = document.querySelectorAll(".needs-validation");
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
          if (!document.getElementById("tdc").checked && !document.getElementById("transbank").checked) {
            alertdatos.classList.remove("visually-hidden");
            alertdatos.classList.add("text-danger");
          } else {
            alertdatos.classList.add("visually-hidden");
          }
          if (
            document.getElementById("tdc").checked &&
            (document.getElementById("ntdc").value === "" ||
              document.getElementById("fvencimiento").value === "" ||
              document.getElementById("codigo").value === "")
          ) {
            alertdatos.classList.remove("visually-hidden");
            alertdatos.classList.add("text-danger");
          } else {
            alertdatos.classList.add("visually-hidden");
          }
          if (document.getElementById("transbank").checked && document.getElementById("ncuenta").value === "") {
            alertdatos.classList.remove("visually-hidden");
            alertdatos.classList.add("text-danger");
          } else {
            alertdatos.classList.add("visually-hidden");
          }
        } else {
          event.preventDefault();
          document.getElementById("alertcompra").classList.remove("visually-hidden");
          window.setTimeout(() => {
            document.getElementById("alertcompra").classList.add("visually-hidden");
          }, 2500);
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
}

function remover() {
  document.getElementsByTagName("table")[0].addEventListener("click", (e) => {
    if (e.target.localName === "i") {
      artCost = [];
      articles = articles.filter((art) => art.id !== e.target.id);
      showCart(articles);
      let art = JSON.parse(localStorage.getItem("comprar"));
      art.articles = articles;
      localStorage.setItem("comprar", JSON.stringify(art));
    }
  });
}
