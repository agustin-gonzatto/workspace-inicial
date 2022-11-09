let id = localStorage.getItem("id");
let producto = {};
let comentario = [];
let comment = {};
let comprar = {
  user: localStorage.getItem("user"),
  articles: [{}],
};

function showPageProduct(data) {
  document.getElementById("contenedor").innerHTML += `
        <br />
        <div style="display:flex;justify-content:space-between ;">
            <h2>${data.name}</h2><button class="btn btn-primary" id="comprar">Comprar</button>
            
        </div>
        <div>
            <div class="containerIMG">
                <div class="IMGgrande carousel slide">
                    <img id="bigIMG" src="${data.images[0]}" />
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
                <div id="contenedorIMG"></div>
            </div>
            <div>
                <h4>Precio:</h4>
                <h6>${data.cost} ${data.currency}</h6>
                <br />
                <h4>Descipcion:</h4>
                <h6>${data.description}</h6>
                <br />
                <h4>Categoria:</h4>
                <h6>${data.category}</h6>
                <br />
                <h4>Cantidad vendidos:</h4>
                <h6>${data.soldCount}</h6>
                <br />
                <hr />
            </div>
        </div> `;
  data.images.forEach((element) => {
    document.getElementById("contenedorIMG").innerHTML += `
        <img class="smallIMG" src="./${element}" width=100% >`;
  });
}

function showComments(data) {
  data.forEach((element) => {
    document.getElementById("comments").innerHTML += `
            <h6><b>${element.user}: </b>${element.description} - </h6> `;
    for (let i = 0; i < element.score; i++) {
      document.getElementById("comments").innerHTML += `
            <span class="fa fa-star checked"></span>`;
    }
    for (let i = 0; i < 5 - element.score; i++) {
      document.getElementById("comments").innerHTML += `
            <span class="fa fa-star"></span>`;
    }
    document.getElementById("comments").innerHTML += `
        <p class="text-muted">${element.dateTime}<p>
        <br>`;
  });
}

//Solicito los Json del producto y comentarios, los muestro y agrego escuchas.

fetch(PRODUCT_INFO_URL.concat(localStorage.getItem("id")) + ".json")
  .then((res) => res.json())
  .then((data1) => {
    fetch(`${PRODUCT_INFO_COMMENTS_URL}${id}.json`)
      .then((res) => res.json())
      .then((data) => {
        showPageProduct(data1);
        showComments(data);
        //Al pasar sobre la imagen
        for (let i = 0; i < document.getElementsByClassName("smallIMG").length; i++) {
          document.getElementsByClassName("smallIMG")[i].addEventListener("mouseover", () => {
            document.getElementById("bigIMG").src = document.getElementsByClassName("smallIMG")[i].src;
          });
        }

        //Carrusel
        document.getElementsByClassName("carousel-control-prev")[0].addEventListener("click", () => {
          let index = document.getElementById("bigIMG").src.split("_")[1];
          let i = parseInt(index.substring(0, index.length - 4));
          if (i > 1) {
            document.getElementById("bigIMG").src = document.getElementsByClassName("smallIMG")[i - 2].src;
          } else {
            document.getElementById("bigIMG").src =
              document.getElementsByClassName("smallIMG")[data1.images.length - 1].src;
          }
        });
        document.getElementsByClassName("carousel-control-next")[0].addEventListener("click", () => {
          let index = document.getElementById("bigIMG").src.split("_")[1];
          let i = parseInt(index.substring(0, index.length - 4));
          if (i < data1.images.length) {
            document.getElementById("bigIMG").src = document.getElementsByClassName("smallIMG")[i].src;
          } else {
            document.getElementById("bigIMG").src = document.getElementsByClassName("smallIMG")[0].src;
          }
        });

        //Al presionar estrella
        for (let i = 0; i < document.getElementsByClassName("comment").length; i++) {
          document.getElementsByClassName("comment")[i].addEventListener("click", () => {
            let j = 0;
            for (let i = 0; i < document.getElementsByClassName("comment").length; i++) {
              document.getElementsByClassName("comment")[i].classList.remove("checked");
            }
            document.getElementsByClassName("comment")[i].classList.add("checked");
            j = i;
            for (let i = 4; i > j; i--) {
              document.getElementsByClassName("comment")[i].className += " checked";
            }
          });
        }

        //Al presionar enviar
        document.getElementById("commentBtn").addEventListener("click", () => {
          if (
            document.getElementsByClassName("comment checked").length == 0 ||
            document.getElementById("comment").value == ""
          ) {
            alert("Comentario incompleto");
          } else {
            let score = document.getElementsByClassName("comment checked").length;
            let fecha = new Date();
            comment = {
              user: localStorage.getItem("user"),
              description: document.getElementById("comment").value,
              dateTime: fecha.toLocaleString("sv-SE"),
              score: score,
            };
            comentario.push(comment);
            showComments(comentario);
            comentario = [];
            for (let i = 0; i < document.getElementsByClassName("comment").length; i++) {
              if (document.getElementsByClassName("comment")[i].classList.contains("checked")) {
                document.getElementsByClassName("comment")[i].classList.remove("checked");
              }
            }
            document.getElementById("comment").value = "";
            score = 0;
          }
        });

        //Recomendados
        data1.relatedProducts.forEach((element) => {
          document.getElementById("recomendados").innerHTML += `
                     <div class="card card-click col-sm-3" style="cursor:pointer;">
                        <img src="${element.image}" alt="" class="card-img-top" style="; width: 100%;">
                    <div class="card-body">
                    <h6 class="card-text">${element.name}</h6>
                    </div>
                    </div>
                    `;
        });

        //Guardar y redireccinar
        for (let i = 0; i < document.getElementsByClassName("card-click").length; i++) {
          document.getElementsByClassName("card-click")[i].addEventListener("click", () => {
            localStorage.setItem("id", data1.relatedProducts[i].id);
            window.location.href = "./product-info.html";
          });
        }

        //Comprar
        document.getElementById("comprar").addEventListener("click", () => {
          if (
            JSON.parse(localStorage.getItem("comprar")).articles.find(
              (element) => element.id == localStorage.getItem("id")
            ) == null
          ) {
            let comprar = JSON.parse(localStorage.getItem("comprar"));
            comprar.articles.push({
              id: localStorage.getItem("id"),
              name: data1.name,
              count: 1,
              unitCost: data1.cost,
              currency: data1.currency,
              image: data1.images[0],
            });
            localStorage.setItem("comprar", JSON.stringify(comprar));
          } else {
            alert("Ya ingreso este producto al carrito");
          }
        });
      });
  });
