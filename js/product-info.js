function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="carousel-item">
          <img src="` + imageSrc + `" class="d-block w-100" alt=" ">
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento
document.addEventListener("DOMContentLoaded", function(e){
    var productslist

    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
          productslist = resultObj.data;
          return productslist;
      }});

    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
      //console.log(productslist)

      // Petición de variables en URL
      const infoUrl = window.location.search;
      //console.log(infoUrl);
      const urlParams = new URLSearchParams(infoUrl);
      const productName = urlParams.get('title')
      const productCost = urlParams.get('cst')
      const productDesc = urlParams.get('desc')
      const productSold = urlParams.get('sold')
      //console.log(productName);

        if (resultObj.status === "ok")
        {
            product = resultObj.data;
            let productNameNotaHTML = document.getElementById("nota");
            let productNameTitleHTML = document.getElementById("productNameTitle");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productosRelacionadosHTML = document.getElementById("relatedProducts")

            productNameNotaHTML.innerHTML = product.name;
            productNameTitleHTML.innerHTML = productName;
            productDescriptionHTML.innerHTML = productDesc;
            productCostHTML.innerHTML = product.currency + " " + productCost;
            productSoldCountHTML.innerHTML = productSold;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
 
            var productos = product.relatedProducts;
            //console.log(productos)
          
            for(let i = 0; i < productos.length; i++){
              //console.log(productslist[productos[i]].name)

              let htmlContentToAppend = "";
              htmlContentToAppend = `
                  <div class="col-lg-3 col-md-4 col-6">
                      <a href="product-info.html?title=`+ productslist[productos[i]].name +`&cst=`+ productslist[productos[i]].cost +`&desc=`+ productslist[productos[i]].description +`&sold=`+ productslist[productos[i]].soldCount +`">
                      <img class="img-fluid img-thumbnail" src="` + productslist[productos[i]].imgSrc + `" alt=""></a>
                      <small>`+ productslist[productos[i]].name +`</small><span> </span>
                      <small>`+ productslist[productos[i]].currency + productslist[productos[i]].cost +`</small>
                  </div>
              `
      
              productosRelacionadosHTML.innerHTML += htmlContentToAppend;
          }

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