let url = "https://japceibal.github.io/emercado-api/products/";
let id = localStorage.getItem("id");
let producto = {};
let comentario = [];
let comment = {};

function showPageProduct(data) {
    document.getElementById("contenedor").innerHTML += `
            <br><h2>${data.name}</h2><br>
            <div>
            <div class="containerIMG">
                <div class="IMGgrande">
                    <img id="bigIMG" src="${data.images[0]}">
                </div>
                <div id="contenedorIMG">
                </div>
            </div>
            <div>
            <h4>Precio:</h4>
            <h6>${data.cost} ${data.currency}</h6><br>
            <h4>Descipcion:</h4>
            <h6>${data.description}</h6><br>
            <h4>Categoria:</h4>
            <h6>${data.category}</h6><br>
            <h4>Cantidad vendidos:</h4>
            <h6>${data.soldCount}</h6><br>
            <hr>
            </div>
            </div>
            
            
       
            
        
    `;
    data.images.forEach((element) => {
        document.getElementById("contenedorIMG").innerHTML += `
        <img class="smallIMG" src="./${element}" width=${100 / data.images.length}% >
        `;
    });
}

function showComments(data) {
    data.forEach((element) => {
        document.getElementById("comments").innerHTML += `
            <h6><b>${element.user}: </b>${element.description} - </h6>
            `;
        for (let i = 0; i < element.score; i++) {
            document.getElementById("comments").innerHTML += `
            <span class="fa fa-star checked"></span>
            `;
        }
        for (let i = 0; i < 5 - element.score; i++) {
            document.getElementById("comments").innerHTML += `
            <span class="fa fa-star"></span>
            `;
        }
        document.getElementById("comments").innerHTML += `<p class="text-muted">${element.dateTime}<p>
        <br>`;
    });
}

fetch(url.concat(localStorage.getItem("id")) + ".json")
    .then((res) => res.json())
    .then((data1) => {
        fetch(`https://japceibal.github.io/emercado-api/products_comments/${id}.json`)
            .then((res) => res.json())
            .then((data) => {
                showPageProduct(data1);
                showComments(data);
            })
            .then(() => {
                console.log(document.getElementsByClassName("smallIMG").length);
                for (let i = 0; i < document.getElementsByClassName("smallIMG").length; i++) {
                    document.getElementsByClassName("smallIMG")[i].addEventListener("click", () => {
                        document.getElementById("bigIMG").src = document.getElementsByClassName("smallIMG")[i].src;
                    });
                }
            });
        document.getElementById("commentBtn").addEventListener("click", () => {
            let score;
            for (let i = 0; i < document.getElementsByClassName("comment").length; i++) {
                if (document.getElementsByClassName("comment")[i].classList.contains("checked")) {
                    score = 5 - i;
                }
            }
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
        });
    });

/*
        document.getElementsByClassName("smallIMG").forEach(element => {
            element.addEventListener("click", () => {
                console.log("hola")
                document.getElementById("bigIMG").src = element.src;
            })
            
        });*/
