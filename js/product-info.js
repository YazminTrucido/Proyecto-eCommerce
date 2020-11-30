function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento
document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productNameTitleHTML = document.getElementById("productNameTitle");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productCategoryHTML = document.getElementById("productCategory");
            
            productNameHTML.innerHTML = product.name;
            productNameTitleHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.currency + " " + product.cost;
            productSoldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    });

});

// Caja de comentarios
function estrellas(rate) {
  let contenido = ""
  for(let i=0; i<rate.score; i++) {
    //console.log(rate.score)
    contenido += `<span class= "fa fa-star checked"></span>`
  }
  return contenido;
}

function comentarios(texto) {
  let contenido = ""
  for(let i=0; i<texto.length; i++) {
    let comentarios = texto[i];

    contenido +=  `   
    <br>
    <div>
         <strong>Puntuación: ` + estrellas(comentarios) + `</strong>
         <br>
         <small class="text-muted" style="float:right">` + comentarios.dateTime + `</small>
         <small>` + comentarios.user + `</small>
         <br><br>
         <p>` + comentarios.description + `</p>
    </div>  `

    document.getElementById("comm-list-container").innerHTML = contenido;
  }
}

document.addEventListener("DOMContentLoaded", function(e){
  fetch(PRODUCT_INFO_COMMENTS_URL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) { 
        //console.log(data)
        comentarios(data);
        estrellas(data);
      });
});