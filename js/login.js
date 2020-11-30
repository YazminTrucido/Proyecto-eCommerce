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

// Obtener y almacenar datos de usuario
function datos(){
    var usuario = document.getElementById('usuario').value;
    var email = document.getElementById('email').value;
    var contraseña = document.getElementById('contraseña').value;

    usuario = {
        user: usuario,
        email: email, 
        contraseña: contraseña
    }

    jsonUsuario = JSON.stringify(usuario);
    localStorage.setItem('user', jsonUsuario);
};


