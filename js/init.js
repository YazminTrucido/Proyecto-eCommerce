const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}


if (!sessionStorage.getItem("logged") && !window.location.href.endsWith("login.html")) {  //Login
  window.location = "login.html"
};


// Mostrar datos almacenados de usuario
console.log(JSON.parse(localStorage.getItem('user')));
var em = JSON.parse(localStorage.getItem('user')).user;
document.getElementById("loginUser").innerHTML = '<p>' + em + '<p>';


// Buscador
document.addEventListener("DOMContentLoaded", function (e) {
  var productosBuscador
  fetch(PRODUCTS_URL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) { 
    //console.log(data)
    productosBuscador = data;
    return productosBuscador; 
  });

  const formulario = document.querySelector('#formulario');
  const resultado = document.querySelector('#resultado');

  const filtrar = () => {
    resultado.innerHTML = '';
    //console.log(formulario.value);
    const texto = formulario.value.toLowerCase()

    for (let i = 0; i < productosBuscador.length; i++) {
      let nombre = productosBuscador[i].name.toLowerCase()
      if (nombre.indexOf(texto) !== -1) {
        resultado.innerHTML += `
        <a class="dropdown-item" href="product-info.html?title=`+ productosBuscador[i].name +`&cst=`+ productosBuscador[i].cost +`&desc=`+ productosBuscador[i].description +`&sold=`+ productosBuscador[i].soldCount +`">
        `+ nombre +` `+ productosBuscador[i].currency +``+ productosBuscador[i].cost +`</a>`
      }
    }
    if (formulario.value == ""){
      resultado.innerHTML = ``
    }
  };

  formulario.addEventListener('keyup', filtrar)
  filtrar();
});




