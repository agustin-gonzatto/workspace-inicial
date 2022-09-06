let url = "https://japceibal.github.io/emercado-api/products/";
let id = localStorage.getItem("id");
let producto = {};

function showPageProduct(data) {
    document.getElementById("contenedor").innerHTML += `
        <div>
            <h2>${data.name}</h2><br>
            <h4>Precio:</h4>
            <h6>${data.cost} ${data.currency}</h6><br>
            <h4>Descipcion:</h4>
            <h6>${data.description}</h6><br>
            <h4>Categoria:</h4>
            <h6>${data.category}</h6><br>
            <h4>Cantidad vendidos:</h4>
            <h6>${data.soldCount}</h6><br>
            <h4>Imagenes ilustrativas</h4>
        </div>
        <div id="contenedorIMG">
        </div>
        <div id="comentarios">
        </div>
    `;
    data.images.forEach(element => {
        document.getElementById("contenedorIMG").innerHTML += `
        <img src="./${element}" width=${100/data.images.length}%>
        `
    });
};

function showComments(data) {
    document.getElementById("comentarios").innerHTML += `
        <div>
            <h4>Comentarios:</h4>
        </div>
        <div id="comments"></div>
        `;
    data.forEach(element => {
        document.getElementById("comments").innerHTML += `
            <h6><b>${element.user}: </b>${element.description} - ${element.dateTime}</h6>
            <p>Puntuacion:  ${element.score}/5 </p>
            <br>
            `;
    });
        
    

};

fetch(url.concat(localStorage.getItem("id")) + ".json")
    .then((res) => res.json())
    .then((data) => {
        showPageProduct(data);
    });

fetch(`https://japceibal.github.io/emercado-api/products_comments/${id}.json`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        showComments(data); 
    });