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


fetch('https://japdevdep.github.io/ecommerce-api/cart/654.json')    //SUBTOTAL (TOTAL INICIAL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    USD = 40 //UYU
    UYU = 0.025 //USD
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

      if (productCart.currency === "USD") {
        costProductTotal = (costProductTotal * USD)
      }

      resultado += costProductTotal
    }

    document.getElementById('sub-resultado').innerHTML = `<p>UYU ` + resultado + `</p>`
    document.getElementById('total-resultado').innerHTML = `<p>UYU ` + resultado + `</p>`
  })


function modificar() {    //MODIFICA SUBTOTAL, PRECIO ENVÍO Y TOTAL
  var nuevaCant = []
  var subNueva = []
  var nuevaCant = document.getElementsByTagName('input')
  var subNueva = document.getElementsByName('sub')
  var envio = document.getElementsByName('tipoEnvio')
  sessionStorage.setItem("pago", false);    //CADA MODIFICACIÓN EQ A NUEVO PEDIDO

  document.getElementById('confirm').innerHTML = ``
  document.getElementById('alert').innerHTML = ``

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

        if (productCart.currency === "USD") {
          costProductSubTotal = (costProductSubTotal * 40)
        }

        resultado += costProductSubTotal
      }

      document.getElementById('sub-resultado').innerHTML = `<p>UYU ` + resultado + `</p>`   // SUBTOTAL
      document.getElementById('total-resultado').innerHTML = `<p>UYU ` + resultado + `</p>`   // TOTAL INICIAL

      for (let i = 0; i < envio.length; i++) {  // PRECIO ENVÍO Y TOTAL
        var tipo = envio[i];
        var valor = tipo.value / 100
        var precio = resultado * valor
        var total = resultado + precio

        if (tipo.checked === true) {
          document.getElementById('envio-resultado').innerHTML = `<p>UYU ` + precio + `</p>`
          document.getElementById('total-resultado').innerHTML = `<p>UYU ` + total + `</p>`
        }

      }
    })
}


function formaTarjeta() {
  document.getElementById("tarjeta").innerHTML = `<div class="form-group col-md-6">
  <input type="text" name="nombreTitular" placeholder="Nombre del titular" class="form-control" id="titularTarjeta"
    required><p id="titularTarjetaError"></p>
</div>
<div class="form-group col-md-6">
  <input type="text" name="numeroTarjeta" placeholder="Número de tarjeta" id="numeroTarjeta"
    class="form-control" pattern="[0-9]{13,16}" required><p id="numeroTarjetaError"></p></div>
<div class="form-group col-md-3">
  <input type="text" name="cvv" id="cvv" placeholder="CVV" pattern="[0-9]{3,4}" class="form-control"
    required><p id="cvvError"></p>
</div>
<div class="form-group col-md-0"></div>
<div class="form-row col-md-8">
  <input type="number" name="expiracionMM" id="mm" placeholder="MM" pattern="[0-9]{2}" max="12" min="1"
    style="width: fit-content;" class="form-control" required>
  <p>/</p>
  <input type="number" name="expiracionAA" id="aa" placeholder="AA" pattern="[0-9]{2}" max="30" min="20"
    style="width: fit-content;" class="form-control" required>
    <div class="form-group col-md-6"><p id="mmError"><p id="aaError"></div></div>`

  document.getElementById("transferencia").innerHTML = ``
};

function formaTransferencia() {
  document.getElementById("transferencia").innerHTML = `<div class="form-group col-md-6"><input type="text" name="nombreTitular" id="titularCuenta"
  placeholder="Nombre del titular" class="form-control" required><p id="titularCuentaError"></p></div>
<div class="form-group col-md-6"><input type="text" name="numeroCuenta"
  placeholder="Número de Cuenta" pattern="[0-9]{13,16}" class="form-control" maxlength="16" minlength="13" id="numeroCuenta" required><p id="numeroCuentaError"></p></div>`

  document.getElementById("tarjeta").innerHTML = ``
};


document.addEventListener("DOMContentLoaded", function () {   //ALERTA CONFIRMACIÓN PAGO
  document.getElementById('pago').addEventListener('submit', () => {
    sessionStorage.setItem("pago", true);

    if (sessionStorage.getItem("pago") != "false") {
      document.getElementById('alert').innerHTML =
        `<div class="alert alert-success alert-dismissible fade show" role="alert">
      ¡Método de pago selecionado con éxito!
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`
      document.getElementById('confirm').innerHTML = ``
    }
  })
})

document.getElementById('envio').addEventListener('submit', (event) => {    //ALERTA CONFIRMACIÓN COMPRA
  if (sessionStorage.getItem("pago") != "true") {
    event.preventDefault();

    document.getElementById('confirm').innerHTML =
      `<div class="alert alert-danger alert-dismissible fade show" role="alert">
      Debe seleccionar un método de pago...
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`;
  }
  else {
    document.getElementById('confirm').innerHTML =
      `<div class="alert alert-success alert-dismissible" role="alert">
      ¡Su compra se ha realizado con éxito!
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`;
  };
})


function validarEnvio(evento) {
  var premium = document.getElementById('premium');
  var express = document.getElementById('express');
  var standard = document.getElementById('standard');
  var envioError = document.getElementById('envioError');
  var tipoEnvio = premium.checked || express.checked || standard.checked
  if (!tipoEnvio) {
    envioError.innerHTML = `<small style="color: red;">Selecione un tipo de envío</small>`
    evento.preventDefault();
  }
  else {
    envioError.innerHTML = ``
  }

  var calleError = document.getElementById('calleError');
  var calle = document.getElementById('calle');
  var regexpCalle = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/;
  if (!regexpCalle.test(calle.value)) {
    calleError.innerHTML = `<small style="color: red;">Ingrese un nombre de calle válido</small>`
    evento.preventDefault();
  }
  else {
    calleError.innerHTML = ``
  }

  var numeroPuertaError = document.getElementById('numeroPuertaError');
  var numeroPuerta = document.getElementById('numeroPuerta');
  var regexpPuerta = /^\d{4,6}$/;
  if (!regexpPuerta.test(numeroPuerta.value)) {
    numeroPuertaError.innerHTML = `<small style="color: red;">Ingrese un número de puerta válido</small>`
    evento.preventDefault();
  }
  else {
    numeroPuertaError.innerHTML = ``
  }

  var postalError = document.getElementById('postalError');
  var postal = document.getElementById('postal');
  var regexpPostal = /^\d{5,6}$/;
  if (!regexpPostal.test(postal.value)) {
    postalError.innerHTML = `<small style="color: red;">Ingrese un código postal válido</small>`
    evento.preventDefault();
  }
  else {
    postalError.innerHTML = ``
  }
};

function validarPagoTarjeta(evento) {
  var tarjeta = document.getElementById('formaCredito');
  var cuenta = document.getElementById('formaCuenta');
  var formaError = document.getElementById('formaError');
  var formaPago = tarjeta.checked || cuenta.checked
  if (!formaPago) {
    formaError.innerHTML = `<small style="color: red;">Selecione una forma de pago</small>`
    evento.preventDefault();
  }
  else {
    formaError.innerHTML = ``
  }

  var titularTarjetaError = document.getElementById('titularTarjetaError');
  var titularTarjeta = document.getElementById('titularTarjeta');
  var regexpTitularTarjeta = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/;
  if (!regexpTitularTarjeta.test(titularTarjeta.value)) {
    titularTarjetaError.innerHTML = `<small style="color: red;">Ingrese un nombre válido</small>`
    evento.preventDefault();
  }
  else {
    titularTarjetaError.innerHTML = ``
  }

  var numeroTarjetaError = document.getElementById('numeroTarjetaError');
  var numeroTarjeta = document.getElementById('numeroTarjeta');
  var regexpNumeroTarjeta = /^\d{13,16}$/;
  if (!regexpNumeroTarjeta.test(numeroTarjeta.value)) {
    numeroTarjetaError.innerHTML = `<small style="color: red;">Ingrese un número de tarjeta válido</small>`
    evento.preventDefault();
  }
  else {
    numeroTarjetaError.innerHTML = ``
  }

  var cvvError = document.getElementById('cvvError');
  var cvv = document.getElementById('cvv');
  var regexpCVV = /^\d{3,4}$/;
  if (!regexpCVV.test(cvv.value)) {
    cvvError.innerHTML = `<small style="color: red;">Ingrese un código de seguridad válido</small>`
    evento.preventDefault();
  }
  else {
    cvvError.innerHTML = ``
  }

  var mmError = document.getElementById('mmError');
  var mm = document.getElementById('mm');
  var condicion = (0 < mm.value) & (mm.value < 13)
  if (!condicion) {
    mmError.innerHTML = `<small style="color: red;">Ingrese un mes válido</small>`
    evento.preventDefault();
  }
  else {
    mmError.innerHTML = ``
  }

  var aaError = document.getElementById('aaError');
  var aa = document.getElementById('aa');
  var condicion = (19 < aa.value) & (aa.value < 31)
  if (!condicion) {
    aaError.innerHTML = `<small style="color: red;">Ingrese un año válido</small>`
    evento.preventDefault();
  }
  else {
    aaError.innerHTML = ``
  }
};

function validarPagoCuenta(evento) {
  var titularCuentaError = document.getElementById('titularCuentaError');
  var titularCuenta = document.getElementById('titularCuenta');
  var regexpTitularCuenta = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/;
  if (!regexpTitularCuenta.test(titularCuenta.value)) {
    titularCuentaError.innerHTML = `<small style="color: red;">Ingrese un nombre válido</small>`
    evento.preventDefault();
  }
  else {
    titularCuentaError.innerHTML = ``
  }

  var numeroCuentaError = document.getElementById('numeroCuentaError');
  var numeroCuenta = document.getElementById('numeroCuenta');
  var regexpNumeroCuenta = /^\d{13,16}$/;
  if (!regexpNumeroCuenta.test(numeroCuenta.value)) {
    numeroCuentaError.innerHTML = `<small style="color: red;">Ingrese un número de cuenta válido</small>`
    evento.preventDefault();
  }
  else {
    numeroCuentaError.innerHTML = ``
  }
};

document.getElementById('finalizar').addEventListener('click', function (e) {
  validarEnvio(e);
});
document.getElementById('confirmPago').addEventListener('click', function (e) {
  validarPagoTarjeta(e);
});
document.getElementById('confirmPago').addEventListener('click', function (e) {
  validarPagoCuenta(e);
});