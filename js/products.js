function cargarjson(){
    fetch ("https://japceibal.github.io/emercado-api/cats_products/101.json")
        .then (res => res.json())
        .then (data =>{
            console.log(data);
            for (let i = 0; i < data.products.length; i++) {
                document.getElementById("product-c").innerHTML +=`
                <div class="list-group-item list-group-item-action cursor-active ">
                    <div class="row">
                        <div class ="col-3">
                            <img src ="${data.products[i].image}" alt="${data.products[i].description}" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4>${data.products[i].name} - ${data.products[i].currency} ${data.products[i].cost}</h4> 
                                <small class="text-muted">${data.products[i].soldCount} vendidos</small>
                            </div>
                            <p class ="mb-1">${data.products[i].description}</p>
                        </div>
                    </div>        
                </div>
                    `
                
            }
        })
}
cargarjson();