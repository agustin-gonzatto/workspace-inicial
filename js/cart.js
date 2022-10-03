let user_c = 25801;
let cost = 1;

fetch(`https://japceibal.github.io/emercado-api/user_cart/${user_c}.json`)
    .then((response) => response.json())
    .then((data) => {
        showCart(data);
        showCartLocal(JSON.parse(localStorage.getItem("comprar")))
    });

function showCart(data) {
    document.getElementById("cart").innerHTML += `
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
                <td>${data.articles[i].unitCost} ${data.articles[i].currency}</td>
                <td><input id="cont" type="number" name="number" min="1" value="${data.articles[i].count}"></td>
                <td id="cost">${data.articles[i].unitCost * data.articles[i].count} ${data.articles[i].currency}</td>
            </tr>`;
        document.getElementById("cont").addEventListener("click", () => {
            document.getElementById("cost").innerHTML = `
                ${document.getElementById("cont").value * data.articles[i].unitCost}  ${data.articles[i].currency}
            `;
        });
    }
}

function showCartLocal(data) {
    for (let i = 0; i < data.articles.length; i++) {
        document.getElementById("prods").innerHTML += `
            <tr>
                <th scope="row"><img src="${data.articles[i].image}" style="max-width:150px; min-width:100px;"></img></th>
                <td>${data.articles[i].name}</td>
                <td>${data.articles[i].unitCost} ${data.articles[i].currency}</td>
                <td><input id="cont" type="number" name="number" min="1" value="${data.articles[i].count}"></td>
                <td id="cost">${data.articles[i].unitCost * data.articles[i].count} ${data.articles[i].currency}</td>
            </tr>`;
        document.getElementById("cont").addEventListener("click", () => {
            document.getElementById("cost").innerHTML = `
                ${document.getElementById("cont").value * data.articles[i].unitCost}  ${data.articles[i].currency}
            `;
        });
    }
}