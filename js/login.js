//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById('user').addEventListener('submit', (evento)=> {
        evento.preventDefault();
        location.href = "./index.html";
        sessionStorage.setItem("logged", true);
        return true;
    })
});