let user_c = 25801;
let cost = 1;

fetch(`https://japceibal.github.io/emercado-api/user_cart/${user_c}.json`)
  .then((response) => response.json())
  .then((data) => {
    data.articles = data.articles.concat(JSON.parse(localStorage.getItem("comprar")).articles);
    showCart(data);
    metododepago();
    validar();
  });

function showCart(data) {
  document.getElementById("cart").innerHTML = `
    <table class="table">
        <thead>
            <tr>
                <th scope="col"></th>
                <th scope="col">Nombre</th>
                <th scope="col">Costo</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Subtotal</th>
            </tr>
        </thead>
  <tbody id="prods"></tbody>`;

  for (let i = 0; i < data.articles.length; i++) {
    document.getElementById("prods").innerHTML += `
            <tr>
                <th scope="row"><img src="${data.articles[i].image}" style="max-width:150px; min-width:100px;"></img></th>
                <td>${data.articles[i].name}</td>
                <td>${data.articles[i].currency} ${data.articles[i].unitCost}</td>
                <td><input class="cont" type="number" name="number" min="1" value="${data.articles[i].count}"></td>
                <td class="cost" >${data.articles[i].currency} ${data.articles[i].unitCost * data.articles[i].count}</td>
            </tr>`;
    costos(document.querySelectorAll(".cost"));
  }

  for (let i = 0; i < document.getElementsByClassName("cont").length; i++) {
    document.getElementsByClassName("cont")[i].addEventListener("click", () => {
      document.getElementsByClassName("cost")[i].innerHTML = `${data.articles[i].currency} ${data.articles[i].unitCost * document.getElementsByClassName("cont")[i].value} `;
      costos(document.querySelectorAll(".cost"));
    });
  }
  document.getElementsByTagName("fieldset")[0].addEventListener("click", () => {
    costos(document.querySelectorAll(".cost"));
  });
}

function costos(arr) {
  let subtotal = 0;
  let envio = 0;

  //SubTotal
  for (let i = 0; i < arr.length; i++) {
    subtotal += parseInt(arr[i].textContent.match(/(\d+)/g)[0]);
    document.getElementById("subtotal").innerHTML = `USD ${subtotal}`;
  }

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
        document.getElementById("formadepago").innerHTML = "Tarjeta de crédito";
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
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll(".needs-validation");

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add("was-validated");
        },
        false
      );
    });
}
