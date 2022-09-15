let url = "https://japceibal.github.io/emercado-api/cats_products/";
const DOWN = "down";
const UP = "up";
const RATING = "rating";
let minCost = undefined;
let maxCost = undefined;
let productos = document.getElementsByClassName("list-group-item");

fetch(url.concat(localStorage.getItem("catID")) + ".json")
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        localStorage.setItem("json", JSON.stringify(data));
        document.getElementById("title").innerHTML += `
        <h2>Productos</h2>
        <p class="lead">Verás aquí todos los productos de la categoría ${data.catName}</p>      
        `;
        showPage(data.products);
        document.getElementById("sortDown").addEventListener("click", () => {
            showPage(sortCategories(DOWN, data.products));
        });
        document.getElementById("sortUp").addEventListener("click", () => {
            showPage(sortCategories(UP, data.products));
        });
        document.getElementById("rating").addEventListener("click", () => {
            showPage(sortCategories(RATING, data.products));
        });

        document.getElementById("rangeFilterCostProducts").addEventListener("click", function () {
            //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
            //de productos por categoría.
            minCost = document.getElementById("rangeFilterCostMin").value;
            maxCost = document.getElementById("rangeFilterCostMax").value;

            if (minCost != undefined && minCost != "" && parseInt(minCost) >= 0) {
                minCost = parseInt(minCost);
            } else {
                minCost = undefined;
            }

            if (maxCost != undefined && maxCost != "" && parseInt(maxCost) >= 0) {
                maxCost = parseInt(maxCost);
            } else {
                maxCost = undefined;
            }

            showPage(data.products);
        });
        document.getElementById("clearCostFilter").addEventListener("click", () => {
            maxCost = undefined;
            minCost = undefined;
            document.getElementById("rangeFilterCostMax").value = "";
            document.getElementById("rangeFilterCostMin").value = "";
            showPage(data.products);
        });

        document.addEventListener("keyup", (e) => {
            if (e.target.matches("#search")) {
                for (let i = 0; i < data.products.length; i++) {
                    const element = data.products[i];
                    var products = data.products.filter(
                        (element) => element.name.toLowerCase().includes(e.target.value.toLowerCase()) | element.description.toLowerCase().includes(e.target.value.toLowerCase())
                    );
                }
                showPage(products);
            }
        });

        //Guardar id clickeado y redireccionar
        for (let i = 0; i < productos.length; i++) {
            productos[i].addEventListener("click", () => {
                localStorage.setItem("id", data.products[i].id);
                window.location.href = "./product-info.html";
            });
        }
    });

function showPage(data) {
    document.getElementById("product-c").innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        if ((minCost == undefined || (minCost != undefined && parseInt(data[i].cost) >= minCost)) && (maxCost == undefined || (maxCost != undefined && parseInt(data[i].cost) <= maxCost))) {
            document.getElementById("product-c").innerHTML += `
        <div class="list-group-item list-group-item-action cursor-active ">
            <div class="row">
                <div class ="col-3">
                    <img src ="${data[i].image}" alt="${data[i].description}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4>${data[i].name} - ${data[i].currency} ${data[i].cost}</h4> 
                                <small class="text-muted">${data[i].soldCount} vendidos</small>
                            </div>
                            <p class ="mb-1">${data[i].description}</p>
                        </div>
                    </div>        
                </div>
                `;
        }
    }
}

function sortCategories(criteria, array) {
    let result = [];

    if (criteria === UP) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);
            if (aCount > bCount) {
                return -1;
            }
            if (aCount < bCount) {
                return 1;
            }
            return 0;
        });
    } else if (criteria === DOWN) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);
            if (aCount < bCount) {
                return -1;
            }
            if (aCount > bCount) {
                return 1;
            }
            return 0;
        });
    } else if (criteria === RATING) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);
            if (aCount > bCount) {
                return -1;
            }
            if (aCount < bCount) {
                return 1;
            }
            return 0;
        });
    }
    return result;
}
