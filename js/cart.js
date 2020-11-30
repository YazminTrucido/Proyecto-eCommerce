//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

fetch('https://japdevdep.github.io/ecommerce-api/cart/654.json')    //TABLA 
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    productsCart = data.articles
    cantidad = 0
    var productAdd = ""
    var cart = ""
    costProductTotal = 0

    function añadir(productsCart) {

      for (let i = 0; i < productsCart.length; i++) {
        var productCart = productsCart[i]
        cantidad = productCart.count
        costProductTotal = cantidad * (productCart.unitCost)

        productAdd += `<tr>
                    <td><img style="width: 125px" src="` + productCart.src + `" alt=""></a><p>` + productCart.name + `</p></td>
                    <td>`+ productCart.currency + ` ` + productCart.unitCost + `</td>
                    <td><input type="number" id="cant" name="quantity" value="`+ cantidad + `" style="width: 20%" onclick="modificar()"></td>
                    <td><p name="sub">`+ productCart.currency + `` + costProductTotal + `</p></td></tr><br>`
      }
    }

    añadir(productsCart);

    var cart = `<table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Artículo</th>
                <th scope="col">Precio</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              `+ productAdd + `
            </tbody>
            </table>`

    document.getElementById('prod-cart').innerHTML += cart
  })


fetch('https://japdevdep.github.io/ecommerce-api/cart/654.json')    //SUBTOTAL
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // USD = 40 UYU
    // UYU = 0.025 USD
    var nuevaCant = []
    var subNueva = []
    var nuevaCant = document.getElementsByTagName('input')
    var subNueva = document.getElementsByName('sub')
    var resultado = 0

    productsCart = data.articles
    costProductTotal = 0

    for (let i = 0; i < productsCart.length; i++) {
      productCart = productsCart[i]
      moneda = productCart.currency
      cant = nuevaCant[i + 1].value
      sub = subNueva[i]

      costProductTotal = cant * (productCart.unitCost)

      if (productCart.currency === "UYU") {
        costProductTotal = (costProductTotal * 0.025)
      }

      resultado += costProductTotal
    }

    document.getElementById('sub-resultado').innerHTML = `<p>USD ` + resultado + `</p>`
  })


function modificar() {    //MODIFICA TOTAL Y SUBTOTAL
  var nuevaCant = []
  var subNueva = []
  var nuevaCant = document.getElementsByTagName('input')
  var subNueva = document.getElementsByName('sub')

  fetch('https://japdevdep.github.io/ecommerce-api/cart/654.json')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      productsCart = data.articles
      costProductTotal = 0
      mostrar = ""
      costProductSubTotal = 0
      resultado = 0

      for (let i = 0; i < productsCart.length; i++) {
        productCart = productsCart[i]
        cant = nuevaCant[i + 1].value
        sub = subNueva[i]

        costProductTotal = cant * (productCart.unitCost)

        sub.innerHTML = productCart.currency + costProductTotal
        mostrar += `<p>` + productCart.currency + costProductTotal + `</p>`
      }

      for (let i = 0; i < productsCart.length; i++) {
        productCart = productsCart[i]
        moneda = productCart.currency
        cant = nuevaCant[i + 1].value
        sub = subNueva[i]

        costProductSubTotal = cant * (productCart.unitCost)

        if (productCart.currency === "UYU") {
          costProductSubTotal = (costProductSubTotal * 0.025)
        }

        resultado += costProductSubTotal
      }

      document.getElementById('sub-resultado').innerHTML = `<p>USD ` + resultado + `</p>`
    })
}

function convertirUSD() {
  // USD = 40 UYU
  // UYU = 0.025 USD
  var nuevaCant = []
  var subNueva = []
  var nuevaCant = document.getElementsByTagName('input')
  var subNueva = document.getElementsByName('sub')
  var resultado = 0

  fetch('https://japdevdep.github.io/ecommerce-api/cart/654.json')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      productsCart = data.articles
      costProductTotal = 0
      resultado = 0

      for (let i = 0; i < productsCart.length; i++) {
        productCart = productsCart[i]
        moneda = productCart.currency
        cant = nuevaCant[i + 1].value
        sub = subNueva[i]

        costProductTotal = cant * (productCart.unitCost)

        if (productCart.currency === "UYU") {
          costProductTotal = (costProductTotal * 0.025)
        }

        resultado += costProductTotal
      }

      document.getElementById('sub-resultado').innerHTML = `<p>USD ` + resultado + `</p>`
    })
}

function convertirUYU() {
  // USD = 40 UYU
  // UYU = 0.025 USD
  var nuevaCant = []
  var subNueva = []
  var nuevaCant = document.getElementsByTagName('input')
  var subNueva = document.getElementsByName('sub')
  var resultado = 0

  fetch('https://japdevdep.github.io/ecommerce-api/cart/654.json')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      productsCart = data.articles
      costProductTotal = 0
      resultado = 0

      for (let i = 0; i < productsCart.length; i++) {
        productCart = productsCart[i]
        moneda = productCart.currency
        cant = nuevaCant[i + 1].value
        sub = subNueva[i]

        costProductTotal = cant * (productCart.unitCost)

        if (productCart.currency === "USD") {
          costProductTotal = (costProductTotal * 40)
        }

        resultado += costProductTotal
      }

      document.getElementById('sub-resultado').innerHTML = `<p>UYU ` + resultado + `</p>`
    })
}