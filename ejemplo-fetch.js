//Document es la API que el navegador me da para jugar con el html de la página
const listaUsuarios = document.getElementById('body-usuarios');
const boton = document.getElementById('boton');
const nombre = document.getElementById('nombre');

let usuarios = [];

function render() {

    const usuariosRender = usuarios
    .map(usuario => `<tr><td>${usuario.nombre}</td></tr>`)
    .join("");
    console.log(usuariosRender);
    listaUsuarios.innerHTML = usuariosRender;
}

function enviarDatos() {
    const datos = {nombre: nombre.value};       
    fetch('https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            
            
        },
        body: JSON.stringify(datos),
    })
        .then((response) => response.json())
        .then(jsonResponse => {
            console.log('jsonResponse', jsonResponse);
            refrescar();
        });


}

function refrescar() {
    fetch('http://bootcamp-dia-3.camilomontoyau.now.sh/usuarios')
        .then(response => response.json())
        .then(respuestaUsuarios => {
            console.log('respuestaUsuarios', respuestaUsuarios);
            usuarios = respuestaUsuarios;
            render();
        })
}
refrescar();
boton.onclick = enviarDatos;