
document.getElementById('perfil').addEventListener('click', function () {
    var nombre = document.getElementById('name').value;
    var apellidos = document.getElementById('surname').value;
    var edad = document.getElementById('age').value;
    var mail = document.getElementById('mail').value;
    var telefono = document.getElementById('telephone').value;

    let usuario = []
    var user = JSON.parse(localStorage.getItem('user'))
    usuario.push(user);

    perfil = {
        Nombre: nombre,
        Apellidos: apellidos,
        Edad: edad,
        Mail: mail,
        Teléfono: telefono
    }

    usuario.push(perfil);
    jsonDatos = JSON.stringify(usuario);
    localStorage.setItem('userPerfil', jsonDatos);
});

document.addEventListener("DOMContentLoaded", function () {
    var datos = JSON.parse(localStorage.getItem('userPerfil'))

    document.getElementById('name').value = datos[1].Nombre
    document.getElementById('surname').value = datos[1].Apellidos
    document.getElementById('age').value = datos[1].Edad
    document.getElementById('mail').value = datos[1].Mail
    document.getElementById('telephone').value = datos[1].Teléfono
});

document.getElementById('perfil').addEventListener('click', function (evento) {
    var nombre = document.getElementById('name');
    var errorNombre = document.getElementById('errorNombre');
    var regexpNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/;

    if (nombre.value != "") {
        if (!regexpNombre.test(nombre.value)) {
            errorNombre.innerHTML = `<small style="color: red;">Ingrese un nombre válido</small>`
            evento.preventDefault();
        }
        else {
            errorNombre.innerHTML = ``
        }
    }

    var apellido = document.getElementById('surname');
    var errorApellido = document.getElementById('errorApellido');
    var regexpApellido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    console.log(apellido.value);

    if (apellido.value != "") {
        if (!regexpApellido.test(apellido.value)) {
            errorApellido.innerHTML = `<small style="color: red;">Ingrese un apellido válido</small>`
            evento.preventDefault();
        }
        else {
            errorApellido.innerHTML = ``
        }
    }

    var edad = document.getElementById('age');
    var errorEdad = document.getElementById('errorEdad');
    var condicion = (13 < edad.value) & (edad.value < 100)
    if (edad.value != "") {
        if (!condicion) {
            errorEdad.innerHTML = `<small style="color: red;">Ingrese un edad válida</small>`
            evento.preventDefault();
        }
        else {
            errorEdad.innerHTML = ``
        }
    }

    var mail = document.getElementById('mail');
    var errorMail = document.getElementById('errorMail');
    var regexpMail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
    if (mail.value != "") {
        if (!regexpMail.test(mail.value)) {
            errorMail.innerHTML = `<small style="color: red;">Ingrese una dirección de e-mail válida</small>`
            evento.preventDefault();
        }
        else {
            errorMail.innerHTML = ``
        }
    }

    var telefono = document.getElementById('telephone');
    var errorTelefono = document.getElementById('errorTelefono');
    var regexpTelefono = /^\d{8,9}$/;
    if (telefono.value != "") {
        if (!regexpTelefono.test(telefono.value)) {
            errorTelefono.innerHTML = `<small style="color: red;">Ingrese un número de teléfono válido</small>`
            evento.preventDefault();
        }
        else {
            errorTelefono.innerHTML = ``
        }
    }
});
